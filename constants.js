const {Markup} = require("telegraf");

const SCENE_IDS = {
    SEND_NEW_SIGNAL: "SEND_NEW_SIGNAL",
};

const COMMANDS = {
    START: "start-btn-command",
    SHOW_COMMANDS_LIST: "show-commands-list-btn-command",
    SEND_NEW_SIGNAL: "send-new-signal-btn-command",
};

const COMMANDS_BUTTONS = Markup.inlineKeyboard([
    [Markup.button.callback("Start", COMMANDS.START)],
    [Markup.button.callback("Show Commands List", COMMANDS.SHOW_COMMANDS_LIST)],
    [Markup.button.callback("Place New Signal", COMMANDS.SEND_NEW_SIGNAL)]
]);

module.exports = {
    COMMANDS,
    COMMANDS_BUTTONS,
    SCENE_IDS,
};