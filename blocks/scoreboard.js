'use strict';

goog.module('Blockly.blocks.scoreboard');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    // ─── Value: Score queries ────────────────────────────────────────────────────
    {
        'type': 'scoreboard_get_score',
        'message0': "score of %1 in %2",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTRY', 'check': 'String' },
            { 'type': 'input_value', 'name': 'OBJECTIVE', 'check': 'String' }
        ],
        'inputsInline': true,
        'output': 'Number',
        'colour': 260,
        'tooltip': 'Get the score of a player (by name) in the given objective.',
        'helpUrl': ''
    },
    {
        'type': 'scoreboard_has_score',
        'message0': "%1 has score in %2",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTRY', 'check': 'String' },
            { 'type': 'input_value', 'name': 'OBJECTIVE', 'check': 'String' }
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 260,
        'tooltip': 'Returns true if the player has a score set in the given objective.',
        'helpUrl': ''
    },

    // ─── Statement: Score setters ────────────────────────────────────────────────
    {
        'type': 'scoreboard_set_score',
        'message0': "set score of %1 in %2 to %3",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTRY', 'check': 'String' },
            { 'type': 'input_value', 'name': 'OBJECTIVE', 'check': 'String' },
            { 'type': 'input_value', 'name': 'VALUE', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Set the score of a player (by name) in the given objective.',
        'helpUrl': ''
    },
    {
        'type': 'scoreboard_add_score',
        'message0': "add %1 to score of %2 in %3",
        'args0': [
            { 'type': 'input_value', 'name': 'AMOUNT', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'ENTRY', 'check': 'String' },
            { 'type': 'input_value', 'name': 'OBJECTIVE', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Add (or subtract with a negative number) a value to a player\'s score.',
        'helpUrl': ''
    },
    {
        'type': 'scoreboard_reset_score',
        'message0': "reset score of %1 in %2",
        'args0': [
            { 'type': 'input_value', 'name': 'ENTRY', 'check': 'String' },
            { 'type': 'input_value', 'name': 'OBJECTIVE', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Remove the player\'s score from the given objective entirely.',
        'helpUrl': ''
    },

    // ─── Statement: Objective management ────────────────────────────────────────
    {
        'type': 'scoreboard_create_objective',
        'message0': 'create objective %1 display %2 in %3',
        'args0': [
            { 'type': 'input_value', 'name': 'NAME', 'check': 'String' },
            { 'type': 'input_value', 'name': 'DISPLAY_NAME', 'check': 'String' },
            {
                'type': 'field_dropdown',
                'name': 'SLOT',
                'options': [
                    ['sidebar',      'SIDEBAR'],
                    ['player list',  'PLAYER_LIST'],
                    ['below name',   'BELOW_NAME'],
                    ['no display',   'NONE']
                ]
            }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Create a new scoreboard objective if it does not exist, then set its display slot.',
        'helpUrl': ''
    },
    {
        'type': 'scoreboard_remove_objective',
        'message0': 'remove objective %1',
        'args0': [{ 'type': 'input_value', 'name': 'NAME', 'check': 'String' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Unregister and remove a scoreboard objective.',
        'helpUrl': ''
    },
    {
        'type': 'scoreboard_show_player',
        'message0': 'show scoreboard to %1',
        'args0': [{ 'type': 'input_value', 'name': 'PLAYER', 'check': 'Player' }],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Apply the main server scoreboard to a player so they see it.',
        'helpUrl': ''
    },
    {
        'type': 'scoreboard_set_display_name',
        'message0': 'set display name of objective %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'NAME', 'check': 'String' },
            { 'type': 'input_value', 'name': 'DISPLAY_NAME', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null, 'nextStatement': null,
        'colour': 260,
        'tooltip': 'Change the visible title of a scoreboard objective.',
        'helpUrl': ''
    },
]);
