'use strict';

goog.module('Blockly.Java.executor');

const Java = goog.require('Blockly.Java');

Java['executor_action_bar'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '""';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return '((Player) ' + player + ').sendActionBar((String) ' + text + ');\n';
};

Java['executor_broadcast'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '""';
    return 'Bukkit.broadcastMessage((String) ' + text + ');\n';
};

Java['executor_burn'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE) || '""';
    const time = Java.getAdjustedInt(block, 'TIME');
    return '((Player) ' + player + ').setFireTicks(' + time + ');\n';
};

Java['executor_clear_entity'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const radius = Java.getAdjustedDouble(block, 'RADIUS');
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return '((Player) ' + player + ').getNearbyEntities(' + radius + ',' + radius + ',' + radius + ').stream().filter(entity -> entity instanceof Player).forEach(Entity::remove);\n';
};

Java['executor_clear_potion'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return '((Player) ' + player + ').getActivePotionEffects().forEach(effect -> ((Player) ' + player + ').removePotionEffect(effect.getType()));\n';
};

Java['executor_close_gui'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return '((Player) ' + player + ').closeInventory();\n';
};

Java['executor_command'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const command = Java.valueToCode(block, 'COMMAND', Java.ORDER_NONE) || '""';
    return 'Bukkit.getServer().dispatchCommand((Player) ' + player + ', (String) ' + command + ');\n';
};

Java['executor_console_command'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const command = Java.valueToCode(block, 'COMMAND', Java.ORDER_NONE) || '""';
    return 'Bukkit.getServer().dispatchCommand(Bukkit.getServer().getConsoleSender(), (String) ' + command + ');\n';
};

Java['executor_db_put'] = function (block) {
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    const key = Java.valueToCode(block, 'KEY', Java.ORDER_NONE) || '""';
    const value = Java.valueToCode(block, 'VALUE', Java.ORDER_NONE) || '""';
    return 'MainPluginName.getDB().getData().put(' + key + ', ' + value + ');\n';
};

Java['executor_db_save'] = function () {
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    return 'MainPluginName.getDB().save();\n';
};

Java['executor_op_command'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const command = Java.valueToCode(block, 'COMMAND', Java.ORDER_NONE) || '""';
    return 'try { ((Player) ' + player + ').setOp(true); Bukkit.getServer().dispatchCommand((Player) ' + player + ', (String) ' + command + '); } finally { ((Player) ' + player + ').setOp(false); }\n';
};

Java['executor_explosion'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const power = Java.getAdjustedFloat(block, 'POWER');
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    const fire = Java.valueToCode(block, 'FIRE', Java.ORDER_NONE) || 'false';
    return '((Location) ' + location + ').getWorld().createExplosion((Location) ' + location + ', ' + power + ', ' + fire + ');\n';
};

Java['executor_give'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    Java.definitions_['import_ItemStack'] = 'import org.bukkit.inventory.ItemStack;';
    Java.definitions_['import_Material'] = 'import org.bukkit.Material;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const item = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE) || 'new ItemStack(Material.AIR)';
    return '((Player) ' + player + ').getInventory().addItem((ItemStack) ' + item + ');\n';
};

Java['executor_kill'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return '((Player) ' + player + ').setHealth(0);\n';
};

Java['executor_kick'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const due = Java.valueToCode(block, 'DUE', Java.ORDER_NONE) || '""';
    return '((Player) ' + player + ').kickPlayer((String) ' + due + ');\n';
};

Java['executor_lightning'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return '((Location) ' + location + ').getWorld().strikeLightning((Location) ' + location + ');\n';
};

Java['executor_log'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '\"\"';
    return 'Bukkit.getLogger().info((String) ' + text + ');\n';
};

Java['executor_message'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '\"\"';
    return '((Player) ' + player + ').sendMessage((String) ' + text + ');\n';
};

Java['executor_money'] = function (block) {
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const money = Java.getAdjustedDouble(block, 'MONEY');
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return 'MainPluginName.getInstance().getServer().getServicesManager().getRegistration(net.milkbowl.vault.economy.Economy.class).getProvider().depositPlayer((Player) ' + player + ', ' + money + ');\n';
};

Java['executor_permission'] = function (block) {
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const permission = Java.valueToCode(block, 'PERMISSION', Java.ORDER_NONE) || '"my.permission"';
    const option = (block.getFieldValue('OPTION') || 'ADD') === 'ADD' ? 'Add' : 'Remove';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return 'MainPluginName.getInstance().getServer().getServicesManager().getRegistration(net.milkbowl.vault.permission.Permission.class).getProvider().player' + option + '((Player) ' + player + ', (String) ' + permission + ');\n';
};

Java['executor_potion'] = function (block) {
    Java.definitions_['import_PotionEffect'] = 'import org.bukkit.potion.PotionEffect;';
    Java.definitions_['import_PotionEffectType'] = 'import org.bukkit.potion.PotionEffectType;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const potion = (block.getFieldValue(block, 'POTION', Java.ORDER_NONE) || 'SPEED');
    const tier = Java.getAdjustedInt(block, 'TIER');
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const time = Java.getAdjustedInt(block, 'TIME');
    return '((Player) ' + player + ').addPotionEffect(new PotionEffect(PotionEffectType.' + potion + ', ' + time + ', ' + tier + '));\n';
};

Java['executor_set_block'] = function (block) {
    Java.definitions_['import_Material'] = 'import org.bukkit.Material;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    const material = Java.valueToCode(block, 'MATERIAL', Java.ORDER_NONE);
    return '((Location) ' + location + ').getBlock().setType((Material) ' + material + ');\n';
};

Java['executor_set_health'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const health = Java.getAdjustedDouble(block, 'HEALTH');
    return '((Player) ' + player + ').setHealthScale(' + health + ');\n';
};

Java['executor_set_saturation'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const saturation = Java.getAdjustedFloat(block, 'SATURATION');
    return '((Player) ' + player + ').setSaturation(' + saturation + ');\n';
};

Java['executor_set_exp'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const saturation = Java.getAdjustedFloat(block, 'EXP');
    return '((Player) ' + player + ').setExp(' + saturation + ');\n';
};

Java['executor_set_walk_speed'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const walkSpeed = Java.getAdjustedFloat(block, 'SPEED');
    return '((Player) ' + player + ').setWalkSpeed(' + walkSpeed + ');\n';
};

Java['executor_set_fly_speed'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const flySpeed = Java.getAdjustedFloat(block, 'SPEED');
    return '((Player) ' + player + ').setFlySpeed(' + flySpeed + ');\n';
};

Java['executor_set_fly_mode'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const mode = Java.valueToCode(block, 'MODE') || 'true';
    return '((Player) ' + player + ').setFlying(' + mode + ');\n';
};

Java['executor_set_game_mode'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    Java.definitions_['import_GameMode'] = 'import org.bukkit.GameMode;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const mode = Java.valueToCode(block, 'MODE') || 'SURVIVAL';
    return '((Player) ' + player + ').setGameMode(GameMode.' + mode + ');\n';
};

Java['executor_set_max_health'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    Java.definitions_['import_Attribute'] = 'import org.bukkit.attribute.Attribute;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const health = Java.getAdjustedDouble(block, 'HEALTH');
    return '((Player) ' + player + ').getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(' + health + ');\n';
};

Java['executor_exit'] = function () {
    return 'if (true) return;\n';
};

Java['executor_time'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE) || '"world"';
    const time = Java.getAdjustedInt(block, 'TIME');
    return 'Bukkit.getWorld((String) ' + world + ').setTime(' + time + ');\n';
};

Java['executor_teleport'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return '((Player) ' + player + ').teleport((Location) ' + location + ');\n';
};

Java['executor_velocity'] = function (block) {
    Java.definitions_['import_Vector'] = 'import org.bukkit.util.Vector;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const x = Java.getAdjustedDouble(block, 'X');
    const y = Java.getAdjustedDouble(block, 'Y');
    const z = Java.getAdjustedDouble(block, 'Z');
    return '((Player) ' + player + ').setVelocity(new Vector(' + x + ', ' + y + ', ' + z + '));\n';
};

Java['executor_wait'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_MyPluginName'] = 'import MainPluginPath.MainPluginName;';
    const time = Java.getAdjustedInt(block, 'TIME');
    const branch = Java.statementToCode(block, 'DO');
    let code = 'Bukkit.getScheduler().runTaskLater(MainPluginName.getInstance(), () -> {\n' +
        '    ' + branch + '\n' + '}, ' + time + ');\n';
    code = Java.scrub_(block, code);
    return code;
};

Java['executor_weather'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE) || '"world"';
    const storm = Java.valueToCode(block, 'STORM', Java.ORDER_NONE) || 'true';
    return 'Bukkit.getWorld(' + world + ').setStorm(' + storm + ');';
};