'use strict';

goog.module('Blockly.blocks.executor');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    // ─── Messaging ──────────────────────────────────────────────────────────────
    {
        'type': 'executor_message',
        'message0': 'send message %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'TEXT', 'check': 'String' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Send a chat message to a player.',
        'helpUrl': ''
    },
    {
        'type': 'executor_action_bar',
        'message0': 'send action bar %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'TEXT', 'check': 'String' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Display text above the hotbar.',
        'helpUrl': ''
    },
    {
        'type': 'executor_send_title',
        'message0': 'send title %1 subtitle %2 to %3 fade-in %4 stay %5 fade-out %6 ticks',
        'args0': [
            { 'type': 'input_value', 'name': 'TITLE', 'check': 'String' },
            { 'type': 'input_value', 'name': 'SUBTITLE', 'check': 'String' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'FADE_IN', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'STAY', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'FADE_OUT', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Show a title and subtitle on screen.',
        'helpUrl': ''
    },
    {
        'type': 'executor_broadcast',
        'message0': 'broadcast %1',
        'args0': [{ 'type': 'input_value', 'name': 'TEXT', 'check': 'String' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Broadcast a message to all players.',
        'helpUrl': ''
    },
    {
        'type': 'executor_log',
        'message0': 'log %1',
        'args0': [{ 'type': 'input_value', 'name': 'TEXT', 'check': 'String' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Write a message to the server console log.',
        'helpUrl': ''
    },

    // ─── Player setters ─────────────────────────────────────────────────────────
    {
        'type': 'executor_set_health',
        'message0': "set %1's health to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'HEALTH', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set actual health (0–max health).',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_max_health',
        'message0': "set %1's max health to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'HEALTH', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set maximum health via Attribute.',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_saturation',
        'message0': "set %1's saturation to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'SATURATION', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set food saturation (0.0–20.0).',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_exp',
        'message0': "set %1's exp to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'EXP', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set experience progress within the current level (0.0–1.0).',
        'helpUrl': ''
    },
    {
        'type': 'executor_give_exp',
        'message0': 'give %1 %2 exp',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'AMOUNT', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Award experience points to a player.',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_game_mode',
        'message0': "set %1's game mode to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            {
                'type': 'field_dropdown',
                'name': 'GAME_MODE',
                'options': [
                    ['survival',  'SURVIVAL'],
                    ['creative',  'CREATIVE'],
                    ['adventure', 'ADVENTURE'],
                    ['spectator', 'SPECTATOR']
                ]
            }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Change the game mode of a player.',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_fly_mode',
        'message0': "set %1's fly mode to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'MODE', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Enable or disable flying for a player.',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_walk_speed',
        'message0': "set %1's walk speed to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'SPEED', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set walking speed (-1.0 to 1.0, default 0.2).',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_fly_speed',
        'message0': "set %1's fly speed to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'SPEED', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set flying speed (-1.0 to 1.0, default 0.1).',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_display_name',
        'message0': "set %1's display name to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'NAME', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Change the display name shown in chat and tab list.',
        'helpUrl': ''
    },
    {
        'type': 'executor_teleport',
        'message0': 'teleport %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Teleport a player to a location.',
        'helpUrl': ''
    },
    {
        'type': 'executor_velocity',
        'message0': "set %1's velocity x: %2  y: %3  z: %4",
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'X', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Y', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Z', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Launch a player in the given direction.',
        'helpUrl': ''
    },
    {
        'type': 'executor_kill',
        'message0': 'kill %1',
        'args0': [{ 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set player health to 0 (kills them).',
        'helpUrl': ''
    },
    {
        'type': 'executor_kick',
        'message0': 'kick %1 reason %2',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'DUE', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Disconnect a player with a reason message.',
        'helpUrl': ''
    },

    // ─── Inventory ──────────────────────────────────────────────────────────────
    {
        'type': 'executor_give',
        'message0': 'give item %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Add an item to a player inventory.',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_item',
        'message0': 'set slot %1 of %2 to %3',
        'args0': [
            { 'type': 'input_value', 'name': 'SLOT', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set a specific inventory slot.',
        'helpUrl': ''
    },
    {
        'type': 'executor_clear_inventory',
        'message0': "clear %1's inventory",
        'args0': [{ 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Remove all items from a player inventory.',
        'helpUrl': ''
    },
    {
        'type': 'executor_close_gui',
        'message0': 'close inventory of %1',
        'args0': [{ 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Force-close the open inventory GUI for a player.',
        'helpUrl': ''
    },

    // ─── Effects ─────────────────────────────────────────────────────────────────
    {
        'type': 'executor_potion',
        'message0': 'apply potion %1 tier %2 to %3 for %4 ticks',
        'args0': [
            { 'type': 'input_value', 'name': 'POTION', 'check': 'String' },
            { 'type': 'input_value', 'name': 'TIER', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'TIME', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Apply a potion effect by name (e.g. "SPEED"). Tier 0 = I, tier 1 = II, etc.',
        'helpUrl': ''
    },
    {
        'type': 'executor_clear_potion',
        'message0': 'remove all potion effects from %1',
        'args0': [{ 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Remove all active potion effects.',
        'helpUrl': ''
    },
    {
        'type': 'executor_burn',
        'message0': 'set %1 on fire for %2 ticks',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'TIME', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set a player on fire for N ticks (20 ticks = 1 second).',
        'helpUrl': ''
    },
    {
        'type': 'executor_play_sound',
        'message0': 'play sound %1 to %2 volume %3 pitch %4',
        'args0': [
            { 'type': 'input_value', 'name': 'SOUND', 'check': 'String' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'VOLUME', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'PITCH', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Play a Sound to a player at their position (sound name e.g. "ENTITY_PLAYER_LEVELUP").',
        'helpUrl': ''
    },

    // ─── World actions ───────────────────────────────────────────────────────────
    {
        'type': 'executor_explosion',
        'message0': 'create explosion power %1 at %2 fire %3',
        'args0': [
            { 'type': 'input_value', 'name': 'POWER', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' },
            { 'type': 'input_value', 'name': 'FIRE', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Create an explosion at a location. Power 4 = TNT.',
        'helpUrl': ''
    },
    {
        'type': 'executor_lightning',
        'message0': 'strike lightning at %1',
        'args0': [{ 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Spawn a lightning bolt at the given location.',
        'helpUrl': ''
    },
    {
        'type': 'executor_set_block',
        'message0': 'set block at %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' },
            { 'type': 'input_value', 'name': 'MATERIAL', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Place a block by material name (e.g. "STONE") at the location.',
        'helpUrl': ''
    },
    {
        'type': 'executor_clear_entity',
        'message0': 'remove entities within %1 radius of %2',
        'args0': [
            { 'type': 'input_value', 'name': 'RADIUS', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Remove all non-player entities within the radius.',
        'helpUrl': ''
    },
    {
        'type': 'executor_time',
        'message0': 'set time of world %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'String' },
            { 'type': 'input_value', 'name': 'TIME', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Set the time in a world by name.',
        'helpUrl': ''
    },
    {
        'type': 'executor_weather',
        'message0': 'set storm in world %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'String' },
            { 'type': 'input_value', 'name': 'STORM', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Enable or disable rain in a world by name.',
        'helpUrl': ''
    },

    // ─── Commands ────────────────────────────────────────────────────────────────
    {
        'type': 'executor_command',
        'message0': 'make %1 run command %2',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'COMMAND', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Dispatch a command as if the player typed it.',
        'helpUrl': ''
    },
    {
        'type': 'executor_op_command',
        'message0': 'make %1 run op command %2',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'COMMAND', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Temporarily op the player, run the command, then de-op.',
        'helpUrl': ''
    },
    {
        'type': 'executor_console_command',
        'message0': 'run console command %1',
        'args0': [{ 'type': 'input_value', 'name': 'COMMAND', 'check': 'String' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Execute a command from the console sender.',
        'helpUrl': ''
    },

    // ─── Economy / Permissions ───────────────────────────────────────────────────
    {
        'type': 'executor_money',
        'message0': 'add %1 coins to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'MONEY', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Deposit money via Vault Economy (requires Vault).',
        'helpUrl': ''
    },
    {
        'type': 'executor_permission',
        'message0': '%1 permission %2 to %3',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'OPTION',
                'options': [['add', 'ADD'], ['remove', 'REMOVE']]
            },
            { 'type': 'input_value', 'name': 'PERMISSION', 'check': 'String' },
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Add or remove a permission node (requires Vault).',
        'helpUrl': ''
    },

    // ─── Database ────────────────────────────────────────────────────────────────
    {
        'type': 'executor_db_put',
        'message0': 'database put key %1 value %2',
        'args0': [
            { 'type': 'input_value', 'name': 'KEY', 'check': 'String' },
            { 'type': 'input_value', 'name': 'VALUE', 'check': null }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Store a key-value pair in the plugin database.',
        'helpUrl': ''
    },
    {
        'type': 'executor_db_save',
        'message0': 'database save',
        'args0': [],
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Persist the plugin database to disk.',
        'helpUrl': ''
    },

    // ─── Control ─────────────────────────────────────────────────────────────────
    {
        'type': 'executor_wait',
        'message0': 'after %1 ticks do %2',
        'args0': [
            { 'type': 'input_value', 'name': 'TIME', 'check': 'Number' },
            { 'type': 'input_statement', 'name': 'DO' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 160,
        'tooltip': 'Schedule code to run after N ticks (20 ticks = 1 second).',
        'helpUrl': ''
    },
    {
        'type': 'executor_exit',
        'message0': 'exit',
        'args0': [],
        'previousStatement': null,
        'colour': 160,
        'tooltip': 'Return from the current handler immediately.',
        'helpUrl': ''
    },
]);
