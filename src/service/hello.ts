import {Context} from "telegraf";
import {getUserFirstName, isAdmin} from "../database/get";
import {validate} from "../validators/hello";

export const helloService = async (ctx: Context, telegramId: string, text: string): Promise<string> => {
  // Validate input
  const {error} = validate(telegramId, text);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = ctx.from;
  const senderId = user?.id.toString() || '';

  // Check if the sender is admin
  const adminCheck = await isAdmin(senderId);
  if (!adminCheck.is_admin) {
    throw new Error('You do not have permission to use this command');
  }

  // Fetch the user's first name
  const userInfo = await getUserFirstName(telegramId);
  if (!userInfo) {
    throw new Error('User not found');
  }

  // Send message to the user
  await ctx.telegram.sendMessage(telegramId, text);

  return 'Message sent successfully';
};