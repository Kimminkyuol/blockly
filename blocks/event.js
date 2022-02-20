'use strict';

goog.module('Blockly.blocks.event');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    {
        'type': 'event_at_time',
        'message0': 'at %1 : %2 %3 in %4',
        'args0': [
            {
                'type': 'input_value',
                'name': 'HOUR',
                'check': 'Number',
                'align': 'RIGHT',
            },
            {
                'type': 'input_value',
                'name': 'MINUTE',
                'check': 'Number',
                'align': 'RIGHT',
            },
            {
                'type': 'field_dropdown',
                'name': 'AMPM',
                "options": [
                    [
                        "AM",
                        "AM"
                    ],
                    [
                        "PM",
                        "PM"
                    ]
                ]
            },
            {
                'type': 'input_value',
                'name': 'WORLD',
                'check': 'String',
            },
        ],
        'message1': '%1',
        'args1': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        "inputsInline": true,
        'colour': 65,
        "tooltip": "",
        "helpUrl": "",
    },
]);