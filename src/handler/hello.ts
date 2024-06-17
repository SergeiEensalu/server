import {Context, Telegraf} from 'telegraf';
import {Message} from '@telegraf/types';
import {handleErrorLog, handleSuccessLog} from "../utils";
import {helloService} from "../service/hello";

const command = 'adminhello';

export const hello = (bot: Telegraf) => {
  bot.command(command, (ctx: Context) => {
    const message = ctx.message as Message.TextMessage;
    const args = message.text.split(' ').slice(1);
    const telegramId = args[0];
    const text = args.slice(1).join(' ');

    helloService(ctx, telegramId, text)
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
