'use strict';

goog.module('Blockly.blocks.world');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    // ─── Lookup ─────────────────────────────────────────────────────────────────
    {
        'type': 'world_get',
        'message0': 'get world %1',
        'args0': [{ 'type': 'input_value', 'name': 'NAME', 'check': 'String' }],
        'inputsInline': true,
        'output': 'World',
        'colour': 120,
        'tooltip': 'Returns a World by its name (null if not loaded).',
        'helpUrl': ''
    },

    // ─── Block access ────────────────────────────────────────────────────────────
    {
        'type': 'world_get_block_at',
        'message0': 'get block in %1 at %2',
        'args0': [
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'World' },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }
        ],
        'inputsInline': true,
        'output': 'Block',
        'colour': 120,
        'tooltip': 'Returns the Block at the given location in the world.',
        'helpUrl': ''
    },

    // ─── Entity spawn ─────────────────────────────────────────────────────────────
    {
        'type': 'world_spawn_entity',
        'message0': 'spawn %1 in %2 at %3',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY_TYPE', 'check': 'String' },
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'World' },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 120,
        'tooltip': 'Spawn an entity (e.g. "ZOMBIE") in the world at the given location.',
        'helpUrl': ''
    },

    // ─── Time ────────────────────────────────────────────────────────────────────
    {
        'type': 'world_get_time',
        'message0': 'get time of %1',
        'args0': [{ 'type': 'input_value', 'name': 'WORLD', 'check': 'World' }],
        'inputsInline': true,
        'output': 'Number',
        'colour': 120,
        'tooltip': "Returns the world's current game time (0–24000).",
        'helpUrl': ''
    },
    {
        'type': 'world_set_time',
        'message0': 'set time of %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'World' },
            { 'type': 'input_value', 'name': 'TIME', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 120,
        'tooltip': 'Set the world time (0 = dawn, 6000 = noon, 18000 = midnight).',
        'helpUrl': ''
    },

    // ─── Weather ──────────────────────────────────────────────────────────────────
    {
        'type': 'world_get_weather',
        'message0': 'is %1 storming',
        'args0': [{ 'type': 'input_value', 'name': 'WORLD', 'check': 'World' }],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 120,
        'tooltip': 'Returns true if the world currently has a storm.',
        'helpUrl': ''
    },
    {
        'type': 'world_set_weather',
        'message0': 'set storm in %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'World' },
            { 'type': 'input_value', 'name': 'STORM', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 120,
        'tooltip': 'Enable or disable storm (rain) in the world.',
        'helpUrl': ''
    },

    // ─── Players ─────────────────────────────────────────────────────────────────
    {
        'type': 'world_get_players',
        'message0': 'get players in %1',
        'args0': [{ 'type': 'input_value', 'name': 'WORLD', 'check': 'World' }],
        'inputsInline': true,
        'output': null,
        'colour': 120,
        'tooltip': 'Returns a List of players currently in the world.',
        'helpUrl': ''
    },
]);
