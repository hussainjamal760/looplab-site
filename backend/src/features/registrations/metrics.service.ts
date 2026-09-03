import { Registration } from './registration.model.js';
import { PromoCode } from '../promo/promo.model.js';

export interface DashboardMetrics {
  totalRegistrations: number;
  pendingCount: number;
  verifiedCount: number;
  rejectedCount: number;
  totalApprovedRevenue: number;
  totalPromoUsage: number;
  recentRegistrations: unknown[];
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const [registrationStats, totalPromoUsage, recentRegistrations] = await Promise.all([
    Registration.aggregate([
      {
        $facet: {
          total:    [{ $count: 'count' }],
          pending:  [{ $match: { paymentStatus: 'pending' } },  { $count: 'count' }],
          verified: [{ $match: { paymentStatus: 'verified' } }, { $count: 'count' }],
          rejected: [{ $match: { paymentStatus: 'rejected' } }, { $count: 'count' }],
          revenue:  [
            { $match: { paymentStatus: 'verified' } },
            { $group: { _id: null, total: { $sum: '$finalAmount' } } },
          ],
        },
      },
    ]),
    PromoCode.aggregate([{ $group: { _id: null, total: { $sum: '$usageCount' } } }]),
    Registration.find()
      .sort({ submittedAt: -1 })
      .limit(5)
      .populate('eventId', 'title')
      .select('participantData paymentStatus submittedAt eventId finalAmount')
      .lean(),
  ]);

  const stats = registrationStats[0];
  return {
    totalRegistrations: stats.total[0]?.count ?? 0,
    pendingCount:       stats.pending[0]?.count ?? 0,
    verifiedCount:      stats.verified[0]?.count ?? 0,
    rejectedCount:      stats.rejected[0]?.count ?? 0,
    totalApprovedRevenue: stats.revenue[0]?.total ?? 0,
    totalPromoUsage:    totalPromoUsage[0]?.total ?? 0,
    recentRegistrations,
  };
};
