'use strict';

goog.module('Blockly.Java.event');

const Java = goog.require('Blockly.Java');

Java['event_get'] = function (block) {
    // 이벤트 변수 가져오기
    return [block.getFieldValue('OPTION').split(',')[1], Java.ORDER_FUNCTION_CALL];
};

Java['event_cancel'] = function () {
    // 이벤트 취소
    return 'event.setCancelled(true);';
}

Java['event_server_state_change'] = function (block) {
    // 마인크래프트 플러그인 시작/종료 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    let state = block.getFieldValue('STATE');
    switch (state) {
        case 'LOAD':
            state = 'ServerLoad';
            break;
        case 'UNLOAD':
            state = 'PluginDisable';
            break;
    }
    Java.definitions_['import_' + state] = 'import org.bukkit.event.server.' + state + 'Event;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void on' + state + '(' + state + 'Event event) {\n' +
        '    ' + branch + '\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%on' + state] = code;
    return null;
}

Java['event_player_interact'] = function (block) {
    // 마인크래프트 플레이어 상호작용 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerInteractEvent'] = 'import org.bukkit.event.player.PlayerInteractEvent;';
    const action = 'Action.' + block.getFieldValue('ACTION');
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerInteract(PlayerInteractEvent event) {\n' +
        '    if (event.getAction() == ' + action + ') {\n' +
        '        ' + branch + '\n' +
        '    }\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerInteract'] = code;
    return null;
};

Java['event_player_walk'] = function (block) {
    // 마인크래프트 플레이어 이동 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerMoveEvent'] = 'import org.bukkit.event.player.PlayerMoveEvent;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onPlayerMove(PlayerMoveEvent event) {\n' +
        '    ' + branch + '\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onPlayerMove'] = code;
    return null;
};

Java['event_inventory'] = function (block) {
    // 마인크래프트 인벤토리 상호작용 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    let action = block.getFieldValue('ACTION');
    switch (action) {
        case 'OPEN':
            action = 'Open';
            break;
        case 'CLICK':
            action = 'Click';
            break;
        case 'CLOSE':
            action = 'Close';
            break;
    }
    Java.definitions_['import_Inventory' + action + 'Event'] = 'import org.bukkit.event.inventory.Inventory' + action + 'Event;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void onInventory' + action + '(Inventory' + action + 'Event event) {\n' +
        '    ' + branch + '\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onInventory' + action] = code;
    return null;
};