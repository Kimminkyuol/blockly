'use strict';

goog.module('Blockly.blocks.entity');

const {Blocks} = goog.require('Blockly.blocks');
const {FieldDropdown} = goog.require('Blockly.FieldDropdown');
const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

// Entity inputs accept both Entity and Player (Player extends Entity)
const ENTITY_CHECK = ['Entity', 'Player'];

defineBlocksWithJsonArray([
    // ─── Value: Entity info ──────────────────────────────────────────────────────
    {
        'type': 'entity_get_type',
        'message0': 'type of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'String',
        'colour': 20,
        'tooltip': 'Get the entity type as a string (e.g. "ZOMBIE", "PLAYER").',
        'helpUrl': ''
    },
    {
        'type': 'entity_get_name',
        'message0': 'name of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'String',
        'colour': 20,
        'tooltip': 'Get the display name of the entity (custom name if set, otherwise default).',
        'helpUrl': ''
    },
    {
        'type': 'entity_get_health',
        'message0': 'health of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'Number',
        'colour': 20,
        'tooltip': 'Get the current health of a living entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_get_max_health',
        'message0': 'max health of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'Number',
        'colour': 20,
        'tooltip': 'Get the maximum health of a living entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_get_location',
        'message0': 'location of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'Location',
        'colour': 20,
        'tooltip': 'Get the current location of an entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_get_world',
        'message0': 'world of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'World',
        'colour': 20,
        'tooltip': 'Get the world the entity is currently in.',
        'helpUrl': ''
    },
    {
        'type': 'entity_is_valid',
        'message0': '%1 is alive',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 20,
        'tooltip': 'Returns true if the entity is alive and still in a world.',
        'helpUrl': ''
    },
    {
        'type': 'entity_is_type',
        'message0': 'type of %1 is %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'TYPE', 'check': 'String' }
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 20,
        'tooltip': 'Check if the entity type matches the given string (e.g. "ZOMBIE", "PLAYER").',
        'helpUrl': ''
    },
    {
        'type': 'entity_as_player',
        'message0': '%1 as player',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'output': 'Player',
        'colour': 20,
        'tooltip': 'Cast an entity to a Player. Use inside events where the entity is guaranteed to be a player.',
        'helpUrl': ''
    },
    {
        'type': 'entity_get_nearby',
        'message0': 'entities within radius %1 of %2',
        'args0': [
            { 'type': 'input_value', 'name': 'RADIUS', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }
        ],
        'inputsInline': true,
        'output': null,
        'colour': 20,
        'tooltip': 'Get a list of all entities within the given radius of a location.',
        'helpUrl': ''
    },
    {
        'type': 'entity_spawn_at',
        'message0': 'spawn %1 at %2',
        'args0': [
            { 'type': 'input_value', 'name': 'TYPE', 'check': 'String' },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }
        ],
        'inputsInline': true,
        'output': 'Entity',
        'colour': 20,
        'tooltip': 'Spawn an entity by type (e.g. "ZOMBIE") and return it for further use.',
        'helpUrl': ''
    },

    // ─── Statement: Entity actions ────────────────────────────────────────────────
    {
        'type': 'entity_set_health',
        'message0': "set %1's health to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'HEALTH', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Set the health of a living entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_max_health',
        'message0': "set %1's max health to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'HEALTH', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Set the maximum health of a living entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_name',
        'message0': "set %1's name to %2",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'NAME', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Set a custom nametag displayed above the entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_remove',
        'message0': 'remove %1',
        'args0': [{ 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Despawn and remove the entity from the world.',
        'helpUrl': ''
    },
    {
        'type': 'entity_damage',
        'message0': 'deal %1 damage to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'DAMAGE', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Deal damage to a living entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_damage_by_player',
        'message0': '%1 deals %2 damage to %3',
        'args0': [
            { 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' },
            { 'type': 'input_value', 'name': 'DAMAGE', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Deal damage to an entity and attribute it to a player (shows correct death messages).',
        'helpUrl': ''
    },
    {
        'type': 'entity_teleport',
        'message0': 'teleport %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Teleport any entity to a location.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_fire',
        'message0': 'set %1 on fire for %2 ticks',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'TICKS', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Set an entity on fire for N ticks (20 ticks = 1 second). Use 0 to extinguish.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_glowing',
        'message0': 'set %1 glowing %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'GLOW', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Toggle the glowing outline effect on an entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_gravity',
        'message0': 'set %1 gravity %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'GRAVITY', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Enable or disable gravity for an entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_velocity',
        'message0': "set %1's velocity  x: %2  y: %3  z: %4",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'X', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Y', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Z', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Apply a velocity (knockback) vector to any entity.',
        'helpUrl': ''
    },
    {
        'type': 'entity_add_potion',
        'message0': 'apply potion %1 tier %2 to %3 for %4 ticks',
        'args0': [
            { 'type': 'input_value', 'name': 'POTION', 'check': 'String' },
            { 'type': 'input_value', 'name': 'TIER', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'TIME', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Apply a potion effect by name (e.g. "SPEED") to any living entity. Tier 0 = I.',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_silent',
        'message0': 'set %1 silent %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'SILENT', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Make an entity silent (no sounds).',
        'helpUrl': ''
    },
    {
        'type': 'entity_set_invulnerable',
        'message0': 'set %1 invulnerable %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ENTITY', 'check': ENTITY_CHECK },
            { 'type': 'input_value', 'name': 'INVULNERABLE', 'check': 'Boolean' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 20,
        'tooltip': 'Toggle whether the entity can take damage.',
        'helpUrl': ''
    },
]);
