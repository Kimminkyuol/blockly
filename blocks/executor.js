'use strict';

goog.module('Blockly.blocks.executor');

const {Blocks} = goog.require('Blockly.blocks');
const {FieldDropdown} = goog.require('Blockly.FieldDropdown');

Blocks['executor_action_bar'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('send action bar');
        this.appendValueInput('PLAYER')
            .setCheck(['Player'])
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_broadcast'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('broadcast');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_burn'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck(['Player', 'Entity'])
            .appendField('set fire to');
        this.appendValueInput('TIME')
            .setCheck('Number')
            .appendField('for');
        this.appendDummyInput()
            .appendField('ticks');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_clear_entity'] = {
    init: function () {
        this.appendValueInput('RADIUS')
            .setCheck('Number')
            .appendField('delete entities within');
        this.appendValueInput('PLAYER')
            .setCheck(['Player', 'Entity'])
            .appendField('radius of');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_clear_potion'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('remove potion effect from');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_close_gui'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('close the gui that');
        this.appendDummyInput()
            .appendField('is looking at');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_command'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('make');
        this.appendValueInput('COMMAND')
            .setCheck('String')
            .appendField('execute command');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_console_command'] = {
    init: function () {
        this.appendValueInput('COMMAND')
            .setCheck('String')
            .appendField('execute console command');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_db_put'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('database put');
        this.appendValueInput('KEY')
            .setCheck('String')
            .appendField('key');
        this.appendValueInput('VALUE')
            .setCheck(null)
            .appendField('value');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_db_save'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('database save');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_op_command'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('make');
        this.appendValueInput('COMMAND')
            .setCheck('String')
            .appendField('execute op command');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_explosion'] = {
    init: function () {
        this.appendValueInput('POWER')
            .setCheck('Number')
            .appendField('create an explosion of power');
        this.appendValueInput('LOCATION')
            .setCheck('Location')
            .appendField('at');
        this.appendValueInput('FIRE')
            .setCheck('Boolean')
            .appendField('(fire:');
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_give'] = {
    init: function () {
        this.appendValueInput('ITEM')
            .setCheck('ItemStack')
            .appendField('give');
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_kill'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('kill');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_kick'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('kick');
        this.appendValueInput('DUE')
            .setCheck('String')
            .appendField('due to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_lightning'] = {
    init: function () {
        this.appendValueInput('LOCATION')
            .setCheck('Location')
            .appendField('create lightning at');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_log'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('log');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_message'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('send');
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_money'] = {
    init: function () {
        this.appendValueInput('MONEY')
            .setCheck('Number')
            .appendField('change');
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('to');
        this.appendDummyInput()
            .appendField('\'s money');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_permission'] = {
    init: function () {
        this.appendValueInput('PERMISSION')
            .setCheck('String')
            .appendField(new FieldDropdown([
                ['add', 'ADD'],
                ['remove', 'REMOVE']
            ]), 'OPTION')
            .appendField('permission');
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_potion'] = {
    init: function () {
        this.appendValueInput('POTION')
            .setCheck('PotionEffectType')
            .appendField('apply potion of');
        this.appendValueInput('TIER')
            .setCheck('Number')
            .appendField('of tier');
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('to');
        this.appendValueInput('TIME')
            .setCheck('Number')
            .appendField('for');
        this.appendDummyInput()
            .appendField('ticks');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_block'] = {
    init: function () {
        this.appendValueInput('LOCATION')
            .setCheck('Location')
            .appendField('set the block at location');
        this.appendValueInput('MATERIAL')
            .setCheck('Material')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_health'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('HEALTH')
            .setCheck('Number')
            .appendField('\'s health to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_saturation'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('SATURATION')
            .setCheck('Number')
            .appendField('\'s saturation to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_exp'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('EXP')
            .setCheck('Number')
            .appendField('\'s exp to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_walk_speed'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('SPEED')
            .setCheck('Number')
            .appendField('\'s walk speed to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_fly_speed'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('SPEED')
            .setCheck('Number')
            .appendField('\'s fly speed to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_fly_mode'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('MODE')
            .setCheck('Boolean')
            .appendField('\'s fly mode to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_game_mode'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendDummyInput()
            .appendField('\'s game mode to')
            .appendField(new FieldDropdown([
                ['creative', 'CREATIVE'],
                ['survival', 'SURVIVAL'],
                ['adventure', 'ADVENTURE'],
                ['spectator', 'SPECTATOR']
            ]), 'GAME_MODE')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_set_max_health'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('HEALTH')
            .setCheck('Number')
            .appendField('\'s max health to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_exit'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('exit');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_time'] = {
    init: function () {
        this.appendValueInput('WORLD')
            .setCheck('String')
            .appendField('set the time of world in');
        this.appendValueInput('TIME')
            .setCheck('Number')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_teleport'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('teleport');
        this.appendValueInput('LOCATION')
            .setCheck('Location')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_velocity'] = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setCheck('Player')
            .appendField('set');
        this.appendValueInput('X')
            .setCheck('Number')
            .appendField('\'s velocity to Vector(x: ');
        this.appendValueInput('Y')
            .setCheck('Number')
            .appendField(', y: ');
        this.appendValueInput('Z')
            .setCheck('Number')
            .appendField(', z: ');
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_wait'] = {
    init: function () {
        this.appendValueInput('TIME')
            .setCheck('Number')
            .appendField('run task after');
        this.appendDummyInput()
            .appendField('ticks');
        this.appendStatementInput('DO')
            .appendField('do')
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blocks['executor_weather'] = {
    init: function () {
        this.appendValueInput('WORLD')
            .setCheck('String')
            .appendField('set the storm of world in');
        this.appendValueInput('STORM')
            .setCheck('Boolean')
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
