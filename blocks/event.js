'use strict';

goog.module('Blockly.blocks.event');

const Events = goog.require('Blockly.Events');
const {Blocks} = goog.require('Blockly.blocks');
const {FieldNumber} = goog.require('Blockly.FieldNumber');
const {FieldDropdown} = goog.require('Blockly.FieldDropdown');
const {FieldTextInput} = goog.require('Blockly.FieldTextInput');

Blocks['event_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["event-player", "EVENT_PLAYER"],
                ["event-entity", "EVENT_ENTITY"],
                ["event-new-item", "EVENT_NEW_ITEM"],
                ["event-old-item", "EVENT_OLD_ITEM"],
                ["event-drop-item", "EVENT_DROP_ITEM"],
                ["event-caught-item", "EVENT_CAUGHT_ITEM"],
                ["event-main-hand-item", "EVENT_MAIN_HAND_ITEM"],
                ["event-off-hand-item", "EVENT_OFF_HAND_ITEM"],
                ["event-block", "EVENT_BLOCK"],
                ["event-world", "EVENT_WORLD"],
                ["event-bed", "EVENT_BED"],
                ["event-message", "EVENT_MESSAGE"],
                ["event-chunk", "EVENT_CHUNK"]
            ]), "OPTION");
        this.setOutput(true, "Player")
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    },

    getSurroundEvent: function () {
        const type = this.getFieldValue('OPTION')
        let block = this;
        do {
            if (block.player_ && type === "EVENT_PLAYER") {
                this.setOutput(true, "Player");
                return block;
            } else if (block.entity_ && type === "EVENT_ENTITY") {
                this.setOutput(true, "Entity");
                return block;
            } else if (block.newItem_ && type === "EVENT_NEW_ITEM") {
                this.setOutput(true, "ItemStack");
                return block;
            } else if (block.oldItem_ && type === "EVENT_OLD_ITEM") {
                this.setOutput(true, "ItemStack");
                return block;
            } else if (block.dropItem_ && type === "EVENT_DROP_ITEM") {
                this.setOutput(true, "Item");
                return block;
            } else if (block.caughtItem_ && type === "EVENT_CAUGHT_ITEM") {
                this.setOutput(true, "Entity");
                return block;
            } else if (block.mainHandItem_ && type === "EVENT_MAIN_HAND_ITEM") {
                this.setOutput(true, "ItemStack");
                return block;
            } else if (block.offHandItem_ && type === "EVENT_OFF_HAND_ITEM") {
                this.setOutput(true, "ItemStack");
                return block;
            } else if (block.block_ && type === "EVENT_BLOCK") {
                this.setOutput(true, "Block");
                return block;
            } else if (block.world_ && type === "EVENT_WORLD") {
                this.setOutput(true, "World");
                return block;
            } else if (block.bed_ && type === "EVENT_BED") {
                this.setOutput(true, "Block");
                return block;
            } else if (block.message_ && type === "EVENT_MESSAGE") {
                this.setOutput(true, "String");
                return block;
            } else if (block.chunk_ && type === "EVENT_CHUNK") {
                this.setOutput(true, "Chunk");
                return block;
            }
            block = block.getSurroundParent();
        } while (block);
        return null;
    },

    onchange: function (e) {
        if (!this.workspace.isDragging || this.workspace.isDragging() || (e.type !== Events.BLOCK_MOVE && e.type !== Events.BLOCK_CHANGE)) {
            return;
        }
        const enabled = this.getSurroundEvent(this);
        this.setWarningText(enabled ? null : 'This block may only be used within a event that has a that value.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(e.group);
            this.setEnabled(enabled);
            Events.setGroup(group);
        }
    }
};

Blocks['event_cancel'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('cancel event');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    },

    getSurroundEvent: function () {
        let block = this;
        do {
            if (block.type.includes('event') && block.cancel_) {
                return block;
            }
            block = block.getSurroundParent();
        } while (block);
        return null;
    },

    onchange: function (e) {
        if (!this.workspace.isDragging || this.workspace.isDragging() || e.type !== Events.BLOCK_MOVE) {
            return;
        }
        const enabled = this.getSurroundEvent(this);
        this.setWarningText(enabled ? null : 'This block may only be used within a cancelable event.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(e.group);
            this.setEnabled(enabled);
            Events.setGroup(group);
        }
    }
};

Blocks['event_at_time'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('at')
            .appendField(new FieldNumber(1, 1, 12, 1), 'HOUR')
            .appendField(':')
            .appendField(new FieldNumber(1, 1, 12, 1), 'MINUTE')
            .appendField(new FieldDropdown([['AM', 'AM'], ['PM', 'PM']]), 'AMPM')
            .appendField('in')
            .appendField(new FieldTextInput('WorldName'), 'WORLD');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blocks['event_armor_change'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on armor change');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.newItem_ = true;
        this.oldItem_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_bed_enter'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on bed enter');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.bed_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_bed_leave'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on bed leave')
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.bed_ = true;
    }
};

Blocks['event_block_damage'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on block damage');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.block_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_block_grow'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on block grow');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.block_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_block_break'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on block break');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.block_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_chat'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on chat');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.message_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_chunk_generate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on chunk generate');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.chunk_ = true;
        this.world_ = true;
    }
};

Blocks['event_chunk_load'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on chunk load');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.chunk_ = true;
        this.world_ = true;
    }
};

Blocks['event_chunk_unload'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on chunk unload');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.chunk_ = true;
        this.world_ = true;
    }
};

Blocks['event_click'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on')
            .appendField(new Blockly.FieldDropdown([
                ["left", "LEFT"],
                ["right", "RIGHT"]
            ]), "ACTION")
            .appendField('click');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.item_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_command'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on command');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.message_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_login'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on login');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
    }
};

Blocks['event_consume'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on consume');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_creeper_power'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on creeper power');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.cancel_ = true;
    }
};

Blocks['event_entity_damage'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on entity damage');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.entity_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_player_death'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on player death');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.entity_ = true;
    }
};

Blocks['event_entity_death'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on entity death');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.entity_ = true;
    }
};

Blocks['event_player_drop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on player drop');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.dropItem_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_entity_explode'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on entity explode');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.entity_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_block_explode'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on block explode');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.block_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_fish'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on fish');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.caughtItem_ = true;
        this.cancel_ = true;
    }
};

Blocks['event_swap'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on fish');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
        this.player_ = true;
        this.mainHandItem_ = true;
        this.offHandItem_ = true;
        this.cancel_ = true;
    }
};