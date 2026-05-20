'use strict';

goog.module('Blockly.blocks.location');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    // ─── Constructor ────────────────────────────────────────────────────────────
    {
        'type': 'location',
        'message0': 'location world: %1  x: %2  y: %3  z: %4',
        'args0': [
            { 'type': 'input_value', 'name': 'WORLD', 'check': 'String' },
            { 'type': 'input_value', 'name': 'X', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Y', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Z', 'check': 'Number' },
        ],
        'inputsInline': true,
        'output': 'Location',
        'colour': 290,
        'tooltip': 'Create a Location from world name and coordinates.',
        'helpUrl': ''
    },

    // ─── Coordinate getters ──────────────────────────────────────────────────────
    {
        'type': 'location_get_coord',
        'message0': 'get %1 of location %2',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'AXIS',
                'options': [
                    ['X', 'X'],
                    ['Y', 'Y'],
                    ['Z', 'Z'],
                    ['yaw',   'YAW'],
                    ['pitch', 'PITCH'],
                ]
            },
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' },
        ],
        'inputsInline': true,
        'output': 'Number',
        'colour': 290,
        'tooltip': 'Extract a coordinate or angle from a Location.',
        'helpUrl': ''
    },

    // ─── World name from location ────────────────────────────────────────────────
    {
        'type': 'location_get_world',
        'message0': 'get world name of location %1',
        'args0': [{ 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }],
        'inputsInline': true,
        'output': 'String',
        'colour': 290,
        'tooltip': "Returns the name of the world the location is in.",
        'helpUrl': ''
    },

    // ─── Block at location ───────────────────────────────────────────────────────
    {
        'type': 'location_get_block_type',
        'message0': 'get block type at location %1',
        'args0': [{ 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' }],
        'inputsInline': true,
        'output': 'String',
        'colour': 290,
        'tooltip': "Returns the material name of the block at the given location.",
        'helpUrl': ''
    },

    // ─── Location offset ─────────────────────────────────────────────────────────
    {
        'type': 'location_add',
        'message0': 'location %1 offset  x: %2  y: %3  z: %4',
        'args0': [
            { 'type': 'input_value', 'name': 'LOCATION', 'check': 'Location' },
            { 'type': 'input_value', 'name': 'X', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Y', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'Z', 'check': 'Number' },
        ],
        'inputsInline': true,
        'output': 'Location',
        'colour': 290,
        'tooltip': 'Returns a new Location offset by x, y, z from the given location.',
        'helpUrl': ''
    },

    // ─── Distance ────────────────────────────────────────────────────────────────
    {
        'type': 'location_distance',
        'message0': 'distance from %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'LOC_A', 'check': 'Location' },
            { 'type': 'input_value', 'name': 'LOC_B', 'check': 'Location' },
        ],
        'inputsInline': true,
        'output': 'Number',
        'colour': 290,
        'tooltip': 'Returns the Euclidean distance (in blocks) between two locations.',
        'helpUrl': ''
    },
]);
