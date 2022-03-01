'use strict';

goog.module('Blockly.Java.location');

const Java = goog.require('Blockly.Java');

Java['location'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE) || '"world"';
    const x = Java.getAdjustedDouble(block, 'X');
    const y = Java.getAdjustedDouble(block, 'Y');
    const z = Java.getAdjustedDouble(block, 'Z');
    return ['new Location(Bukkit.getWorld(' + world + '), ' + x + ', ' + y + ', ' + z + ')', Java.ORDER_FUNCTION_CALL];
};