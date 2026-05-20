'use strict';

goog.module('Blockly.Java.player');

const Java = goog.require('Blockly.Java');

Java['player_get_by_name'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '"Name"';
    return ['Bukkit.getPlayer((String) ' + name + ')', Java.ORDER_FUNCTION_CALL];
};

Java['player_get_by_uuid'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_UUID'] = 'import java.util.UUID;';
    const uuid = Java.valueToCode(block, 'UUID', Java.ORDER_NONE) || '"fa90ba90-9446-4141-83c5-6b31487112c3"';
    return ['Bukkit.getPlayer(UUID.fromString((String) ' + uuid + '))', Java.ORDER_FUNCTION_CALL];
};

Java['player_get_string'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'NAME';
    switch (option) {
        case 'NAME':
            return ['((Player) ' + player + ').getName()', Java.ORDER_FUNCTION_CALL];
        case 'DISPLAY_NAME':
            return ['((Player) ' + player + ').getDisplayName()', Java.ORDER_FUNCTION_CALL];
        case 'UUID':
            return ['((Player) ' + player + ').getUniqueId().toString()', Java.ORDER_FUNCTION_CALL];
        case 'IP':
            return ['((Player) ' + player + ').getAddress().getAddress().getHostAddress()', Java.ORDER_FUNCTION_CALL];
        case 'GAME_MODE':
            return ['((Player) ' + player + ').getGameMode().name()', Java.ORDER_FUNCTION_CALL];
        case 'WORLD_NAME':
            return ['((Player) ' + player + ').getWorld().getName()', Java.ORDER_FUNCTION_CALL];
        case 'BIOME':
            return ['((Player) ' + player + ').getLocation().getBlock().getBiome().name()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_number'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'HEALTH';
    switch (option) {
        case 'HEALTH':
            return ['((Player) ' + player + ').getHealth()', Java.ORDER_FUNCTION_CALL];
        case 'MAX_HEALTH':
            Java.definitions_['import_Attribute'] = 'import org.bukkit.attribute.Attribute;';
            return ['((Player) ' + player + ').getAttribute(Attribute.GENERIC_MAX_HEALTH).getValue()', Java.ORDER_FUNCTION_CALL];
        case 'FOOD':
        case 'HUNGER':
            return ['((Player) ' + player + ').getFoodLevel()', Java.ORDER_FUNCTION_CALL];
        case 'AIR':
            return ['((Player) ' + player + ').getRemainingAir()', Java.ORDER_FUNCTION_CALL];
        case 'EXP':
            return ['((Player) ' + player + ').getExp()', Java.ORDER_FUNCTION_CALL];
        case 'EXP_LEVEL':
            return ['((Player) ' + player + ').getLevel()', Java.ORDER_FUNCTION_CALL];
        case 'TOTAL_EXP':
            return ['((Player) ' + player + ').getTotalExperience()', Java.ORDER_FUNCTION_CALL];
        case 'FIRST_EMPTY_SLOT':
            return ['((Player) ' + player + ').getInventory().firstEmpty()', Java.ORDER_FUNCTION_CALL];
        case 'X_LOCATION':
            return ['((Player) ' + player + ').getLocation().getX()', Java.ORDER_FUNCTION_CALL];
        case 'Y_LOCATION':
            return ['((Player) ' + player + ').getLocation().getY()', Java.ORDER_FUNCTION_CALL];
        case 'Z_LOCATION':
            return ['((Player) ' + player + ').getLocation().getZ()', Java.ORDER_FUNCTION_CALL];
        case 'YAW':
            return ['((Player) ' + player + ').getLocation().getYaw()', Java.ORDER_FUNCTION_CALL];
        case 'PITCH':
            return ['((Player) ' + player + ').getLocation().getPitch()', Java.ORDER_FUNCTION_CALL];
        case 'FIRE_TICKS':
            return ['((Player) ' + player + ').getFireTicks()', Java.ORDER_FUNCTION_CALL];
        case 'PING':
            return ['((Player) ' + player + ').getPing()', Java.ORDER_FUNCTION_CALL];
        case 'WORLD_TIME':
        case 'TIME':
            return ['((Player) ' + player + ').getWorld().getTime()', Java.ORDER_FUNCTION_CALL];
        case 'ONLINE_COUNT':
        case 'ONLINE':
            return ['((Player) ' + player + ').getServer().getOnlinePlayers().size()', Java.ORDER_FUNCTION_CALL];
        case 'TPS':
            return ['((Player) ' + player + ').getServer().getTPS()[0]', Java.ORDER_FUNCTION_CALL];
        case 'MONEY':
            Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
            return ['MainPluginName.getInstance().getServer().getServicesManager().getRegistration(net.milkbowl.vault.economy.Economy.class).getProvider().getBalance((Player) ' + player + ')', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_boolean'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'OP';
    switch (option) {
        case 'OP':
            return ['((Player) ' + player + ').isOp()', Java.ORDER_FUNCTION_CALL];
        case 'FLYING':
            return ['((Player) ' + player + ').isFlying()', Java.ORDER_FUNCTION_CALL];
        case 'SPRINTING':
            return ['((Player) ' + player + ').isSprinting()', Java.ORDER_FUNCTION_CALL];
        case 'BURNING':
            return ['(((Player) ' + player + ').getFireTicks() > 0)', Java.ORDER_FUNCTION_CALL];
        case 'SNEAKING':
            return ['((Player) ' + player + ').isSneaking()', Java.ORDER_FUNCTION_CALL];
        case 'ONLINE':
            return ['((Player) ' + player + ').isOnline()', Java.ORDER_FUNCTION_CALL];
        case 'IN_WATER':
            return ['((Player) ' + player + ').isInWater()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_location'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return ['((Player) ' + player + ').getLocation()', Java.ORDER_FUNCTION_CALL];
};

Java['player_get_item'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'MAIN_HAND';
    switch (option) {
        case 'MAIN_HAND':
        case 'ITEM':
            return ['((Player) ' + player + ').getInventory().getItemInMainHand()', Java.ORDER_FUNCTION_CALL];
        case 'OFF_HAND':
            return ['((Player) ' + player + ').getInventory().getItemInOffHand()', Java.ORDER_FUNCTION_CALL];
        case 'HELMET':
            return ['((Player) ' + player + ').getInventory().getHelmet()', Java.ORDER_FUNCTION_CALL];
        case 'CHESTPLATE':
            return ['((Player) ' + player + ').getInventory().getChestplate()', Java.ORDER_FUNCTION_CALL];
        case 'LEGGINGS':
            return ['((Player) ' + player + ').getInventory().getLeggings()', Java.ORDER_FUNCTION_CALL];
        case 'BOOTS':
            return ['((Player) ' + player + ').getInventory().getBoots()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_has_permission'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const permission = Java.valueToCode(block, 'PERMISSION', Java.ORDER_NONE) || '"my.permission"';
    return ['((Player) ' + player + ').hasPermission((String) ' + permission + ')', Java.ORDER_FUNCTION_CALL];
};

Java['player_get_any'] = function (block) {
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    const key = Java.valueToCode(block, 'KEY', Java.ORDER_NONE) || '"key"';
    return ['MainPluginName.getDB().getData().get(' + key + ')', Java.ORDER_FUNCTION_CALL];
};

Java['player_get_online_players'] = function () {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    return ['Bukkit.getOnlinePlayers()', Java.ORDER_FUNCTION_CALL];
};
