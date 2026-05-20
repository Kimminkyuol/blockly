'use strict';

goog.module('Blockly.Java.scoreboard');

const Java = goog.require('Blockly.Java');

// Helper snippet: main scoreboard reference (inlined to avoid a field)
function sb() {
    return 'Bukkit.getScoreboardManager().getMainScoreboard()';
}

// ─── Value: Score queries ──────────────────────────────────────────────────────

Java['scoreboard_get_score'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const entry = Java.valueToCode(block, 'ENTRY', Java.ORDER_NONE) || '"player"';
    const objective = Java.valueToCode(block, 'OBJECTIVE', Java.ORDER_NONE) || '"score"';
    return [
        sb() + '.getObjective((String) ' + objective + ').getScore((String) ' + entry + ').getScore()',
        Java.ORDER_FUNCTION_CALL
    ];
};

Java['scoreboard_has_score'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const entry = Java.valueToCode(block, 'ENTRY', Java.ORDER_NONE) || '"player"';
    const objective = Java.valueToCode(block, 'OBJECTIVE', Java.ORDER_NONE) || '"score"';
    return [
        sb() + '.getObjective((String) ' + objective + ').getScoreboard().getEntries().contains((String) ' + entry + ')',
        Java.ORDER_FUNCTION_CALL
    ];
};

// ─── Statement: Score setters ──────────────────────────────────────────────────

Java['scoreboard_set_score'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const entry = Java.valueToCode(block, 'ENTRY', Java.ORDER_NONE) || '"player"';
    const objective = Java.valueToCode(block, 'OBJECTIVE', Java.ORDER_NONE) || '"score"';
    const value = Java.getAdjustedInt(block, 'VALUE');
    return sb() + '.getObjective((String) ' + objective + ').getScore((String) ' + entry + ').setScore(' + value + ');\n';
};

Java['scoreboard_add_score'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Score'] = 'import org.bukkit.scoreboard.Score;';
    const entry = Java.valueToCode(block, 'ENTRY', Java.ORDER_NONE) || '"player"';
    const objective = Java.valueToCode(block, 'OBJECTIVE', Java.ORDER_NONE) || '"score"';
    const amount = Java.getAdjustedInt(block, 'AMOUNT');
    const id = block.id.replace(/[^a-zA-Z0-9]/g, '_');
    return (
        'Score score_' + id + ' = ' + sb() + '.getObjective((String) ' + objective + ').getScore((String) ' + entry + ');\n' +
        'score_' + id + '.setScore(score_' + id + '.getScore() + ' + amount + ');\n'
    );
};

Java['scoreboard_reset_score'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    const entry = Java.valueToCode(block, 'ENTRY', Java.ORDER_NONE) || '"player"';
    const objective = Java.valueToCode(block, 'OBJECTIVE', Java.ORDER_NONE) || '"score"';
    return sb() + '.resetScores((String) ' + entry + ');\n';
};

// ─── Statement: Objective management ──────────────────────────────────────────

Java['scoreboard_create_objective'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Scoreboard'] = 'import org.bukkit.scoreboard.Scoreboard;';
    Java.definitions_['import_Objective'] = 'import org.bukkit.scoreboard.Objective;';
    Java.definitions_['import_DisplaySlot'] = 'import org.bukkit.scoreboard.DisplaySlot;';
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '"score"';
    const displayName = Java.valueToCode(block, 'DISPLAY_NAME', Java.ORDER_NONE) || '"Score"';
    const slot = block.getFieldValue('SLOT') || 'SIDEBAR';
    const id = block.id.replace(/[^a-zA-Z0-9]/g, '_');

    let code =
        'Scoreboard sb_' + id + ' = ' + sb() + ';\n' +
        'Objective obj_' + id + ' = sb_' + id + '.getObjective((String) ' + name + ');\n' +
        'if (obj_' + id + ' == null) {\n' +
        '    obj_' + id + ' = sb_' + id + '.registerNewObjective((String) ' + name + ', "dummy", (String) ' + displayName + ');\n' +
        '}\n';

    if (slot !== 'NONE') {
        code += 'obj_' + id + '.setDisplaySlot(DisplaySlot.' + slot + ');\n';
    }
    return code;
};

Java['scoreboard_remove_objective'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Objective'] = 'import org.bukkit.scoreboard.Objective;';
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '"score"';
    const id = block.id.replace(/[^a-zA-Z0-9]/g, '_');
    return (
        'Objective objRm_' + id + ' = ' + sb() + '.getObjective((String) ' + name + ');\n' +
        'if (objRm_' + id + ' != null) objRm_' + id + '.unregister();\n'
    );
};

Java['scoreboard_show_player'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    const player = Java.valueToCode(block, 'PLAYER', Java.ORDER_NONE);
    return '((Player) ' + player + ').setScoreboard(' + sb() + ');\n';
};

Java['scoreboard_set_display_name'] = function (block) {
    Java.definitions_['import_Bukkit'] = 'import org.bukkit.Bukkit;';
    Java.definitions_['import_Objective'] = 'import org.bukkit.scoreboard.Objective;';
    const name = Java.valueToCode(block, 'NAME', Java.ORDER_NONE) || '"score"';
    const displayName = Java.valueToCode(block, 'DISPLAY_NAME', Java.ORDER_NONE) || '"Score"';
    const id = block.id.replace(/[^a-zA-Z0-9]/g, '_');
    return (
        'Objective objDn_' + id + ' = ' + sb() + '.getObjective((String) ' + name + ');\n' +
        'if (objDn_' + id + ' != null) objDn_' + id + '.setDisplayName((String) ' + displayName + ');\n'
    );
};
