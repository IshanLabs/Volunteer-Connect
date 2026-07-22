const db = require("../config/db");

const findUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);

  return result.rows[0];
};

const createUser = async ({ fullName, email, passwordHash, role }) => {
  const query = `
    INSERT INTO users
    (
      full_name,
      email,
      password_hash,
      role
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING
      user_id,
      full_name,
      email,
      role,
      created_at;
  `;

  const values = [
    fullName,
    email,
    passwordHash,
    role,
  ];

  const result = await db.query(query, values);
  const user = result.rows[0];

  try {
    if (role === "VOLUNTEER") {
      await db.query(
        `INSERT INTO volunteer_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`,
        [user.user_id]
      );
    } else if (role === "NGO") {
      await db.query(
        `INSERT INTO ngo_profiles (user_id, organization_name, contact_email) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
        [user.user_id, fullName, email]
      );
    } else if (role === "ADMIN") {
      await db.query(
        `INSERT INTO admin_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`,
        [user.user_id]
      );
    }
  } catch (err) {
    console.error("⚠️ Error creating role profile:", err.message);
  }

  return user;
};

module.exports = {
  findUserByEmail,
  createUser,
};