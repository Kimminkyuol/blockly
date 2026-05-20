'use strict';

goog.module('Blockly.blocks.item');

const {defineBlocksWithJsonArray} = goog.require('Blockly.common');

defineBlocksWithJsonArray([
    // ─── Constructors ───────────────────────────────────────────────────────────
    {
        'type': 'item_create',
        'message0': 'item %1',
        'args0': [{ 'type': 'input_value', 'name': 'MATERIAL', 'check': 'String' }],
        'inputsInline': true,
        'output': 'ItemStack',
        'colour': 345,
        'tooltip': 'Create an ItemStack with 1 of the given material.',
        'helpUrl': ''
    },
    {
        'type': 'item_create_with_amount',
        'message0': 'item %1 amount %2',
        'args0': [
            { 'type': 'input_value', 'name': 'MATERIAL', 'check': 'String' },
            { 'type': 'input_value', 'name': 'AMOUNT', 'check': 'Number' }
        ],
        'inputsInline': true,
        'output': 'ItemStack',
        'colour': 345,
        'tooltip': 'Create an ItemStack with the given material and amount.',
        'helpUrl': ''
    },

    // ─── Getters ────────────────────────────────────────────────────────────────
    {
        'type': 'item_get_type',
        'message0': 'get type of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' }],
        'inputsInline': true,
        'output': 'String',
        'colour': 345,
        'tooltip': "Returns the material name of the item (e.g. \"STONE\").",
        'helpUrl': ''
    },
    {
        'type': 'item_get_amount',
        'message0': 'get amount of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' }],
        'inputsInline': true,
        'output': 'Number',
        'colour': 345,
        'tooltip': 'Returns the stack size of the item.',
        'helpUrl': ''
    },
    {
        'type': 'item_is_air',
        'message0': 'is %1 air or null',
        'args0': [{ 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' }],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 345,
        'tooltip': 'Returns true if the item is null or of type AIR.',
        'helpUrl': ''
    },

    // ─── Setters (statement) ────────────────────────────────────────────────────
    {
        'type': 'item_set_display_name',
        'message0': 'set display name of %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' },
            { 'type': 'input_value', 'name': 'NAME', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': "Sets the item's display name (supports color codes with §).",
        'helpUrl': ''
    },
    {
        'type': 'item_set_lore',
        'message0': 'set lore of %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' },
            { 'type': 'input_value', 'name': 'LORE', 'check': 'String' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Sets the lore of the item. Use \\n to separate lines.',
        'helpUrl': ''
    },
]);
