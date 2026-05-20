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

    // ─── Item: Enchantment ──────────────────────────────────────────────────────
    {
        'type': 'item_enchant',
        'message0': 'enchant %1 with %2 level %3',
        'args0': [
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' },
            { 'type': 'input_value', 'name': 'ENCHANT', 'check': 'String' },
            { 'type': 'input_value', 'name': 'LEVEL', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Apply an enchantment by name (e.g. "DAMAGE_ALL") at the given level.',
        'helpUrl': ''
    },
    {
        'type': 'item_set_amount',
        'message0': 'set amount of %1 to %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' },
            { 'type': 'input_value', 'name': 'AMOUNT', 'check': 'Number' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Set the stack size of an ItemStack.',
        'helpUrl': ''
    },
    {
        'type': 'item_get_display_name',
        'message0': 'display name of %1',
        'args0': [{ 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' }],
        'inputsInline': true,
        'output': 'String',
        'colour': 345,
        'tooltip': "Get the item's custom display name (empty string if none).",
        'helpUrl': ''
    },

    // ─── Inventory blocks ───────────────────────────────────────────────────────
    {
        'type': 'inventory_get_item',
        'message0': 'item at slot %1 of %2',
        'args0': [
            { 'type': 'input_value', 'name': 'SLOT', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }
        ],
        'inputsInline': true,
        'output': 'ItemStack',
        'colour': 345,
        'tooltip': 'Get the ItemStack in the given slot of an inventory.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_get_size',
        'message0': 'size of %1',
        'args0': [{ 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }],
        'inputsInline': true,
        'output': 'Number',
        'colour': 345,
        'tooltip': 'Get the total number of slots in an inventory.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_first_empty',
        'message0': 'first empty slot of %1',
        'args0': [{ 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }],
        'inputsInline': true,
        'output': 'Number',
        'colour': 345,
        'tooltip': 'Get the index of the first empty slot, or -1 if full.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_contains',
        'message0': '%1 contains %2',
        'args0': [
            { 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' },
            { 'type': 'input_value', 'name': 'MATERIAL', 'check': 'String' }
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'colour': 345,
        'tooltip': 'Returns true if the inventory contains at least one item of the given material name.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_get_type',
        'message0': 'type of inventory %1',
        'args0': [{ 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }],
        'inputsInline': true,
        'output': 'String',
        'colour': 345,
        'tooltip': 'Get the inventory type as a string (e.g. "CHEST", "PLAYER", "CRAFTING").',
        'helpUrl': ''
    },
    {
        'type': 'inventory_set_item',
        'message0': 'set slot %1 of %2 to %3',
        'args0': [
            { 'type': 'input_value', 'name': 'SLOT', 'check': 'Number' },
            { 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' },
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Place an item into a specific slot of an inventory.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_add_item',
        'message0': 'add %1 to inventory %2',
        'args0': [
            { 'type': 'input_value', 'name': 'ITEM', 'check': 'ItemStack' },
            { 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Add an item to an inventory, filling available slots.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_remove_type',
        'message0': 'remove all %1 from inventory %2',
        'args0': [
            { 'type': 'input_value', 'name': 'MATERIAL', 'check': 'String' },
            { 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }
        ],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Remove all items of the given material from an inventory.',
        'helpUrl': ''
    },
    {
        'type': 'inventory_clear',
        'message0': 'clear inventory %1',
        'args0': [{ 'type': 'input_value', 'name': 'INVENTORY', 'check': 'Inventory' }],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'colour': 345,
        'tooltip': 'Remove all items from an inventory.',
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
