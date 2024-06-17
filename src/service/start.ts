import {Context} from 'telegraf';
import {User} from "@telegraf/types";
import {database} from "../database";
import {INSERT_USER_QUERY} from "../database/insert";

export const startService = async (ctx: Context) => {
  if (!ctx.from) {
    throw new Error('Unable to determine sender.');
  }

  const user = ctx.from as User;
  const firstName = user.first_name;
  const telegramId = user.id.toString();

  const params = [
    telegramId,
    firstName
  ];

  try {
    await insertUser(params);
  } catch (error: any) { // Any is bad!
    console.log('User already exist');
  }

  const message = `Hello, ${firstName}!`;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Website',
            web_app: {
              url: `${YOUR_URL}/login` // TODO: REPLACE 'YOUR_URL' WITH YOU LINK 1.
            }
          }
        ]
      ]
    }
  };

  return {message, options};
};

const insertUser = (params: any[]) => {
  return new Promise<void>((resolve, reject) => {
    database.run(INSERT_USER_QUERY, params, (error: Error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};
