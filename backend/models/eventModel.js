const db = require("../config/db");

/**
 * Get all published events with optional filtering
 */
const getAllEvents = async ({ search, city, category }) => {
  let query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.description,
      e.city,
      e.address,
      e.start_at,
      e.end_at,
      e.capacity,
      e.required_skills,
      e.banner_url,
      e.status,
      e.created_at,
      np.organization_name,
      np.logo_url
    FROM events e
    JOIN ngo_profiles np ON e.ngo_profile_id = np.ngo_profile_id
    WHERE e.status = 'PUBLISHED' OR e.status IS NULL
  `;

  const values = [];
  let paramIndex = 1;

  if (search) {
    query += ` AND (e.event_name ILIKE $${paramIndex} OR e.description ILIKE $${paramIndex} OR e.city ILIKE $${paramIndex})`;
    values.push(`%${search}%`);
    paramIndex++;
  }

  if (city && city !== "All") {
    query += ` AND e.city ILIKE $${paramIndex}`;
    values.push(`%${city}%`);
    paramIndex++;
  }

  query += ` ORDER BY e.created_at DESC`;

  const result = await db.query(query, values);
  return result.rows;
};

/**
 * Get Single Event by ID
 */
const getEventById = async (eventId) => {
  const query = `
    SELECT 
      e.*,
      np.organization_name,
      np.mission,
      np.description AS ngo_description,
      np.contact_email,
      np.contact_phone,
      np.logo_url,
      (SELECT COUNT(*) FROM applications a WHERE a.event_id = e.event_id AND a.status = 'APPROVED') AS filled_spots
    FROM events e
    JOIN ngo_profiles np ON e.ngo_profile_id = np.ngo_profile_id
    WHERE e.event_id = $1
  `;

  const result = await db.query(query, [eventId]);
  return result.rows[0];
};

/**
 * Create a new event for NGO
 */
const createEvent = async (ngoUserId, { eventName, description, city, address, startAt, endAt, capacity, requiredSkills, bannerUrl }) => {
  // Find NGO profile ID for this user
  let ngoRes = await db.query(`SELECT ngo_profile_id FROM ngo_profiles WHERE user_id = $1`, [ngoUserId]);
  
  if (!ngoRes.rows[0]) {
    // Auto-create NGO profile if missing
    const userRes = await db.query(`SELECT full_name, email FROM users WHERE user_id = $1`, [ngoUserId]);
    const user = userRes.rows[0];
    ngoRes = await db.query(
      `INSERT INTO ngo_profiles (user_id, organization_name, contact_email) VALUES ($1, $2, $3) RETURNING ngo_profile_id`,
      [ngoUserId, user ? user.full_name : "My NGO", user ? user.email : ""]
    );
  }

  const ngoProfileId = ngoRes.rows[0].ngo_profile_id;

  const query = `
    INSERT INTO events
    (ngo_profile_id, event_name, description, city, address, start_at, end_at, capacity, required_skills, banner_url, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'PUBLISHED')
    RETURNING *;
  `;

  const values = [
    ngoProfileId,
    eventName,
    description,
    city || "Remote",
    address || "",
    startAt || new Date(),
    endAt || new Date(Date.now() + 86400000),
    capacity || 10,
    requiredSkills || "",
    bannerUrl || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Get all events created by NGO
 */
const getNGOEvents = async (ngoUserId) => {
  const query = `
    SELECT 
      e.*,
      (SELECT COUNT(*) FROM applications a WHERE a.event_id = e.event_id) AS total_applications,
      (SELECT COUNT(*) FROM applications a WHERE a.event_id = e.event_id AND a.status = 'APPROVED') AS approved_applications
    FROM events e
    JOIN ngo_profiles np ON e.ngo_profile_id = np.ngo_profile_id
    WHERE np.user_id = $1
    ORDER BY e.created_at DESC;
  `;

  const result = await db.query(query, [ngoUserId]);
  return result.rows;
};

/**
 * Delete event
 */
const deleteEvent = async (eventId) => {
  const result = await db.query(`DELETE FROM events WHERE event_id = $1 RETURNING *`, [eventId]);
  return result.rows[0];
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  getNGOEvents,
  deleteEvent,
};
