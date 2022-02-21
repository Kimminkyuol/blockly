'use strict';

goog.module('Blockly.Java.event');

const Java = goog.require('Blockly.Java');
const {NameType} = goog.require('Blockly.Names');

Java['event_at_time'] = function (block) {
    // 마인크래프트 특정 시간시 발생 이벤트
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PluginEnableEvent'] = 'import org.bukkit.event.server.PluginEnableEvent;';
    const functionName = Java.provideFunction_('parseMinecraftTime', [
        'public static String ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(long time) {',
        '    long hours = time / 1000 + 6;',
        '        long minutes = (time % 1000) * 60 / 1000;',
        '        String ampm = "AM";',
        '        if (hours >= 12) {',
        '            hours -= 12;',
        '            ampm = "PM";',
        '        }',
        '        if (hours >= 12) {',
        '            hours -= 12;',
        '            ampm = "AM";',
        '        }',
        '        if (hours == 0) hours = 12;',
        '        String mm = "0" + minutes;',
        '        mm = mm.substring(mm.length() - 2);',
        '        return hours + ":" + mm + " " + ampm;', '}'
    ]);
    const functionName2 = Java.nameDB_.getName('onServerLoad', NameType.PROCEDURE);
    const hour = Java.getAdjustedInt(block, 'HOUR');
    const minute = Java.getAdjustedInt(block, 'MINUTE');
    const ampm = Java.valueToCode(block, 'AMPM', Java.ORDER_NONE) || 'AM';
    const world = Java.valueToCode(block, 'WORLD', Java.ORDER_NONE) || '';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + functionName2 + '(PluginEnableEvent event) {\n' +
        '    Bukkit.getScheduler().scheduleSyncRepeatingTask(event.getPlugin(), () -> {\n' +
        '        if (' + functionName + '(Bukkit.getServer().getWorld(' + world + ').getTime()).equals("' + hour + ':' + minute + ' ' + ampm + '")) {\n' +
        '            ' + branch + '\n' +
        '        }\n' +
        '    }, 0L, 20L * 60);\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName2] = code;
    return null;
};

Java['event_armor_change'] = function (block) {
    // 마인크래프트 갑옷 변경시 발생 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerArmorChangeEvent'] = 'import com.destroystokyo.paper.event.player.PlayerArmorChangeEvent;';
    const functionName = Java.nameDB_.getName('onArmorChange', NameType.PROCEDURE);
    const eventItem = Java.nameDB_.getName(block.getFieldValue('ITEM'), NameType.VARIABLE);
    const eventPlayer = Java.nameDB_.getName(block.getFieldValue('PLAYER'), NameType.VARIABLE);
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + functionName + '(PlayerArmorChangeEvent event) {\n' +
        '    ' + eventItem + ' = event.getPlayer();\n' +
        '    ' + eventPlayer + ' = event.getNewItem();\n' +
        '    ' + branch + '\n}';
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName] = code;
    return null;
};

Java['event_bed_enter'] = function (block) {
    // 마인크래프트 플레이어 잠자기 시작시 발생 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerBedEnterEvent'] = 'import org.bukkit.event.player.PlayerBedEnterEvent;';
    const functionName = Java.nameDB_.getName('onBedEnter', NameType.PROCEDURE);
    const eventPlayer = Java.nameDB_.getName(block.getFieldValue('PLAYER'), NameType.VARIABLE);
    const eventBlock = Java.nameDB_.getName(block.getFieldValue('BLOCK'), NameType.VARIABLE);
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + functionName + '(PlayerBedEnterEvent event) {\n' +
        '    ' + eventPlayer + ' = event.getPlayer();\n' +
        '    ' + eventBlock + ' = event.getBed();\n' +
        '    ' + branch + '\n}'
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName] = code;
    return null;
};

Java['event_bed_leave'] = function (block) {
    // 마인크래프트 플레이어 침대에서 일어날시 발생 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_PlayerBedLeaveEvent'] = 'import org.bukkit.event.player.PlayerBedLeaveEvent;';
    const functionName = Java.nameDB_.getName('onBedLeave', NameType.PROCEDURE);
    const eventPlayer = Java.nameDB_.getName(block.getFieldValue('PLAYER'), NameType.VARIABLE);
    const eventBlock = Java.nameDB_.getName(block.getFieldValue('BLOCK'), NameType.VARIABLE);
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + functionName + '(PlayerBedLeaveEvent event) {\n' +
        '    ' + eventPlayer + ' = event.getPlayer();\n' +
        '    ' + eventBlock + ' = event.getBed();\n' +
        '    ' + branch + '\n}'
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName] = code;
    return null;
};

Java['event_block_break'] = function (block) {
    // 마인크래프트 블록 파괴 시작시 발생 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_BlockBreakEvent'] = 'import org.bukkit.event.player.BlockBreakEvent;';
    const functionName = Java.nameDB_.getName('onBlockBreak', NameType.PROCEDURE);
    const eventPlayer = Java.nameDB_.getName(block.getFieldValue('PLAYER'), NameType.VARIABLE);
    const eventBlock = Java.nameDB_.getName(block.getFieldValue('BLOCK'), NameType.VARIABLE);
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + functionName + '(BlockBreakEvent event) {\n' +
        '    ' + eventPlayer + ' = event.getPlayer();\n' +
        '    ' + eventBlock + ' = event.getBlock();\n' +
        '    ' + branch + '\n}'
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName] = code;
    return null;
};

Java['event_block_grow'] = function (block) {
    // 마인크래프트 블록 성장시 발생 이벤트
    Java.definitions_['import_EventHandler'] = 'import org.bukkit.event.EventHandler;';
    Java.definitions_['import_BlockGrowEvent'] = 'import org.bukkit.event.player.BlockGrowEvent;';
    const functionName = Java.nameDB_.getName('onBlockGrow', NameType.PROCEDURE);
    const eventBlock = Java.nameDB_.getName(block.getFieldValue('BLOCK'), NameType.VARIABLE);
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@EventHandler\n' +
        'public void ' + functionName + '(BlockGrowEvent event) {\n' +
        '    ' + eventBlock + ' = event.getBlock();\n' +
        '    ' + branch + '\n}'
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName] = code;
    return null;
};