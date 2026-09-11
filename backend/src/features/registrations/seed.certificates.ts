import 'dotenv/config';

import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

import {
  Registration,
} from './registration.model.js';

async function generateUniqueCertificateId(): Promise<string> {
  for (
    let attempt = 0;
    attempt < 10;
    attempt++
  ) {
    const year =
      new Date().getFullYear();

    const randomPart =
      randomBytes(4)
        .toString('hex')
        .toUpperCase();

    const certificateId =
      `LL-${year}-${randomPart}`;

    const exists =
      await Registration.exists({
        certificateId,
      });

    if (!exists) {
      return certificateId;
    }
  }

  throw new Error(
    'Could not generate certificate ID'
  );
}

async function assignCertificates() {
  const mongoUri =
    process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      'MONGODB_URI is missing from .env'
    );
  }

  await mongoose.connect(mongoUri);

  console.log(
    'Connected to MongoDB'
  );

  const registrations =
    await Registration.find({
      paymentStatus: 'verified',

      $or: [
        {
          certificateId: null,
        },
        {
          certificateId: {
            $exists: false,
          },
        },
        {
          certificateId: '',
        },
      ],
    });

  if (
    registrations.length === 0
  ) {
    console.log(
      'All verified registrations already have certificate IDs.'
    );

    await mongoose.disconnect();
    return;
  }

  console.log(
    `Found ${registrations.length} verified registration(s) without certificates.`
  );

  for (const registration of registrations) {
    const certificateId =
      await generateUniqueCertificateId();

    registration.certificateId =
      certificateId;

    registration.certificateIssuedAt =
      registration.verifiedAt ||
      new Date();

    await registration.save();

    const participantName =
      String(
        registration
          .participantData
          ?.fullName ||
          'Unknown Participant'
      );

    console.log(
      `${participantName}: ${certificateId}`
    );
  }

  console.log(
    'Certificate migration completed successfully.'
  );

  await mongoose.disconnect();
}

assignCertificates().catch(
  async (error) => {
    console.error(
      'Certificate migration failed:',
      error
    );

    await mongoose.disconnect();

    process.exit(1);
  }
);