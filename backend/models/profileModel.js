const db = require("../config/db");

/**
 * Get profile data by User ID
 */
const getProfileByUserId = async (userId) => {
  const userRes = await db.query(`SELECT user_id, full_name, email, role, created_at FROM users WHERE user_id = $1`, [userId]);
  const user = userRes.rows[0];

  if (!user) return null;

  if (user.role === "VOLUNTEER") {
    const profRes = await db.query(`SELECT * FROM volunteer_profiles WHERE user_id = $1`, [userId]);
    let profile = profRes.rows[0];
    if (!profile) {
      const newProf = await db.query(`INSERT INTO volunteer_profiles (user_id) VALUES ($1) RETURNING *`, [userId]);
      profile = newProf.rows[0];
    }
    return { ...user, profile };
  } else if (user.role === "NGO") {
    const profRes = await db.query(`SELECT * FROM ngo_profiles WHERE user_id = $1`, [userId]);
    let profile = profRes.rows[0];
    if (!profile) {
      const newProf = await db.query(`INSERT INTO ngo_profiles (user_id, organization_name) VALUES ($1, $2) RETURNING *`, [userId, user.full_name]);
      profile = newProf.rows[0];
    }
    return { ...user, profile };
  }

  return { ...user, profile: {} };
};

/**
 * Update Volunteer Profile
 */
const updateVolunteerProfile = async (userId, { phone, city, bio, skills, interests, profileImageUrl }) => {
  const query = `
    INSERT INTO volunteer_profiles (user_id, phone, city, bio, skills, interests, profile_image_url, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
      phone = COALESCE(EXCLUDED.phone, volunteer_profiles.phone),
      city = COALESCE(EXCLUDED.city, volunteer_profiles.city),
      bio = COALESCE(EXCLUDED.bio, volunteer_profiles.bio),
      skills = COALESCE(EXCLUDED.skills, volunteer_profiles.skills),
      interests = COALESCE(EXCLUDED.interests, volunteer_profiles.interests),
      profile_image_url = COALESCE(EXCLUDED.profile_image_url, volunteer_profiles.profile_image_url),
      updated_at = NOW()
    RETURNING *;
  `;

  const result = await db.query(query, [userId, phone, city, bio, skills, interests, profileImageUrl]);
  return result.rows[0];
};

/**
 * Update NGO Profile
 */
const updateNGOProfile = async (userId, { organizationName, mission, description, city, contactEmail, contactPhone, logoUrl }) => {
  const query = `
    INSERT INTO ngo_profiles (user_id, organization_name, mission, description, city, contact_email, contact_phone, logo_url, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
      organization_name = COALESCE(EXCLUDED.organization_name, ngo_profiles.organization_name),
      mission = COALESCE(EXCLUDED.mission, ngo_profiles.mission),
      description = COALESCE(EXCLUDED.description, ngo_profiles.description),
      city = COALESCE(EXCLUDED.city, ngo_profiles.city),
      contact_email = COALESCE(EXCLUDED.contact_email, ngo_profiles.contact_email),
      contact_phone = COALESCE(EXCLUDED.contact_phone, ngo_profiles.contact_phone),
      logo_url = COALESCE(EXCLUDED.logo_url, ngo_profiles.logo_url),
      updated_at = NOW()
    RETURNING *;
  `;

  const result = await db.query(query, [userId, organizationName, mission, description, city, contactEmail, contactPhone, logoUrl]);
  return result.rows[0];
};

module.exports = {
  getProfileByUserId,
  updateVolunteerProfile,
  updateNGOProfile,
};
