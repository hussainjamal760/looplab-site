import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  extractTeammates,
  formatTeammateColumn,
  formatTeammatesString,
} from './exportFormatters';

function extractRowFields(reg, index) {
  const p = reg.participantData || {};
  const teammates = extractTeammates(reg);
  const isPark =
    p.needsParking === 'Yes' ||
    p.needsParking === true ||
    p.needsParking === 'true' ||
    String(p.needsParking).toLowerCase() === 'yes';

  return {
    index: index + 1,
    p,
    teammates,
    parking: isPark
      ? `Yes (${p.vehicleType || reg.vehicleType || 'Vehicle'} - ${p.vehicleNumber || reg.vehicleNumber || 'N/A'})`
      : 'No',
    track:
      p.track === 'onsite'
        ? 'Onsite'
        : p.track === 'virtual'
        ? 'Virtual'
        : p.attendanceMode || reg.track || 'Onsite',
    module: p.module || p.moduleName || p.trackSelect || reg.module || 'General',
  };
}

export function formatRegistrationsForExport(registrations) {
  return registrations.map((reg, index) => {
    const r = extractRowFields(reg, index);
    const p = r.p;
    const tm = r.teammates;

    return {
      '#': r.index,
      'Leader Name': p.fullName || reg.fullName || reg.name || 'N/A',
      'Leader Email': p.email || reg.email || 'N/A',
      'Leader Phone': p.phone || reg.phone || 'N/A',
      'Leader CNIC': p.cnic || reg.cnic || 'N/A',
      'University': p.university || reg.university || 'N/A',
      'Department': p.department || reg.department || 'N/A',
      'Module': r.module,
      'Track': r.track,
      'Leader Parking': r.parking,
      'Team Size': tm.length > 0 ? `${tm.length + 1} Members` : '1 (Solo)',

      'Teammate 1 Name': formatTeammateColumn(tm, 0, 'name'),
      'Teammate 1 Email': formatTeammateColumn(tm, 0, 'email'),
      'Teammate 1 CNIC': formatTeammateColumn(tm, 0, 'cnic'),
      'Teammate 1 Parking': formatTeammateColumn(tm, 0, 'parking'),

      'Teammate 2 Name': formatTeammateColumn(tm, 1, 'name'),
      'Teammate 2 Email': formatTeammateColumn(tm, 1, 'email'),
      'Teammate 2 CNIC': formatTeammateColumn(tm, 1, 'cnic'),
      'Teammate 2 Parking': formatTeammateColumn(tm, 1, 'parking'),

      'Teammate 3 Name': formatTeammateColumn(tm, 2, 'name'),
      'Teammate 3 Email': formatTeammateColumn(tm, 2, 'email'),
      'Teammate 3 CNIC': formatTeammateColumn(tm, 2, 'cnic'),
      'Teammate 3 Parking': formatTeammateColumn(tm, 2, 'parking'),

      'Teammates Summary': formatTeammatesString(tm),
      'Promo Code': reg.appliedPromoCode || 'None',
      'Base Fee (PKR)': Number(reg.baseAmount ?? reg.finalAmount ?? 0),
      'Discount (PKR)': Number(reg.discountAmount ?? 0),
      'Final Fee (PKR)': Number(reg.finalAmount ?? 0),
      'Status': (reg.paymentStatus || 'pending').toUpperCase(),
      'Submitted Date': reg.submittedAt
        ? new Date(reg.submittedAt).toLocaleDateString('en-GB')
        : reg.createdAt
        ? new Date(reg.createdAt).toLocaleDateString('en-GB')
        : 'N/A',
    };
  });
}

export function exportToExcel(registrations, filename = 'Loopverse_Registrations') {
  if (!registrations || registrations.length === 0) return;

  const data = formatRegistrationsForExport(registrations);
  const worksheet = XLSX.utils.json_to_sheet(data);

  const colWidths = Object.keys(data[0]).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...data.map((row) => {
        const val = String(row[key] || '');
        const lines = val.split('\n');
        return Math.max(...lines.map((l) => l.length));
      })
    );
    return { wch: Math.min(Math.max(maxLen + 2, 10), 50) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

  const timeStamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${filename}_${timeStamp}.xlsx`);
}

function createPdfHeader(doc, title, count, totalAmount) {
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(158, 0, 254);
  doc.text('LOOPLAB — LOOPVERSE 3.0', 14, 15);

  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(title, 14, 23);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  doc.text(
    `Generated: ${dateStr}  |  Total Entries: ${count}  |  Total Revenue: PKR ${totalAmount.toLocaleString()}`,
    14,
    29
  );
}

function renderPdfTable(doc, data) {
  const headers = [['#', 'Name', 'Email', 'Phone', 'CNIC', 'University', 'Module', 'Track', 'Parking', 'Teammates', 'Promo', 'Final (PKR)']];
  const rows = data.map((d) => [
    d['#'], d['Leader Name'], d['Leader Email'], d['Leader Phone'], d['Leader CNIC'], d['University'],
    d['Module'], d['Track'], d['Leader Parking'], d['Teammates Summary'], d['Promo Code'],
    `PKR ${d['Final Fee (PKR)'].toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: 34, head: headers, body: rows, theme: 'grid',
    headStyles: { fillColor: [158, 0, 254], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7, cellPadding: 2 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 7 }, 1: { cellWidth: 24 }, 2: { cellWidth: 30 }, 3: { cellWidth: 20 },
      4: { cellWidth: 22 }, 5: { cellWidth: 22 }, 6: { cellWidth: 24 }, 7: { cellWidth: 14 },
      8: { cellWidth: 20 }, 9: { cellWidth: 46 }, 10: { cellWidth: 14 }, 11: { cellWidth: 22, fontStyle: 'bold' },
    },
  });
}

export function exportToPDF(registrations, title = 'Registrations Report', filename = 'Loopverse_Registrations') {
  if (!registrations || registrations.length === 0) return;

  const data = formatRegistrationsForExport(registrations);
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const totalAmount = registrations.reduce((sum, r) => sum + Number(r.finalAmount || 0), 0);

  createPdfHeader(doc, title, registrations.length, totalAmount);
  renderPdfTable(doc, data);

  const timeStamp = new Date().toISOString().slice(0, 10);
  doc.save(`${filename}_${timeStamp}.pdf`);
}

