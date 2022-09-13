const {Telegraf, session, Scenes} = require("telegraf");
const {COMMANDS} = require("./constants");
const {sendCommandsListHandler, startCommandHandler, sendNewSignalCommandHandler} = require("./commandsHandlers");
const {addNewSignalScene} = require("./scenarios");
const MESSAGES = require("./messages.json");

console.log("NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

/**
 * SCENE DECLARATION
 */
const stage = new Scenes.Stage([addNewSignalScene]);
stage.command("cancel", async ctx => {
    await ctx.scene.leave();
    ctx.reply(MESSAGES.sendNewSignalCancel);
});

// BOT CREATION
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());

/**
 * ACTIONS
 */
bot.action(COMMANDS.START, (ctx) => startCommandHandler(bot, ctx));
bot.action(COMMANDS.SHOW_COMMANDS_LIST, (ctx) => sendCommandsListHandler(bot, ctx));
bot.action(COMMANDS.SEND_NEW_SIGNAL, (ctx) => sendNewSignalCommandHandler(bot, ctx));

/**
 * COMMAND
 */
bot.command(COMMANDS.START, (ctx) => startCommandHandler(bot, ctx));
bot.command(COMMANDS.SHOW_COMMANDS_LIST, (ctx) => sendCommandsListHandler(bot, ctx));
bot.command(COMMANDS.SEND_NEW_SIGNAL, (ctx) => sendNewSignalCommandHandler(bot, ctx));

// START MESSAGES
bot.start((ctx) => startCommandHandler(bot, ctx));

// RUN BOT
bot.launch()
    .then(() => console.log("Bot started"))
    .catch((err) => console.log("Bot start error:", err));

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));