'use strict';

goog.module('Blockly.blocks.command');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');
const Events = goog.require('Blockly.Events');
const Extensions = goog.require('Blockly.Extensions');

defineBlocksWithJsonArray([
    {
        'type': 'command',
        'message0': 'command %1 do %2',
        'args0': [
            {
                "type": "input_dummy"
            },
            {
                'type': 'input_statement',
                'name': 'DO'
            },
        ],
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'command_player',
        'message0': 'event-player',
        'args0': [],
        'output': 'Player',
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
        'extensions': ['in_command_check'],
    },
    {
        'type': 'command_arg',
        'message0': 'get arg index of %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'INDEX',
                'check': 'Number'
            }
        ],
        'output': 'String',
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
        'extensions': ['in_command_check'],
    },
]);

const IN_COMMAND_CHECK_MIXIN = {
    getSurroundLoop: function () {
        let block = this;
        do {
            if (block.type === 'command') {
                return block;
            }
            block = block.getSurroundParent();
        } while (block);
        return null;
    },

    onchange: function (e) {
        if (!this.workspace.isDragging || this.workspace.isDragging() ||
            e.type !== Events.BLOCK_MOVE) {
            return;
        }
        const enabled = this.getSurroundLoop(this);
        this.setWarningText(enabled ? null : 'This block may only be used within a command');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(e.group);
            this.setEnabled(enabled);
            Events.setGroup(group);
        }
    },
};

Extensions.registerMixin('in_command_check', IN_COMMAND_CHECK_MIXIN);