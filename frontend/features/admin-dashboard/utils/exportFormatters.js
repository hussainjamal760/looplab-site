export function extractTeammates(reg) {
  if (Array.isArray(reg?.teammates)) return reg.teammates;
  const p = reg?.participantData || {};
  if (Array.isArray(p.teammates)) return p.teammates;
  return [];
}

export function formatTeammateColumn(teammates, index, field) {
  const tm = teammates?.[index];
  if (!tm) return 'N/A';

  if (field === 'name') return tm.fullName || tm.name || 'N/A';
  if (field === 'email') return tm.email || 'N/A';
  if (field === 'cnic') return tm.cnic || 'N/A';
  if (field === 'parking') {
    const isParking =
      tm.needsParking === 'Yes' ||
      tm.needsParking === true ||
      tm.needsParking === 'true' ||
      String(tm.needsParking || '').toLowerCase() === 'yes';

    const vType = tm.vehicleType || tm.vehicle || 'Vehicle';
    const vNum = tm.vehicleNumber || tm.vehicleNo || tm.plateNumber || 'N/A';
    return isParking ? `Yes (${vType} - ${vNum})` : 'No';
  }
  return 'N/A';
}

export function formatTeammatesString(teammates) {
  if (!teammates || teammates.length === 0) return 'Solo';

  return teammates
    .map((tm, i) => {
      const name = tm.fullName || tm.name || 'N/A';
      const email = tm.email || 'N/A';
      const cnic = tm.cnic || 'N/A';
      const isParking =
        tm.needsParking === 'Yes' ||
        tm.needsParking === true ||
        tm.needsParking === 'true' ||
        String(tm.needsParking || '').toLowerCase() === 'yes';

      const vType = tm.vehicleType || tm.vehicle || 'Vehicle';
      const vNum = tm.vehicleNumber || tm.vehicleNo || tm.plateNumber || 'N/A';

      const parkDetail = isParking
        ? `Parking: Yes (${vType} - ${vNum})`
        : 'Parking: No';

      return `#${i + 2}: ${name} (${email} | CNIC: ${cnic} | ${parkDetail})`;
    })
    .join('\n');
}
