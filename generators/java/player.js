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
    const player = Java.valueToCode(block, 'Player', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'NAME';
    switch (option) {
        case 'NAME':
            return ['((Player) ' + player + ').getName()', Java.ORDER_FUNCTION_CALL];
        case 'UUID':
            return ['((Player) ' + player + ').getUniqueId().toString()', Java.ORDER_FUNCTION_CALL];
        case 'IP':
            return ['((Player) ' + player + ').getAddress().toString()', Java.ORDER_FUNCTION_CALL];
        case 'GAME_MODE':
            return ['((Player) ' + player + ').getGameMode().toString()', Java.ORDER_FUNCTION_CALL];
        case 'BIOME':
            return ['((Player) ' + player + ').getLocation().getBlock().getBiome()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_number'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'Player', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'HEALTH';
    switch (option) {
        case 'HEALTH':
            return ['((Player) ' + player + ').getHealth()', Java.ORDER_FUNCTION_CALL];
        case 'MAX_HEALTH':
            Java.definitions_['import_Attribute'] = 'import org.bukkit.attribute.Attribute;';
            return ['((Player) ' + player + ').getAttribute(Attribute.GENERIC_MAX_HEALTH)', Java.ORDER_FUNCTION_CALL];
        case 'HUNGER':
            return ['((Player) ' + player + ').getFoodLevel()', Java.ORDER_FUNCTION_CALL];
        case 'AIR':
            return ['((Player) ' + player + ').getRemainingAir()', Java.ORDER_FUNCTION_CALL];
        case 'EXP':
            return ['((Player) ' + player + ').getExp()', Java.ORDER_FUNCTION_CALL];
        case 'EXP_LEVEL':
            return ['((Player) ' + player + ').getLevel()', Java.ORDER_FUNCTION_CALL];
        case 'FIRST_EMPTY_SLOT':
            return ['((Player) ' + player + ').getInventory().firstEmpty()', Java.ORDER_FUNCTION_CALL];
        case 'X_LOCATION':
            return ['((Player) ' + player + ').getLocation().getX()', Java.ORDER_FUNCTION_CALL];
        case 'Y_LOCATION':
            return ['((Player) ' + player + ').getLocation().getY()', Java.ORDER_FUNCTION_CALL];
        case 'Z_LOCATION':
            return ['((Player) ' + player + ').getLocation().getZ()', Java.ORDER_FUNCTION_CALL];
        case 'TIME':
            return ['((Player) ' + player + ').getWorld().getTime()', Java.ORDER_FUNCTION_CALL];
        case 'ONLINE':
            return ['((Player) ' + player + ').getServer().getOnlinePlayers()', Java.ORDER_FUNCTION_CALL];
        case 'TPS':
            return ['((Player) ' + player + ').getServer().getTPS()', Java.ORDER_FUNCTION_CALL];
        case 'MONEY':
            return ['MainPluginName.getInstance().getServer().getServicesManager().getRegistration(net.milkbowl.vault.economy.Economy.class).getProvider().getBalance((Player) ' + player + '));', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_boolean'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'Player', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'HEALTH';
    switch (option) {
        case 'OP':
            return ['((Player) ' + player + ').isOp()', Java.ORDER_FUNCTION_CALL];
        case 'FLYING':
            return ['((Player) ' + player + ').isFlying()', Java.ORDER_FUNCTION_CALL];
        case 'SPRINTING':
            return ['((Player) ' + player + ').isSprinting()', Java.ORDER_FUNCTION_CALL];
        case 'BURNING':
            return ['((Player) ' + player + ').getFireTicks()', Java.ORDER_FUNCTION_CALL];
        case 'SNEAKING':
            return ['((Player) ' + player + ').isSneaking()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_location'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'Player', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'LOCATION';
    switch (option) {
        case 'LOCATION':
            return ['((Player) ' + player + ').getLocation()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_item'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'Player', Java.ORDER_NONE);
    const option = block.getFieldValue('OPTION') || 'ITEM';
    switch (option) {
        case 'ITEM':
            return ['((Player) ' + player + ').getInventory().getItemInMainHand()', Java.ORDER_FUNCTION_CALL];
        default:
            throw Error('Unknown option: ' + option);
    }
};

Java['player_get_any'] = function (block) {
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    const key = Java.valueToCode(block, 'KEY', Java.ORDER_NONE) || '"key"';
    return ['MainPluginName.getDB().getData().get(' + key + ')', Java.ORDER_FUNCTION_CALL];
};