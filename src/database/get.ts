import {database} from '../database';

export const IS_ADMIN_QUERY = "SELECT is_admin FROM users WHERE telegram_id = ?";
export const GET_USER_FIRST_NAME_QUERY = "SELECT first_name FROM users WHERE telegram_id = ?";

export const GET_USER_QUERY =
  `SELECT *
   FROM users
   WHERE telegram_id = ?`;

export const isAdmin = (telegramId: string): Promise<{ is_admin: boolean }> => {
  return new Promise((resolve, reject) => {
    database.get(IS_ADMIN_QUERY, [telegramId], (error: Error, row: { is_admin: boolean }) => {
      if (error) {
        return reject(error);
      }
      resolve(row);
    });
  });
};

export const getUserFirstName = (telegramId: string): Promise<{ first_name: string }> => {
  return new Promise((resolve, reject) => {
    database.get(GET_USER_FIRST_NAME_QUERY, [telegramId], (error: Error, row: { first_name: string }) => {
      if (error) {
        return reject(error);
      }
      resolve(row);
    });
  });
};
