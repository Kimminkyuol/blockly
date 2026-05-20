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
    return ['new Location(Bukkit.getWorld((String) ' + world + '), ' + x + ', ' + y + ', ' + z + ')', Java.ORDER_FUNCTION_CALL];
};

Java['location_get_coord'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    const axis = block.getFieldValue('AXIS') || 'X';
    switch (axis) {
        case 'X':
            return ['((Location) ' + location + ').getX()', Java.ORDER_FUNCTION_CALL];
        case 'Y':
            return ['((Location) ' + location + ').getY()', Java.ORDER_FUNCTION_CALL];
        case 'Z':
            return ['((Location) ' + location + ').getZ()', Java.ORDER_FUNCTION_CALL];
        case 'YAW':
            return ['((Location) ' + location + ').getYaw()', Java.ORDER_FUNCTION_CALL];
        case 'PITCH':
            return ['((Location) ' + location + ').getPitch()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown axis: ' + axis);
    }
};

Java['location_get_world'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return ['((Location) ' + location + ').getWorld().getName()', Java.ORDER_FUNCTION_CALL];
};

Java['location_get_block_type'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return ['((Location) ' + location + ').getBlock().getType().name()', Java.ORDER_FUNCTION_CALL];
};

Java['location_add'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    const x = Java.getAdjustedDouble(block, 'X');
    const y = Java.getAdjustedDouble(block, 'Y');
    const z = Java.getAdjustedDouble(block, 'Z');
    return ['((Location) ' + location + ').clone().add(' + x + ', ' + y + ', ' + z + ')', Java.ORDER_FUNCTION_CALL];
};

Java['location_distance'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const locA = Java.valueToCode(block, 'LOC_A', Java.ORDER_NONE);
    const locB = Java.valueToCode(block, 'LOC_B', Java.ORDER_NONE);
    return ['((Location) ' + locA + ').distance((Location) ' + locB + ')', Java.ORDER_FUNCTION_CALL];
};
