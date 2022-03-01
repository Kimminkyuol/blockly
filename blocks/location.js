'use strict';

goog.module('Blockly.blocks.location');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    {
        'type': 'location',
        'message0': 'world: %1 x: %2 y: %3 z: %4',
        'args0': [
            {
                'type': 'input_value',
                'name': 'WORLD',
                'check': 'String',
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
        'output': 'Location',
        'colour': 290,
        'tooltip': '',
        'helpUrl': '',
    },
]);