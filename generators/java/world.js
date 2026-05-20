'use strict';

goog.module('Blockly.Java.world');

const Java = goog.require('Blockly.Java');

Java['world_get'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '"world"';
    return ['Bukkit.getWorld((String) ' + name + ')', Java.ORDER_FUNCTION_CALL];
};

Java['world_get_block_at'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return ['((World) ' + world + ').getBlockAt((Location) ' + location + ')', Java.ORDER_FUNCTION_CALL];
};

Java['world_spawn_entity'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    Java.definitions_['import_EntityType'] = 'import org.bukkit.entity.EntityType;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    const entityType = Java.valueToCode(block, 'ENTITY_TYPE', Java.ORDER_NONE) || '"ZOMBIE"';
    return '((World) ' + world + ').spawnEntity((Location) ' + location + ', EntityType.valueOf((String) ' + entityType + '));\n';
};

Java['world_get_time'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    return ['((World) ' + world + ').getTime()', Java.ORDER_FUNCTION_CALL];
};

Java['world_set_time'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    const time = Java.getAdjustedInt(block, 'TIME');
    return '((World) ' + world + ').setTime(' + time + ');\n';
};

Java['world_get_weather'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    return ['((World) ' + world + ').hasStorm()', Java.ORDER_FUNCTION_CALL];
};

Java['world_set_weather'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    const storm = Java.valueToCode(block, 'STORM', Java.ORDER_NONE) || 'true';
    return '((World) ' + world + ').setStorm((boolean) ' + storm + ');\n';
};

Java['world_get_players'] = function (block) {
    Java.definitions_['import_World'] = 'import org.bukkit.World;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE);
    return ['((World) ' + world + ').getPlayers()', Java.ORDER_FUNCTION_CALL];
};
