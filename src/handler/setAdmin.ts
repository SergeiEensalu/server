import {Context, Telegraf} from 'telegraf';
import {Message} from "@telegraf/types";
import {handleErrorLog, handleSuccessLog} from "../utils";
import {setAdminService} from "../service/permission";

const command = 'setAdmin';

export const setAdminCommand = (bot: Telegraf) => {
  bot.command(command, (ctx: Context) => {
    const message = ctx.message as Message.TextMessage; //That is not very good. Because we king of "fake" type.
    const args = message.text.split(' ').slice(1);
    const telegramId = args[0];
    const admin = Number(args[1]); // Ensure admin is a number

    setAdminService(telegramId, admin)
      .then((response) => {
        ctx.reply(response)
          .then(handleSuccessLog)
          .catch(handleErrorLog);
      })
      .catch((error) => {
        ctx.reply(`Error: ${error.message}`)
          .then(handleSuccessLog)
          .catch(handleErrorLog);
      });
  });
};
