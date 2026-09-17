import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Format registration rows into clean objects for Excel & PDF export
 */
export function formatRegistrationsForExport(registrations) {
  return registrations.map((reg, index) => {
    const p = reg.participantData || {};

    const isParkingRequired =
      p.needsParking === 'Yes' ||
      p.needsParking === true ||
      p.needsParking === 'true' ||
      String(p.needsParking).toLowerCase() === 'yes';

    const parkingDetail = isParkingRequired
      ? `Yes (${p.vehicleType || 'Vehicle'} - ${p.vehicleNumber || 'N/A'})`
      : 'No';

    const trackMode =
      p.track === 'onsite'
        ? 'Onsite'
        : p.track === 'virtual'
        ? 'Virtual'
        : p.attendanceMode || 'Onsite';

    const moduleName =
      p.module || p.moduleName || p.trackSelect || 'General';

    const finalFee = Number(reg.finalAmount ?? 0);
    const baseFee = Number(reg.baseAmount ?? finalFee);
    const discountFee = Number(reg.discountAmount ?? 0);

    return {
      '#': index + 1,
      'Full Name': p.fullName || reg.fullName || 'N/A',
      'Email': p.email || reg.email || 'N/A',
      'Phone': p.phone || reg.phone || 'N/A',
      'CNIC': p.cnic || 'N/A',
      'University': p.university || 'N/A',
      'Department': p.department || 'N/A',
      'Module': moduleName,
      'Track': trackMode,
      'Parking': parkingDetail,
      'Promo Code': reg.appliedPromoCode || 'None',
      'Base Fee (PKR)': baseFee,
      'Discount (PKR)': discountFee,
      'Final Fee (PKR)': finalFee,
      'Status': (reg.paymentStatus || 'pending').toUpperCase(),
      'Submitted Date': reg.submittedAt
        ? new Date(reg.submittedAt).toLocaleDateString('en-GB')
        : reg.createdAt
        ? new Date(reg.createdAt).toLocaleDateString('en-GB')
        : 'N/A',
    };
  });
}

/**
 * Export filtered registrations data to an Excel (.xlsx) file
 */
export function exportToExcel(registrations, filename = 'Loopverse_Registrations') {
  if (!registrations || registrations.length === 0) return;

  const data = formatRegistrationsForExport(registrations);
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Auto-set column widths for readability
  const colWidths = Object.keys(data[0]).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...data.map((row) => String(row[key] || '').length)
    );
    return { wch: Math.min(Math.max(maxLen + 2, 10), 40) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

  const timeStamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${filename}_${timeStamp}.xlsx`);
}

/**
 * Export filtered registrations data to a PDF document
 */
export function exportToPDF(registrations, title = 'Registrations Report', filename = 'Loopverse_Registrations') {
  if (!registrations || registrations.length === 0) return;

  const data = formatRegistrationsForExport(registrations);
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Header Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(158, 0, 254); // LoopLab Purple
  doc.text('LOOPLAB — LOOPVERSE 3.0', 14, 15);

  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(title, 14, 23);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const totalCount = registrations.length;
  const totalAmount = registrations.reduce((sum, r) => sum + Number(r.finalAmount || 0), 0);
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`Generated: ${dateStr}  |  Total Entries: ${totalCount}  |  Total Revenue: PKR ${totalAmount.toLocaleString()}`, 14, 29);

  // Table Columns & Body
  const headers = [['#', 'Name', 'Email', 'Phone', 'CNIC', 'University', 'Module', 'Track', 'Parking', 'Promo', 'Final (PKR)']];
  const rows = data.map((d) => [
    d['#'],
    d['Full Name'],
    d['Email'],
    d['Phone'],
    d['CNIC'],
    d['University'],
    d['Module'],
    d['Track'],
    d['Parking'],
    d['Promo Code'],
    `PKR ${d['Final Fee (PKR)'].toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: 34,
    head: headers,
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: [158, 0, 254],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 32 },
      2: { cellWidth: 40 },
      3: { cellWidth: 26 },
      4: { cellWidth: 28 },
      5: { cellWidth: 32 },
      6: { cellWidth: 34 },
      7: { cellWidth: 16 },
      8: { cellWidth: 28 },
      9: { cellWidth: 16 },
      10: { cellWidth: 22, fontStyle: 'bold' },
    },
  });

  const timeStamp = new Date().toISOString().slice(0, 10);
  doc.save(`${filename}_${timeStamp}.pdf`);
}
