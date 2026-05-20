'use strict';

goog.module('Blockly.Java.item');

const Java = goog.require('Blockly.Java');

Java['item_create'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    Java.definitions_['import_Material'] = 'import org.bukkit.Material;';
    const material = Java.valueToCode(block, 'MATERIAL', Java.ORDER_NONE) || '"STONE"';
    return ['new ItemStack(Material.valueOf((String) ' + material + '))', Java.ORDER_FUNCTION_CALL];
};

Java['item_create_with_amount'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    Java.definitions_['import_Material'] = 'import org.bukkit.Material;';
    const material = Java.valueToCode(block, 'MATERIAL', Java.ORDER_NONE) || '"STONE"';
    const amount = Java.getAdjustedInt(block, 'AMOUNT');
    return ['new ItemStack(Material.valueOf((String) ' + material + '), ' + amount + ')', Java.ORDER_FUNCTION_CALL];
};

Java['item_get_type'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    return ['((ItemStack) ' + item + ').getType().name()', Java.ORDER_FUNCTION_CALL];
};

Java['item_get_amount'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    return ['((ItemStack) ' + item + ').getAmount()', Java.ORDER_FUNCTION_CALL];
};

Java['item_set_display_name'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    Java.definitions_['import_ItemMeta'] = 'import org.bukkit.inventory.meta.ItemMeta;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '""';
    return (
        'ItemMeta meta_' + block.id + ' = ((ItemStack) ' + item + ').getItemMeta();\n' +
        'meta_' + block.id + '.setDisplayName((String) ' + name + ');\n' +
        '((ItemStack) ' + item + ').setItemMeta(meta_' + block.id + ');\n'
    );
};

Java['item_set_lore'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    Java.definitions_['import_ItemMeta'] = 'import org.bukkit.inventory.meta.ItemMeta;';
    Java.definitions_['import_Arrays'] = 'import java.util.Arrays;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    const lore = Java.valueToCode(block, 'LORE', Java.ORDER_NONE) || '""';
    return (
        'ItemMeta loreMeta_' + block.id + ' = ((ItemStack) ' + item + ').getItemMeta();\n' +
        'loreMeta_' + block.id + '.setLore(Arrays.asList(((String) ' + lore + ').split("\\n")));\n' +
        '((ItemStack) ' + item + ').setItemMeta(loreMeta_' + block.id + ');\n'
    );
};

Java['item_is_air'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    return ['(' + item + ' == null || ((ItemStack) ' + item + ').getType().isAir())', Java.ORDER_FUNCTION_CALL];
};

Java['item_enchant'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    Java.definitions_['import_Enchantment'] = 'import org.bukkit.enchantments.Enchantment;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    const enchant = Java.valueToCode(block, 'ENCHANT', Java.ORDER_NONE) || '"DAMAGE_ALL"';
    const level = Java.getAdjustedInt(block, 'LEVEL');
    return '((ItemStack) ' + item + ').addUnsafeEnchantment(Enchantment.getByName((String) ' + enchant + '), ' + level + ');\n';
};

Java['item_set_amount'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    const amount = Java.getAdjustedInt(block, 'AMOUNT');
    return '((ItemStack) ' + item + ').setAmount(' + amount + ');\n';
};

Java['item_get_display_name'] = function (block) {
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE);
    return [
        '(((ItemStack) ' + item + ').hasItemMeta() && ((ItemStack) ' + item + ').getItemMeta().hasDisplayName() ? ((ItemStack) ' + item + ').getItemMeta().getDisplayName() : "")',
        Java.ORDER_FUNCTION_CALL
    ];
};

// ─── Inventory generators ──────────────────────────────────────────────────────

Java['inventory_get_item'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    const slot = Java.getAdjustedInt(block, 'SLOT');
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    return ['((Inventory) ' + inv + ').getItem(' + slot + ')', Java.ORDER_FUNCTION_CALL];
};

Java['inventory_get_size'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    return ['((Inventory) ' + inv + ').getSize()', Java.ORDER_FUNCTION_CALL];
};

Java['inventory_first_empty'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    return ['((Inventory) ' + inv + ').firstEmpty()', Java.ORDER_FUNCTION_CALL];
};

Java['inventory_contains'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    Java.definitions_['import_Material'] = 'import org.bukkit.Material;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    const mat = Java.valueToCode(block, 'MATERIAL', Java.ORDER_NONE) || '"STONE"';
    return ['((Inventory) ' + inv + ').contains(Material.valueOf((String) ' + mat + '))', Java.ORDER_FUNCTION_CALL];
};

Java['inventory_get_type'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    return ['((Inventory) ' + inv + ').getType().name()', Java.ORDER_FUNCTION_CALL];
};

Java['inventory_set_item'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const slot = Java.getAdjustedInt(block, 'SLOT');
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE) || 'null';
    return '((Inventory) ' + inv + ').setItem(' + slot + ', (ItemStack) ' + item + ');\n';
};

Java['inventory_add_item'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE) || 'null';
    return '((Inventory) ' + inv + ').addItem((ItemStack) ' + item + ');\n';
};

Java['inventory_remove_type'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    Java.definitions_['import_Material'] = 'import org.bukkit.Material;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    const mat = Java.valueToCode(block, 'MATERIAL', Java.ORDER_NONE) || '"STONE"';
    return '((Inventory) ' + inv + ').remove(Material.valueOf((String) ' + mat + '));\n';
};

Java['inventory_clear'] = function (block) {
    Java.definitions_['import_Inventory'] = 'import org.bukkit.inventory.Inventory;';
    const inv = Java.valueToCode(block, 'INVENTORY', Java.ORDER_NONE);
    return '((Inventory) ' + inv + ').clear();\n';
};
