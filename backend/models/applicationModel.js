const db = require("../config/db");

/**
 * Apply for an event as volunteer
 */
const applyForEvent = async (volunteerUserId, eventId, coverNote) => {
  // Check if already applied
  const existingRes = await db.query(
    `SELECT application_id FROM applications WHERE event_id = $1 AND volunteer_user_id = $2`,
    [eventId, volunteerUserId]
  );

  if (existingRes.rows.length > 0) {
    throw new Error("ALREADY_APPLIED");
  }

  const query = `
    INSERT INTO applications (event_id, volunteer_user_id, cover_note, status)
    VALUES ($1, $2, $3, 'SUBMITTED')
    RETURNING *;
  `;

  const result = await db.query(query, [eventId, volunteerUserId, coverNote || ""]);
  return result.rows[0];
};

/**
 * Get all applications submitted by logged-in volunteer
 */
const getVolunteerApplications = async (volunteerUserId) => {
  const query = `
    SELECT 
      a.application_id,
      a.event_id,
      a.status,
      a.cover_note,
      a.submitted_at,
      e.event_name,
      e.city,
      e.start_at,
      e.end_at,
      e.banner_url,
      np.organization_name
    FROM applications a
    JOIN events e ON a.event_id = e.event_id
    JOIN ngo_profiles np ON e.ngo_profile_id = np.ngo_profile_id
    WHERE a.volunteer_user_id = $1
    ORDER BY a.submitted_at DESC;
  `;

  const result = await db.query(query, [volunteerUserId]);
  return result.rows;
};

/**
 * Get applications for a specific event (NGO view)
 */
const getEventApplications = async (eventId) => {
  const query = `
    SELECT 
      a.application_id,
      a.event_id,
      a.status,
      a.cover_note,
      a.submitted_at,
      u.full_name AS volunteer_name,
      u.email AS volunteer_email,
      vp.phone,
      vp.city,
      vp.skills
    FROM applications a
    JOIN users u ON a.volunteer_user_id = u.user_id
    LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
    WHERE a.event_id = $1
    ORDER BY a.submitted_at DESC;
  `;

  const result = await db.query(query, [eventId]);
  return result.rows;
};

/**
 * Update application status (SHORTLISTED, APPROVED, REJECTED)
 */
const updateApplicationStatus = async (applicationId, status, decidedByUserId) => {
  const query = `
    UPDATE applications
    SET status = $1, decided_at = NOW(), decided_by = $2, updated_at = NOW()
    WHERE application_id = $3
    RETURNING *;
  `;

  const result = await db.query(query, [status, decidedByUserId, applicationId]);
  return result.rows[0];
};

module.exports = {
  applyForEvent,
  getVolunteerApplications,
  getEventApplications,
  updateApplicationStatus,
};
