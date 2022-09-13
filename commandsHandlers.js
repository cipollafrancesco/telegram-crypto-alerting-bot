const MESSAGES = require("./messages.json");
const {COMMANDS_BUTTONS, SCENE_IDS} = require("./constants");
const {BotStage} = require("./scenarios");

const sendCommandsListHandler = (bot, ctx) => {
    return bot.telegram.sendMessage(ctx.chat.id, MESSAGES.availableCommands, COMMANDS_BUTTONS);
};

const startCommandHandler = async (bot, ctx) => {
    await bot.telegram.sendVideo(
        ctx.chat.id,
        "https://media.giphy.com/media/3ohs7HdhQA4ffttvrO/giphy.gif",
        {
            caption: `${MESSAGES.startGreeting}`,
            parse_mode: "MarkdownV2",
            reply_markup: COMMANDS_BUTTONS
        }
    );

    await sendCommandsListHandler(bot, ctx);
};

const sendNewSignalCommandHandler = async (bot, ctx) => {
    ctx.scene.enter(SCENE_IDS.SEND_NEW_SIGNAL);
    // await bot.telegram.sendMessage(ctx.chat.id, MESSAGES.sendNewSignalEntryPrice);
    // await bot.telegram.sendMessage(ctx.chat.id, MESSAGES.sendNewSignalTakeProfit);
    // await bot.telegram.sendMessage(ctx.chat.id, MESSAGES.sendNewSignalStopLoss);
    // await bot.telegram.sendMessage(ctx.chat.id, MESSAGES.sendNewSignalConfirm);
};

module.exports = {
    startCommandHandler,
    sendCommandsListHandler,
    sendNewSignalCommandHandler,
};