const db = require("../config/db");

const getPlatformStats = async () => {
  const usersRes = await db.query(`SELECT COUNT(*) FROM users WHERE role = 'VOLUNTEER'`);
  const ngosRes = await db.query(`SELECT COUNT(*) FROM users WHERE role = 'NGO'`);
  const eventsRes = await db.query(`SELECT COUNT(*) FROM events`);
  const appsRes = await db.query(`SELECT COUNT(*) FROM applications`);
  const pendingNGOsRes = await db.query(`SELECT COUNT(*) FROM ngo_profiles WHERE verification_status = 'PENDING'`);

  return {
    totalVolunteers: parseInt(usersRes.rows[0].count),
    totalNGOs: parseInt(ngosRes.rows[0].count),
    totalEvents: parseInt(eventsRes.rows[0].count),
    totalApplications: parseInt(appsRes.rows[0].count),
    pendingVerifications: parseInt(pendingNGOsRes.rows[0].count),
  };
};

const getPendingNGOs = async () => {
  const query = `
    SELECT 
      np.*,
      u.full_name,
      u.email,
      u.created_at AS user_registered_at
    FROM ngo_profiles np
    JOIN users u ON np.user_id = u.user_id
    ORDER BY np.created_at DESC;
  `;
  const result = await db.query(query);
  return result.rows;
};

const verifyNGO = async (ngoProfileId, verificationStatus, adminUserId) => {
  const query = `
    UPDATE ngo_profiles
    SET verification_status = $1, verified_at = NOW(), verified_by = $2, updated_at = NOW()
    WHERE ngo_profile_id = $3
    RETURNING *;
  `;
  const result = await db.query(query, [verificationStatus, adminUserId, ngoProfileId]);
  return result.rows[0];
};

module.exports = {
  getPlatformStats,
  getPendingNGOs,
  verifyNGO,
};
