export const INSERT_USER_QUERY = `
  INSERT INTO users (telegram_id, first_name, created_at)
  VALUES (?, ?, datetime('now'))
`;

export const INSERT_USER_QUERY_WITH_TOKEN =
  `INSERT INTO users (telegram_id, password, token, first_name, is_admin, created_at)
   VALUES (?, ?, ?, ?, ?, ?)`;