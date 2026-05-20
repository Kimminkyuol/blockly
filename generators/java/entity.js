'use strict';

goog.module('Blockly.Java.entity');

const Java = goog.require('Blockly.Java');

// ─── Value: Entity info ────────────────────────────────────────────────────────

Java['entity_get_type'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((Entity) ' + entity + ').getType().name()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_get_name'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((Entity) ' + entity + ').getName()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_get_health'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((LivingEntity) ' + entity + ').getHealth()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_get_max_health'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    Java.definitions_['import_Attribute'] = 'import org.bukkit.attribute.Attribute;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((LivingEntity) ' + entity + ').getAttribute(Attribute.GENERIC_MAX_HEALTH).getValue()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_get_location'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((Entity) ' + entity + ').getLocation()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_get_world'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((Entity) ' + entity + ').getWorld()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_is_valid'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((Entity) ' + entity + ').isValid()', Java.ORDER_FUNCTION_CALL];
};

Java['entity_is_type'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const type = Java.valueToCode(block, 'TYPE', Java.ORDER_NONE) || '"ZOMBIE"';
    return ['((Entity) ' + entity + ').getType().name().equals((String) ' + type + ')', Java.ORDER_FUNCTION_CALL];
};

Java['entity_as_player'] = function (block) {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return ['((Player) ' + entity + ')', Java.ORDER_FUNCTION_CALL];
};

Java['entity_get_nearby'] = function (block) {
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const radius = Java.valueToCode(block, 'RADIUS', Java.ORDER_NONE) || '5';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return [
        '((Location) ' + location + ').getWorld().getNearbyEntities((Location) ' + location + ', (double) ' + radius + ', (double) ' + radius + ', (double) ' + radius + ')',
        Java.ORDER_FUNCTION_CALL
    ];
};

Java['entity_spawn_at'] = function (block) {
    Java.definitions_['import_EntityType'] = 'import org.bukkit.entity.EntityType;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const type = Java.valueToCode(block, 'TYPE', Java.ORDER_NONE) || '"ZOMBIE"';
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return [
        '((Location) ' + location + ').getWorld().spawnEntity((Location) ' + location + ', EntityType.valueOf((String) ' + type + '))',
        Java.ORDER_FUNCTION_CALL
    ];
};

// ─── Statement: Entity actions ─────────────────────────────────────────────────

Java['entity_set_health'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const health = Java.getAdjustedDouble(block, 'HEALTH');
    return '((LivingEntity) ' + entity + ').setHealth(' + health + ');\n';
};

Java['entity_set_max_health'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    Java.definitions_['import_Attribute'] = 'import org.bukkit.attribute.Attribute;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const health = Java.getAdjustedDouble(block, 'HEALTH');
    return '((LivingEntity) ' + entity + ').getAttribute(Attribute.GENERIC_MAX_HEALTH).setBaseValue(' + health + ');\n';
};

Java['entity_set_name'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '""';
    return (
        '((Entity) ' + entity + ').setCustomName((String) ' + name + ');\n' +
        '((Entity) ' + entity + ').setCustomNameVisible(true);\n'
    );
};

Java['entity_remove'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    return '((Entity) ' + entity + ').remove();\n';
};

Java['entity_damage'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const damage = Java.getAdjustedDouble(block, 'DAMAGE');
    return '((LivingEntity) ' + entity + ').damage(' + damage + ');\n';
};

Java['entity_damage_by_player'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const damage = Java.getAdjustedDouble(block, 'DAMAGE');
    return '((LivingEntity) ' + entity + ').damage(' + damage + ', (Entity) ' + player + ');\n';
};

Java['entity_teleport'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    Java.definitions_['import_Location'] = 'import org.bukkit.Location;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const location = Java.valueToCode(block, 'LOCATION', Java.ORDER_NONE);
    return '((Entity) ' + entity + ').teleport((Location) ' + location + ');\n';
};

Java['entity_set_fire'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const ticks = Java.getAdjustedInt(block, 'TICKS');
    return '((Entity) ' + entity + ').setFireTicks(' + ticks + ');\n';
};

Java['entity_set_glowing'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const glow = Java.valueToCode(block, 'GLOW', Java.ORDER_NONE) || 'true';
    return '((Entity) ' + entity + ').setGlowing((boolean) ' + glow + ');\n';
};

Java['entity_set_gravity'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const gravity = Java.valueToCode(block, 'GRAVITY', Java.ORDER_NONE) || 'true';
    return '((Entity) ' + entity + ').setGravity((boolean) ' + gravity + ');\n';
};

Java['entity_set_velocity'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    Java.definitions_['import_Vector'] = 'import org.bukkit.util.Vector;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const x = Java.getAdjustedDouble(block, 'X');
    const y = Java.getAdjustedDouble(block, 'Y');
    const z = Java.getAdjustedDouble(block, 'Z');
    return '((Entity) ' + entity + ').setVelocity(new Vector(' + x + ', ' + y + ', ' + z + '));\n';
};

Java['entity_add_potion'] = function (block) {
    Java.definitions_['import_LivingEntity'] = 'import org.bukkit.entity.LivingEntity;';
    Java.definitions_['import_PotionEffect'] = 'import org.bukkit.potion.PotionEffect;';
    Java.definitions_['import_PotionEffectType'] = 'import org.bukkit.potion.PotionEffectType;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const potion = Java.valueToCode(block, 'POTION', Java.ORDER_NONE) || '"SPEED"';
    const tier = Java.getAdjustedInt(block, 'TIER');
    const time = Java.getAdjustedInt(block, 'TIME');
    return '((LivingEntity) ' + entity + ').addPotionEffect(new PotionEffect(PotionEffectType.getByName((String) ' + potion + '), ' + time + ', ' + tier + '));\n';
};

Java['entity_set_silent'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const silent = Java.valueToCode(block, 'SILENT', Java.ORDER_NONE) || 'true';
    return '((Entity) ' + entity + ').setSilent((boolean) ' + silent + ');\n';
};

Java['entity_set_invulnerable'] = function (block) {
    Java.definitions_['import_Entity'] = 'import org.bukkit.entity.Entity;';
    const entity = Java.valueToCode(block, 'ENTITY', Java.ORDER_NONE);
    const inv = Java.valueToCode(block, 'INVULNERABLE', Java.ORDER_NONE) || 'true';
    return '((Entity) ' + entity + ').setInvulnerable((boolean) ' + inv + ');\n';
};
