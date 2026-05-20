'use strict';

goog.module('Blockly.blocks.event');

const Events = goog.require('Blockly.Events');
const {Blocks} = goog.require('Blockly.blocks');
const {FieldDropdown} = goog.require('Blockly.FieldDropdown');
const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

// ─── Shared helpers ────────────────────────────────────────────────────────────

/** Mixin for blocks that must live inside a cancellable event block. */
const CANCEL_CHECK_MIXIN = {
    getSurroundEvent: function () {
        let block = this;
        do {
            if (block.type && block.type.startsWith('event_') && block.cancel_) return block;
            block = block.getSurroundParent();
        } while (block);
        return null;
    },
    onchange: function (event) {
        if (!this.workspace.isDragging || this.workspace.isDragging() ||
            event.type !== Events.BLOCK_MOVE) return;
        const enabled = this.getSurroundEvent();
        this.setWarningText(enabled ? null : 'This block may only be used within a cancellable event.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(event.group);
            this.setEnabled(!!enabled);
            Events.setGroup(group);
        }
    }
};

// ─── event_get ─────────────────────────────────────────────────────────────────

Blocks['event_get'] = {
    init: function () {
        this.appendDummyInput('OPTION_DUMMY')
            .appendField(new FieldDropdown([['event value', 'Object,null']]), 'OPTION');
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip('Get a value from the surrounding event context.');
        this.setHelpUrl('');
    },
    _refreshDropdown: function () {
        if (!this.gets_) return;
        const entries = Object.entries(this.gets_)
            .map(([label, [type, expr]]) => [label, type + ',' + expr]);
        if (!entries.length) return;
        this.removeInput('OPTION_DUMMY', true);
        this.appendDummyInput('OPTION_DUMMY')
            .appendField(new FieldDropdown(entries), 'OPTION');
        const val = this.getFieldValue('OPTION');
        if (val) this.setOutput(true, val.split(',')[0] || null);
    },
    getSurroundEvent: function () {
        let block = this;
        while (block.getSurroundParent()) block = block.getSurroundParent();
        if (block && block.gets_) this.gets_ = block.gets_;
        if (this.gets_) { this._refreshDropdown(); return this; }
        return null;
    },
    onchange: function (event) {
        if (event.type === Events.BLOCK_CHANGE) {
            const val = this.getFieldValue('OPTION');
            if (val) this.setOutput(true, val.split(',')[0] || null);
            return;
        }
        if (!this.workspace.isDragging || this.workspace.isDragging() ||
            event.type !== Events.BLOCK_MOVE) return;
        const enabled = this.getSurroundEvent();
        this.setWarningText(enabled ? null : 'Place inside an event block.');
        if (!this.isInFlyout) {
            const group = Events.getGroup();
            Events.setGroup(event.group);
            this.setEnabled(!!enabled);
            Events.setGroup(group);
        }
    },
    saveExtraState: function () { return { gets: this.gets_ }; },
    loadExtraState: function (state) { this.gets_ = state.gets; this._refreshDropdown(); }
};

// ─── event_cancel ──────────────────────────────────────────────────────────────

Blocks['event_cancel'] = Object.assign({
    init: function () {
        this.appendDummyInput().appendField('cancel event');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('Prevent the event from happening (e.g. block damage, block break).');
        this.setHelpUrl('');
    }
}, CANCEL_CHECK_MIXIN);

// ─── event_set_cancel_message ──────────────────────────────────────────────────

Blocks['event_set_message'] = {
    init: function () {
        this.appendValueInput('MESSAGE').setCheck('String')
            .appendField(new FieldDropdown([
                ['set join message', 'JOIN'],
                ['set quit message', 'QUIT'],
                ['set death message', 'DEATH'],
                ['set chat message', 'CHAT'],
            ]), 'TYPE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('Override the event message string.');
        this.setHelpUrl('');
    }
};

// ─── Server events ─────────────────────────────────────────────────────────────

Blocks['event_server_state_change'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on server')
            .appendField(new FieldDropdown([
                ['enable', 'ENABLE'],
                ['disable', 'DISABLE'],
            ]), 'STATE');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when the plugin is enabled or disabled.');
        this.setHelpUrl('');
    }
};

// ─── Player interaction events ─────────────────────────────────────────────────

Blocks['event_player_interact'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on player')
            .appendField(new FieldDropdown([
                ['left click air', 'LEFT_CLICK_AIR'],
                ['right click air', 'RIGHT_CLICK_AIR'],
                ['left click block', 'LEFT_CLICK_BLOCK'],
                ['right click block', 'RIGHT_CLICK_BLOCK'],
                ['physical (step)', 'PHYSICAL'],
            ]), 'ACTION');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player interacts with the world.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':   ['Player',    'event.getPlayer()'],
            'event-item':     ['ItemStack',  'event.getItem()'],
            'event-block':    ['Block',      'event.getClickedBlock()'],
        };
        this.cancel_ = true;
    }
};

Blocks['event_player_join'] = {
    init: function () {
        this.appendDummyInput().appendField('on player join');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player joins the server.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':        ['Player', 'event.getPlayer()'],
            'event-join-message':  ['String', 'event.getJoinMessage()'],
        };
        this.cancel_ = false;
    }
};

Blocks['event_player_quit'] = {
    init: function () {
        this.appendDummyInput().appendField('on player quit');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player leaves the server.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':       ['Player', 'event.getPlayer()'],
            'event-quit-message': ['String', 'event.getQuitMessage()'],
        };
        this.cancel_ = false;
    }
};

Blocks['event_player_walk'] = {
    init: function () {
        this.appendDummyInput().appendField('on player move');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player moves.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player': ['Player',   'event.getPlayer()'],
            'event-from':   ['Location', 'event.getFrom()'],
            'event-to':     ['Location', 'event.getTo()'],
        };
        this.cancel_ = true;
    }
};

Blocks['event_player_death'] = {
    init: function () {
        this.appendDummyInput().appendField('on player death');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player dies.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':        ['Player', 'event.getEntity()'],
            'event-death-message': ['String', 'event.getDeathMessage()'],
        };
        this.cancel_ = false;
    }
};

Blocks['event_player_respawn'] = {
    init: function () {
        this.appendDummyInput().appendField('on player respawn');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player respawns after death.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':           ['Player',   'event.getPlayer()'],
            'event-respawn-location': ['Location', 'event.getRespawnLocation()'],
        };
        this.cancel_ = false;
    }
};

Blocks['event_chat'] = {
    init: function () {
        this.appendDummyInput().appendField('on player chat');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player sends a chat message (async).');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':  ['Player', 'event.getPlayer()'],
            'event-message': ['String', 'event.getMessage()'],
        };
        this.cancel_ = true;
    }
};

// ─── Block events ───────────────────────────────────────────────────────────────

Blocks['event_block_break'] = {
    init: function () {
        this.appendDummyInput().appendField('on block break');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player breaks a block.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':    ['Player',   'event.getPlayer()'],
            'event-block':     ['Block',    'event.getBlock()'],
            'event-block-type':['String',   'event.getBlock().getType().name()'],
        };
        this.cancel_ = true;
    }
};

Blocks['event_block_place'] = {
    init: function () {
        this.appendDummyInput().appendField('on block place');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when a player places a block.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':    ['Player',   'event.getPlayer()'],
            'event-block':     ['Block',    'event.getBlock()'],
            'event-block-type':['String',   'event.getBlock().getType().name()'],
            'event-item-in-hand': ['ItemStack', 'event.getItemInHand()'],
        };
        this.cancel_ = true;
    }
};

// ─── Entity / damage events ─────────────────────────────────────────────────────

Blocks['event_entity_damage'] = {
    init: function () {
        this.appendDummyInput().appendField('on entity damage');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when any entity (including players) takes damage.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-entity':       ['Entity', 'event.getEntity()'],
            'event-damage':       ['Number', 'event.getDamage()'],
            'event-cause':        ['String', 'event.getCause().name()'],
        };
        this.cancel_ = true;
    }
};

Blocks['event_entity_damage_by_entity'] = {
    init: function () {
        this.appendDummyInput().appendField('on entity damage by entity');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires when an entity is damaged by another entity (PvP, mob hit, etc.).');
        this.setHelpUrl('');
        this.gets_ = {
            'event-entity':   ['Entity', 'event.getEntity()'],
            'event-damager':  ['Entity', 'event.getDamager()'],
            'event-damage':   ['Number', 'event.getDamage()'],
        };
        this.cancel_ = true;
    }
};

// ─── Inventory events ───────────────────────────────────────────────────────────

Blocks['event_inventory'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('on inventory')
            .appendField(new FieldDropdown([
                ['open',  'OPEN'],
                ['click', 'CLICK'],
                ['close', 'CLOSE'],
            ]), 'ACTION');
        this.appendStatementInput('DO').setCheck(null).appendField('do');
        this.setColour(65);
        this.setTooltip('Fires on inventory open, click, or close.');
        this.setHelpUrl('');
        this.gets_ = {
            'event-player':    ['Player', 'event.getPlayer()'],
            'event-inventory': ['Inventory', 'event.getInventory()'],
        };
        this.cancel_ = true;
    },
    onchange: function (event) {
        if (!this.workspace.isDragging || this.workspace.isDragging() ||
            event.type !== Events.BLOCK_CHANGE) return;
        const action = this.getFieldValue('ACTION');
        if (action === 'CLICK') {
            this.gets_ = {
                'event-player':    ['Player',    'event.getPlayer()'],
                'event-inventory': ['Inventory', 'event.getInventory()'],
                'event-item':      ['ItemStack', 'event.getCurrentItem()'],
                'event-slot':      ['Number',    'event.getSlot()'],
            };
        } else {
            this.gets_ = {
                'event-player':    ['Player',    'event.getPlayer()'],
                'event-inventory': ['Inventory', 'event.getInventory()'],
            };
        }
    }
};

// ─── Event damage modifier ─────────────────────────────────────────────────────

defineBlocksWithJsonArray([
    {
        'type': 'event_set_damage',
        'message0': 'set damage to %1',
        'args0': [{ 'type': 'input_value', 'name': 'DAMAGE', 'check': 'Number' }],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 65,
        'tooltip': 'Override the damage amount of a damage event.',
        'helpUrl': ''
    },
]);

Blocks['event_set_damage'] = Object.assign(Blocks['event_set_damage'] || {}, {});
