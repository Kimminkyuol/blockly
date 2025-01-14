'use strict';

goog.module('Blockly.blocks.executor');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    {
        'type': 'executor_action_bar',
        'message0': 'send action bar %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'TEXT',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_broadcast',
        'message0': 'broadcast %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'TEXT',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_burn',
        'message0': 'set fire to %1 for %2 ticks',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'TIME',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_clear_entity',
        'message0': 'delete entities within %1 radius of %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'RADIUS',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_clear_potion',
        'message0': 'remove potion effect from %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_close_gui',
        'message0': 'close the gui that %1 is looking at',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_command',
        'message0': 'make %1 execute command %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'COMMAND',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_console_command',
        'message0': 'execute console command %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'COMMAND',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_db_put',
        'message0': 'database put key: %1 value: %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'KEY',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': null,
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_db_save',
        'message0': 'database save',
        'args0': [],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_op_command',
        'message0': 'make %1 execute op command %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'COMMAND',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_explosion',
        'message0': 'create an explosion of power %1 at %2 (fire: %3)',
        'args0': [
            {
                'type': 'input_value',
                'name': 'POWER',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'LOCATION',
                'check': 'Location',
            },
            {
                'type': 'input_value',
                'name': 'FIRE',
                'check': 'Boolean',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_give',
        'message0': 'give %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'ITEM',
                'check': 'ItemStack',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_kill',
        'message0': 'kill %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_kick',
        'message0': 'kick %1 due to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'DUE',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_lightning',
        'message0': 'create lightning at %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'LOCATION',
                'check': 'Location',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_log',
        'message0': 'log %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'TEXT',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_message',
        'message0': 'send %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'TEXT',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_money',
        'message0': 'change %1 to %2\'s money',
        'args0': [
            {
                'type': 'input_value',
                'name': 'MONEY',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_permission',
        'message0': '%1 permission %2 to %3',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['add', 'ADD'],
                    ['remove', 'REMOVE'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'PERMISSION',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_potion',
        'message0': 'apply potion of %1 of tier %2 to %3 for %4 ticks',
        'args0': [
            {
                'type': 'input_value',
                'name': 'POTION',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'TIER',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'TIME',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_block',
        'message0': 'set the block at location %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'LOCATION',
                'check': 'Location',
            },
            {
                'type': 'input_value',
                'name': 'MATERIAL',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_health',
        'message0': 'set %1\'s health to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'HEALTH',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_saturation',
        'message0': 'set %1\'s saturation to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'SATURATION',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_exp',
        'message0': 'set %1\'s exp to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'EXP',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_walk_speed',
        'message0': 'set %1\'s walk speed to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'SPEED',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_fly_speed',
        'message0': 'set %1\'s fly speed to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'SPEED',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_fly_mode',
        'message0': 'set %1\'s fly mode to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'MODE',
                'check': 'Boolean',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_game_mode',
        'message0': 'set %1\'s game mode to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'field_dropdown',
                'name': 'GAME_MODE',
                'options': [
                    ['creative', 'CREATIVE'],
                    ['survival', 'SURVIVAL'],
                    ['adventure', 'ADVENTURE'],
                    ['spectator', 'SPECTATOR'],
                ],
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_set_max_health',
        'message0': 'set %1\'s max health to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'HEALTH',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_exit',
        'message0': 'exit',
        'args0': [],
        "previousStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_time',
        'message0': 'set the time of world in %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'WORLD',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'TIME',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_teleport',
        'message0': 'teleport %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'LOCATION',
                'check': 'Location',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_velocity',
        'message0': 'set %1\'s velocity to x: %2 y: %3 z: %4',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_value',
                'name': 'X',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'Y',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'Z',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_wait',
        'message0': 'run task after %1 ticks %2 do %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'input_dummy',
            },
            {
                'type': 'input_statement',
                'name': 'DO',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'executor_weather',
        'message0': 'set the storm of world in %1 to %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'WORLD',
                'check': 'String',
            },
            {
                'type': 'input_value',
                'name': 'STORM',
                'check': 'Boolean',
            },
        ],
        'inputsInline': true,
        "previousStatement": null,
        "nextStatement": null,
        'colour': 160,
        'tooltip': '',
        'helpUrl': '',
    },
]);