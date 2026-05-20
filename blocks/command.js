'use strict';

goog.module('Blockly.blocks.command');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');
const Events = goog.require('Blockly.Events');
const Extensions = goog.require('Blockly.Extensions');

defineBlocksWithJsonArray([
    // ─── Command handler ────────────────────────────────────────────────────────
    {
        'type': 'command',
        'message0': 'on command %1 do %2',
        'args0': [
            { 'type': 'input_dummy' },
            { 'type': 'input_statement', 'name': 'DO' }
        ],
        'colour': 65,
        'tooltip': 'Handles a plugin command (override onCommand).',
        'helpUrl': ''
    },

    // ─── Sender access ──────────────────────────────────────────────────────────
    {
        'type': 'command_get',
        'message0': 'command sender',
        'args0': [],
        'output': null,
        'colour': 65,
        'tooltip': 'Returns the CommandSender who executed the command.',
        'helpUrl': '',
        'extensions': ['in_command_check']
    },
    {
        'type': 'command_player',
        'message0': 'command player (sender as Player)',
        'args0': [],
        'output': 'Player',
        'colour': 65,
        'tooltip': 'Casts the command sender to Player. Use command_check_sender_is_player first.',
        'helpUrl': '',
        'extensions': ['in_command_check']
    },
    {
        'type': 'command_check_sender_is_player',
        'message0': 'sender is a player',
        'args0': [],
        'output': 'Boolean',
        'colour': 65,
        'tooltip': 'Returns true if the command was sent by a player (not console).',
        'helpUrl': '',
        'extensions': ['in_command_check']
    },

    // ─── Argument access ────────────────────────────────────────────────────────
    {
        'type': 'command_arg',
        'message0': 'get arg at index %1',
        'args0': [{ 'type': 'input_value', 'name': 'INDEX', 'check': 'Number' }],
        'inputsInline': true,
        'output': 'String',
        'colour': 65,
        'tooltip': 'Returns the argument string at the given index (0-based).',
        'helpUrl': '',
        'extensions': ['in_command_check']
    },
    {
        'type': 'command_args_length',
        'message0': 'number of args',
        'args0': [],
        'output': 'Number',
        'colour': 65,
        'tooltip': 'Returns the number of arguments passed to the command.',
        'helpUrl': '',
        'extensions': ['in_command_check']
    },
    {
        'type': 'command_has_args',
        'message0': 'has any args',
        'args0': [],
        'output': 'Boolean',
        'colour': 65,
        'tooltip': 'Returns true if at least one argument was passed.',
        'helpUrl': '',
        'extensions': ['in_command_check']
    },
]);

const IN_COMMAND_CHECK_MIXIN = {
    getSurroundLoop: function () {
        let block = this;
        do {
            if (block.type === 'command') return block;
            block = block.getSurroundParent();
        } while (block);
        return null;
    },
    onchange: function (e) {
        if (!this.workspace.isDragging || this.workspace.isDragging() ||
            e.type !== Events.BLOCK_MOVE) return;
        const enabled = this.getSurroundLoop();
        this.setWarningText(enabled ? null : 'This block may only be used within a command handler.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(e.group);
            this.setEnabled(!!enabled);
            Events.setGroup(group);
        }
    }
};

Extensions.registerMixin('in_command_check', IN_COMMAND_CHECK_MIXIN);
