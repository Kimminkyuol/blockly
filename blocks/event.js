'use strict';

goog.module('Blockly.blocks.event');

const Events = goog.require('Blockly.Events');
const {Blocks} = goog.require('Blockly.blocks');
const {FieldNumber} = goog.require('Blockly.FieldNumber');
const {FieldDropdown} = goog.require('Blockly.FieldDropdown');
const {FieldTextInput} = goog.require('Blockly.FieldTextInput');

Blocks['event_get'] = {
    init: function () {
        this.appendDummyInput('OPTION_DUMMY')
            .appendField(new FieldDropdown([
                ['event-player', 'Player,event.getPlayer()'],
            ]), 'OPTION');
        this.setOutput(true, 'Player');
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    },

    getSurroundEvent: function () {
        let block = this;
        while (block.getSurroundParent()) {
            block = block.getSurroundParent();
        }
        if (block) this.gets_ = block.gets_ || this.gets_;
        if (this.gets_) {
            let dropdownList = [];
            for (i in this.gets_) {
                dropdownList.push([i, this.gets_[i][0] + ',' + this.gets_[i][1]]);
            }
            this.removeInput('OPTION_DUMMY', true);
            this.appendDummyInput('OPTION_DUMMY')
                .appendField(new FieldDropdown(dropdownList), 'OPTION');
            return this;
        } else {
            return null;
        }
    },

    onchange: function (event) {
        if (event.type === Events.BLOCK_CHANGE) {
            this.setOutput(true, this.getFieldValue('OPTION').split(',')[0]);
            return;
        } else if (!this.workspace.isDragging || this.workspace.isDragging() || event.type !== Events.BLOCK_MOVE) {
            return;
        }
        const enabled = this.getSurroundEvent(this);
        this.setWarningText(enabled ? null : 'This block may only be used within a event that has a that value.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(event.group);
            this.setEnabled(enabled);
            Events.setGroup(group);
        }
    },

    saveExtraState: function () {
        return {
            'gets': this.gets_
        };
    },

    loadExtraState: function (state) {
        this.gets_ = state['gets'];
        this.getSurroundEvent();
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

    onchange: function (event) {
        if (!this.workspace.isDragging || this.workspace.isDragging() || event.type !== Events.BLOCK_MOVE) {
            return;
        }
        const enabled = this.getSurroundEvent(this);
        this.setWarningText(enabled ? null : 'This block may only be used within a cancelable event.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(event.group);
            this.setEnabled(enabled);
            Events.setGroup(group);
        }
    }
};

Blocks['event_server_state_change'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on server')
            .appendField(new FieldDropdown([
                ['load', 'LOAD'],
                ['unload', 'UNLOAD']
            ]), 'STATE');
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    }
}

Blocks['event_player_interact'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on player')
            .appendField(new FieldDropdown([
                ['left click air', 'LEFT_CLICK_AIR'],
                ['right click air', 'RIGHT_CLICK_AIR'],
                ['left click block', 'LEFT_CLICK_BLOCK'],
                ['right click block', 'RIGHT_CLICK_BLOCK'],
                ['stepping onto or into a block', 'PHYSICAL']
            ]), 'ACTION');
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player': ['Player', 'event.getPlayer()'],
            'event-item': ['ItemStack', 'event.getItem()'],
            'event-block': ['Block', 'event.getClickedBlock()'],
        };
        this.cancel_ = true;
    }
};

Blocks['event_player_walk'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on player walk')
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player': ['Player', 'event.getPlayer()'],
            'event-from': ['Location', 'event.getFrom()'],
            'event-to': ['Location', 'event.getTo()'],
        };
        this.cancel_ = true;
    }
};

Blocks['event_inventory'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on inventory')
            .appendField(new FieldDropdown([
                ['open', 'OPEN'],
                ['click', 'CLICK'],
                ['close', 'CLOSE'],
            ]), 'ACTION');
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player': ['Player', 'event.getPlayer()'],
            'event-inventory': ['Location', 'event.getInventory()'],
        };
        this.cancel_ = true;
    },

    onchange: function (event) {
        if (!this.workspace.isDragging || this.workspace.isDragging() || event.type !== Events.BLOCK_CHANGE) {
            return;
        }
        switch (this.getFieldValue('ACTION')) {
            case 'OPEN':
            case 'CLOSE':
                this.gets_ = {
                    'event-player': ['Player', 'event.getPlayer()'],
                    'event-inventory': ['Location', 'event.getInventory()'],
                }
                break;
            case 'CLICK':
                this.gets_ = {
                    'event-player': ['Player', 'event.getPlayer()'],
                    'event-inventory': ['Location', 'event.getInventory()'],
                    'event-item': ['ItemStack', 'event.getCurrentItem()'],
                    'event-slot': ['Number', 'event.getSlot()'],
                };
                break;
        }
    }
};