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
                'options': [
                    [
                        'AM',
                        'AM'
                    ],
                    [
                        'PM',
                        'PM'
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
        'inputsInline': true,
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'event_armor_change',
        'message0': 'on armor change',
        'args0': [],
        'message1': 'event item %1',
        'args1': [{
            'type': 'field_variable',
            'name': 'ITEM',
            'variable': 'eventItem',
        }],
        'message2': 'event player %1',
        'args2': [{
            'type': 'field_variable',
            'name': 'PLAYER',
            'variable': 'eventPlayer',
        }],
        'message3': '%1',
        'args3': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'event_bed_enter',
        'message0': 'on bed enter',
        'args0': [],
        'message1': 'event player %1',
        'args1': [{
            'type': 'field_variable',
            'name': 'PLAYER',
            'variable': 'eventPlayer',
        }],
        'message2': 'event block %1',
        'args2': [{
            'type': 'field_variable',
            'name': 'BLOCK',
            'variable': 'eventBlock',
        }],
        'message3': '%1',
        'args3': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'event_bed_leave',
        'message0': 'on bed leave',
        'args0': [],
        'message1': 'event player %1',
        'args1': [{
            'type': 'field_variable',
            'name': 'PLAYER',
            'variable': 'eventPlayer',
        }],
        'message2': 'event block %1',
        'args2': [{
            'type': 'field_variable',
            'name': 'BLOCK',
            'variable': 'eventBlock',
        }],
        'message3': '%1',
        'args3': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
    },
    {
        'type': 'event_block_grow',
        'message0': 'on block grow',
        'args0': [],
        'message1': 'event block %1',
        'args1': [{
            'type': 'field_variable',
            'name': 'BLOCK',
            'variable': 'eventBlock',
        }],
        'message2': '%1',
        'args2': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'colour': 65,
        'tooltip': '',
        'helpUrl': '',
    },
]);