import { database } from '../database';

export const UPDATE_USER_PERMISSION_QUERY = "UPDATE users SET is_admin = ? WHERE telegram_id = ?";

export const updateUserPermission = (admin: number, telegramId: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    database.run(UPDATE_USER_PERMISSION_QUERY, [admin, telegramId], function (err: Error) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes);
    });
  });
};
