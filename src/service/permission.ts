import {validateUserPermission} from "../validators/permission";
import {updateUserPermission} from "../database/update";

export const setAdminService = async (telegramId: string, admin: number): Promise<string> => {
  const {error} = validateUserPermission(telegramId, admin);
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Update user permission
  const changes = await updateUserPermission(admin, telegramId);

  if (changes > 0) {
    return 'User permission updated';
  } else {
    return 'User not found';
  }
};
