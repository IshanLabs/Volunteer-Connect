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

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};