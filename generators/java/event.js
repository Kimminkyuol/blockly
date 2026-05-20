'use strict';

goog.module('Blockly.Java.event');

const Java = goog.require('Blockly.Java');

Java['event_get'] = function (block) {
    return [block.getFieldValue('OPTION').split(',')[1], Java.ORDER_FUNCTION_CALL];
};

Java['event_cancel'] = function () {
    return 'event.setCancelled(true);\n';
};

Java['event_set_message'] = function (block) {
    const type = block.getFieldValue('TYPE');
    const message = Java.valueToCode(block, 'MESSAGE', Java.ORDER_NONE) || '""';
    switch (type) {
        case 'JOIN':
            return 'event.setJoinMessage((String) ' + message + ');\n';
        case 'QUIT':
            return 'event.setQuitMessage((String) ' + message + ');\n';
        case 'DEATH':
            return 'event.setDeathMessage((String) ' + message + ');\n';
        case 'CHAT':
            return 'event.setMessage((String) ' + message + ');\n';
        default:
            return '';
    }
};

Java['event_set_damage'] = function (block) {
    const damage = Java.valueToCode(block, 'DAMAGE', Java.ORDER_NONE) || '0';
    return 'event.setDamage((double) ' + damage + ');\n';
};

// ─── Server events ─────────────────────────────────────────────────────────────

Java['event_server_state_change'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    const state = block.getFieldValue('STATE');
    let eventClass, methodName;
    if (state === 'ENABLE') {
        eventClass = 'PluginEnableEvent';
        methodName = 'onPluginEnable';
        Java.definitions_['import_PluginEnableEvent'] = 'import org.bukkit.event.server.PluginEnableEvent;';
    } else {
        eventClass = 'PluginDisableEvent';
        methodName = 'onPluginDisable';
        Java.definitions_['import_PluginDisableEvent'] = 'import org.bukkit.event.server.PluginDisableEvent;';
    }
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + methodName + '(' + eventClass + ' event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%' + methodName] = code;
    return null;
};

// ─── Player events ─────────────────────────────────────────────────────────────

Java['event_player_interact'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerInteractEvent'] = 'import org.bukkit.event.player.PlayerInteractEvent;';
    Java.definitions_['import_Action'] = 'import org.bukkit.event.block.Action;';
    const action = 'Action.' + block.getFieldValue('ACTION');
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerInteract(PlayerInteractEvent event) {\n' +
        '    if (event.getAction() == ' + action + ') {\n' +
        branch + '    }\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerInteract'] = code;
    return null;
};

Java['event_player_join'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerJoinEvent'] = 'import org.bukkit.event.player.PlayerJoinEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerJoin(PlayerJoinEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerJoin'] = code;
    return null;
};

Java['event_player_quit'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerQuitEvent'] = 'import org.bukkit.event.player.PlayerQuitEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerQuit(PlayerQuitEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerQuit'] = code;
    return null;
};

Java['event_player_walk'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerMoveEvent'] = 'import org.bukkit.event.player.PlayerMoveEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerMove(PlayerMoveEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerMove'] = code;
    return null;
};

Java['event_player_death'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerDeathEvent'] = 'import org.bukkit.event.entity.PlayerDeathEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerDeath(PlayerDeathEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerDeath'] = code;
    return null;
};

Java['event_player_respawn'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerRespawnEvent'] = 'import org.bukkit.event.player.PlayerRespawnEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerRespawn(PlayerRespawnEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerRespawn'] = code;
    return null;
};

Java['event_chat'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_AsyncPlayerChatEvent'] = 'import org.bukkit.event.player.AsyncPlayerChatEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerChat(AsyncPlayerChatEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerChat'] = code;
    return null;
};

// ─── Block events ─────────────────────────────────────────────────────────────

Java['event_block_break'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_BlockBreakEvent'] = 'import org.bukkit.event.block.BlockBreakEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onBlockBreak(BlockBreakEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onBlockBreak'] = code;
    return null;
};

Java['event_block_place'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_BlockPlaceEvent'] = 'import org.bukkit.event.block.BlockPlaceEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onBlockPlace(BlockPlaceEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onBlockPlace'] = code;
    return null;
};

// ─── Entity / damage events ───────────────────────────────────────────────────

Java['event_entity_damage'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_EntityDamageEvent'] = 'import org.bukkit.event.entity.EntityDamageEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onEntityDamage(EntityDamageEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onEntityDamage'] = code;
    return null;
};

Java['event_entity_damage_by_entity'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_EntityDamageByEntityEvent'] = 'import org.bukkit.event.entity.EntityDamageByEntityEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onEntityDamageByEntity(EntityDamageByEntityEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onEntityDamageByEntity'] = code;
    return null;
};

// ─── Additional entity events ─────────────────────────────────────────────────

Java['event_entity_spawn'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_EntitySpawnEvent'] = 'import org.bukkit.event.entity.EntitySpawnEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onEntitySpawn(EntitySpawnEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onEntitySpawn'] = code;
    return null;
};

Java['event_entity_death'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_EntityDeathEvent'] = 'import org.bukkit.event.entity.EntityDeathEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onEntityDeath(EntityDeathEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onEntityDeath'] = code;
    return null;
};

Java['event_entity_explode'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_EntityExplodeEvent'] = 'import org.bukkit.event.entity.EntityExplodeEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onEntityExplode(EntityExplodeEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onEntityExplode'] = code;
    return null;
};

Java['event_projectile_hit'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_ProjectileHitEvent'] = 'import org.bukkit.event.entity.ProjectileHitEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onProjectileHit(ProjectileHitEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onProjectileHit'] = code;
    return null;
};

// ─── Additional player events ─────────────────────────────────────────────────

Java['event_player_drop_item'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerDropItemEvent'] = 'import org.bukkit.event.player.PlayerDropItemEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerDropItem(PlayerDropItemEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerDropItem'] = code;
    return null;
};

Java['event_player_pickup_item'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_EntityPickupItemEvent'] = 'import org.bukkit.event.entity.EntityPickupItemEvent;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onEntityPickupItem(EntityPickupItemEvent event) {\n' +
        '    if (!(event.getEntity() instanceof Player)) return;\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onEntityPickupItem'] = code;
    return null;
};

Java['event_food_level_change'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_FoodLevelChangeEvent'] = 'import org.bukkit.event.entity.FoodLevelChangeEvent;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onFoodLevelChange(FoodLevelChangeEvent event) {\n' +
        '    if (!(event.getEntity() instanceof Player)) return;\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onFoodLevelChange'] = code;
    return null;
};

Java['event_player_level_change'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerLevelChangeEvent'] = 'import org.bukkit.event.player.PlayerLevelChangeEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerLevelChange(PlayerLevelChangeEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerLevelChange'] = code;
    return null;
};

Java['event_player_sneak'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerToggleSneakEvent'] = 'import org.bukkit.event.player.PlayerToggleSneakEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerToggleSneak(PlayerToggleSneakEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerToggleSneak'] = code;
    return null;
};

Java['event_player_sprint'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerToggleSprintEvent'] = 'import org.bukkit.event.player.PlayerToggleSprintEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerToggleSprint(PlayerToggleSprintEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerToggleSprint'] = code;
    return null;
};

Java['event_player_teleport'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerTeleportEvent'] = 'import org.bukkit.event.player.PlayerTeleportEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerTeleport(PlayerTeleportEvent event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerTeleport'] = code;
    return null;
};

// ─── Inventory events ─────────────────────────────────────────────────────────

Java['event_inventory'] = function (block) {
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    let action = block.getFieldValue('ACTION');
    let eventClass, methodName;
    switch (action) {
        case 'OPEN':
            eventClass = 'InventoryOpenEvent';
            methodName = 'onInventoryOpen';
            Java.definitions_['import_InventoryOpenEvent'] = 'import org.bukkit.event.inventory.InventoryOpenEvent;';
            break;
        case 'CLICK':
            eventClass = 'InventoryClickEvent';
            methodName = 'onInventoryClick';
            Java.definitions_['import_InventoryClickEvent'] = 'import org.bukkit.event.inventory.InventoryClickEvent;';
            break;
        case 'CLOSE':
            eventClass = 'InventoryCloseEvent';
            methodName = 'onInventoryClose';
            Java.definitions_['import_InventoryCloseEvent'] = 'import org.bukkit.event.inventory.InventoryCloseEvent;';
            break;
        default:
            eventClass = 'InventoryOpenEvent';
            methodName = 'onInventoryOpen';
    }
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + methodName + '(' + eventClass + ' event) {\n' +
        branch + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%' + methodName] = code;
    return null;
};
