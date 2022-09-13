const {Scenes} = require("telegraf");
const {SCENE_IDS, LEVERAGE_BUTTONS} = require("./constants");
const MESSAGES = require("./messages.json");

const buildSignalResumeMessage = (signalData) => {
    let resumeMessage = MESSAGES.sendNewSignalResume;
    Object.keys(signalData).forEach((key) =>
        resumeMessage = resumeMessage.replace(`{${key}}`, signalData[key])
    );

    return resumeMessage;
};

/**
 * ADD NEW SIGNAL SCENE
 */
const addNewSignalScene = new Scenes.WizardScene(
    SCENE_IDS.SEND_NEW_SIGNAL,
    async (ctx) => {
        await ctx.sendMessage(MESSAGES.sendNewSignalTitle);
        await ctx.telegram.sendMessage(ctx.chat.id, MESSAGES.sendNewSignalLongOrShort, LEVERAGE_BUTTONS);
        ctx.wizard.state.signalData = {};
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.signalData.leverageType = ctx.update?.callback_query?.data;
        await ctx.reply(MESSAGES.sendNewSignalLeverage);
        return ctx.wizard.next();
    },
    async (ctx) => {
        // Leverage validation
        if (!ctx.message?.text?.length && !ctx.message?.text?.match(/^[0-9]+$/)) {
            await ctx.reply("Please type a valid leverage number");
            return;
        }
        ctx.wizard.state.signalData.leverage = ctx.message.text;
        await ctx.reply(MESSAGES.sendNewSignalCoinPair);
        return ctx.wizard.next();
    },
    async (ctx) => {
        // Coin pair validation
        if (!ctx.message?.text?.length || !ctx.message?.text?.match(/^[A-Z]{3,4}\/[A-Z]{3,4}$/)) {
            await ctx.reply("Please type coin pair in format \"BTC/USDT\"");
            return;
        }
        ctx.wizard.state.signalData.coinPair = ctx.message.text;
        await ctx.reply(MESSAGES.sendNewSignalEntryPrice);
        return ctx.wizard.next();
    },
    async (ctx) => {
        // Entry price validation
        if (!ctx.message?.text?.length) {
            await ctx.reply("Please type entry price");
            return;
        }
        ctx.wizard.state.signalData.entryPrice = ctx.message.text;
        await ctx.reply(MESSAGES.sendNewSignalTakeProfit);
        return ctx.wizard.next();
    },
    async (ctx) => {
        // Take Profit validation
        if (!ctx.message?.text?.length) {
            await ctx.reply("Please type take profit");
            return;
        }
        ctx.wizard.state.signalData.takeProfit = ctx.message.text;
        await ctx.reply(MESSAGES.sendNewSignalStopLoss);
        return ctx.wizard.next();
    },
    async (ctx) => {
        // Stop Loss validation
        if (!ctx.message?.text?.length) {
            await ctx.reply("Please type stop loss");
            return;
        }
        ctx.wizard.state.signalData.stopLoss = ctx.message.text;
        await ctx.reply(MESSAGES.sendNewSignalLoading);
        // TODO REMOVE THIS setTimeout
        setTimeout(async () => {
            await ctx.reply(MESSAGES.sendNewSignalConfirm);
            await ctx.reply(buildSignalResumeMessage(ctx.wizard.state.signalData),);
            await ctx.scene.leave();
        }, 500);
    }
);

module.exports = {
    addNewSignalScene,
};