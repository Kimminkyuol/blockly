'use strict';

goog.module('Blockly.blocks.player');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');
const {FieldDropdown} = goog.require('Blockly.FieldDropdown');

defineBlocksWithJsonArray([
    // ─── Lookup ────────────────────────────────────────────────────────────────
    {
        'type': 'player_get_by_name',
        'message0': 'get player by name %1',
        'args0': [{ 'type': 'input_value', 'name': 'NAME', 'check': 'String' }],
        'inputsInline': true,
        'output': 'Player',
        'colour': 230,
        'tooltip': 'Returns an online Player by their username (null if offline).',
        'helpUrl': ''
    },
    {
        'type': 'player_get_by_uuid',
        'message0': 'get player by UUID %1',
        'args0': [{ 'type': 'input_value', 'name': 'UUID', 'check': 'String' }],
        'inputsInline': true,
        'output': 'Player',
        'colour': 230,
        'tooltip': 'Returns an online Player by their UUID string (null if offline).',
        'helpUrl': ''
    },

    // ─── String getters ────────────────────────────────────────────────────────
    {
        'type': 'player_get_string',
        'message0': "get %1's %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['name',           'NAME'],
                    ['display name',   'DISPLAY_NAME'],
                    ['UUID',           'UUID'],
                    ['IP address',     'IP'],
                    ['game mode',      'GAME_MODE'],
                    ['world name',     'WORLD_NAME'],
                    ['biome',          'BIOME'],
                ]
            }
        ],
        'inputsInline': true,
        'output': 'String',
        'colour': 230,
        'tooltip': 'Get a String property of a player.',
        'helpUrl': ''
    },

    // ─── Number getters ────────────────────────────────────────────────────────
    {
        'type': 'player_get_number',
        'message0': "get %1's %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['health',              'HEALTH'],
                    ['max health',          'MAX_HEALTH'],
                    ['food level',          'FOOD'],
                    ['remaining air',       'AIR'],
                    ['exp',                 'EXP'],
                    ['exp level',           'EXP_LEVEL'],
                    ['total exp',           'TOTAL_EXP'],
                    ['X',                   'X_LOCATION'],
                    ['Y',                   'Y_LOCATION'],
                    ['Z',                   'Z_LOCATION'],
                    ['yaw',                 'YAW'],
                    ['pitch',               'PITCH'],
                    ['first empty slot',    'FIRST_EMPTY_SLOT'],
                    ['fire ticks',          'FIRE_TICKS'],
                    ['ping (ms)',            'PING'],
                    ['world time',          'WORLD_TIME'],
                    ['online player count', 'ONLINE_COUNT'],
                ]
            }
        ],
        'inputsInline': true,
        'output': 'Number',
        'colour': 230,
        'tooltip': 'Get a numeric property of a player.',
        'helpUrl': ''
    },

    // ─── Boolean getters ───────────────────────────────────────────────────────
    {
        'type': 'player_get_boolean',
        'message0': 'is %1 %2',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['op',       'OP'],
                    ['flying',   'FLYING'],
                    ['sprinting','SPRINTING'],
                    ['on fire',  'BURNING'],
                    ['sneaking', 'SNEAKING'],
                    ['online',   'ONLINE'],
                    ['in water', 'IN_WATER'],
                ]
            }
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 230,
        'tooltip': 'Check a boolean state of a player.',
        'helpUrl': ''
    },

    // ─── Location / Item getters ────────────────────────────────────────────────
    {
        'type': 'player_get_location',
        'message0': "get %1's location",
        'args0': [{ 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }],
        'inputsInline': true,
        'output': 'Location',
        'colour': 230,
        'tooltip': "Returns the player's current Location.",
        'helpUrl': ''
    },
    {
        'type': 'player_get_item',
        'message0': "get %1's %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [
                    ['held item (main hand)', 'MAIN_HAND'],
                    ['held item (off hand)',  'OFF_HAND'],
                    ['helmet',   'HELMET'],
                    ['chestplate','CHESTPLATE'],
                    ['leggings', 'LEGGINGS'],
                    ['boots',    'BOOTS'],
                ]
            }
        ],
        'inputsInline': true,
        'output': 'ItemStack',
        'colour': 230,
        'tooltip': 'Get an item from the player equipment.',
        'helpUrl': ''
    },

    // ─── Permission check ───────────────────────────────────────────────────────
    {
        'type': 'player_has_permission',
        'message0': '%1 has permission %2',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'PERMISSION', 'check': 'String' }
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 230,
        'tooltip': 'Returns true if the player has the given permission node.',
        'helpUrl': ''
    },

    // ─── Database ───────────────────────────────────────────────────────────────
    {
        'type': 'player_get_any',
        'message0': 'get database key %1',
        'args0': [{ 'type': 'input_value', 'name': 'KEY', 'check': 'String' }],
        'inputsInline': true,
        'output': null,
        'colour': 230,
        'tooltip': 'Get a value from the plugin database by key.',
        'helpUrl': ''
    },

    // ─── Online players ─────────────────────────────────────────────────────────
    {
        'type': 'player_get_online_players',
        'message0': 'get all online players',
        'args0': [],
        'output': null,
        'colour': 230,
        'tooltip': 'Returns a collection of all online players.',
        'helpUrl': ''
    },
]);
