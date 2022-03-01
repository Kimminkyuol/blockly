'use strict';

goog.module('Blockly.blocks.player');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    {
        'type': 'player_get_by_name',
        'message0': 'get player by name %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'NAME',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        'output': 'Player',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_by_uuid',
        'message0': 'get player by uuid %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'UUID',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        'output': 'Player',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_string',
        'message0': 'get %1\'s %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['name', 'NAME'],
                    ['uuid', 'UUID'],
                    ['ip', 'IP'],
                    ['game mode', 'GAME_MODE'],
                    ['location\'s biome', 'BIOME'],
                ],
            },
        ],
        'inputsInline': true,
        'output': 'String',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_number',
        'message0': 'get %1\'s %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['health', 'HEALTH'],
                    ['max health', 'MAX_HEALTH'],
                    ['hunger', 'HUNGER'],
                    ['air', 'AIR'],
                    ['exp', 'EXP'],
                    ['exp level', 'EXP_LEVEL'],
                    ['first empty slot', 'FIRST_EMPTY_SLOT'],
                    ['x location', 'X_LOCATION'],
                    ['y location', 'Y_LOCATION'],
                    ['z location', 'Z_LOCATION'],
                    ['world\'s time', 'TIME'],
                    ['server\'s online players', 'ONLINE'],
                    ['server\'s tps', 'TPS'],
                    ['money', 'MONEY'],
                ],
            },
        ],
        'inputsInline': true,
        'output': 'Number',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_boolean',
        'message0': 'get %1 %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['is op', 'OP'],
                    ['is flying', 'FLYING'],
                    ['is sprinting', 'SPRINTING'],
                    ['is burning', 'BURNING'],
                    ['is sneaking', 'SNEAKING'],
                ],
            },
        ],
        'inputsInline': true,
        'output': 'Number',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_location',
        'message0': 'get %1\'s %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['location', 'LOCATION'],
                ],
            },
        ],
        'inputsInline': true,
        'output': 'Location',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_item',
        'message0': 'get %1\'s %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'PLAYER',
                'check': 'Player',
            },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['held item', 'ITEM'],
                ],
            },
        ],
        'inputsInline': true,
        'output': 'ItemStack',
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'player_get_any',
        'message0': 'get database key: %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'KEY',
                'check': 'String',
            },
        ],
        'inputsInline': true,
        'output': null,
        'colour': 230,
        'tooltip': '',
        'helpUrl': '',
    },
]);