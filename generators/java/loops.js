'use strict';

goog.module('Blockly.Java.loops');

const stringUtils = goog.require('Blockly.utils.string');
const Java = goog.require('Blockly.Java');
const {NameType} = goog.require('Blockly.Names');

Java['controls_repeat_ext'] = function (block) {
    // Repeat n times.
    let repeats;
    if (block.getField('TIMES')) {
        repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        repeats = Java.valueToCode(block, 'TIMES', Java.ORDER_ASSIGNMENT) || '0';
    }
    let branch = Java.statementToCode(block, 'DO');
    branch = Java.addLoopTrap(branch, block);
    let code = '';
    const loopVar = Java.nameDB_.getDistinctName('count', NameType.VARIABLE);
    let endVar = repeats;
    if (!repeats.match(/^\w+$/) && !stringUtils.isNumber(repeats)) {
        endVar = Java.nameDB_.getDistinctName('repeat_end', NameType.VARIABLE);
        code += 'int ' + endVar + ' = ' + repeats + ';\n';
    }
    code += 'for (int ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' + loopVar + '++) {\n' + branch + '}\n';
    return code;
}

Java['controls_repeat'] = Java['controls_repeat_ext'];

Java['controls_whileUntil'] = function (block) {
    // Do while/until loop.
    const until = block.getFieldValue('MODE') === 'UNTIL';
    let argument0 =
        Java.valueToCode(block, 'BOOL', until ? Java.ORDER_LOGICAL_NOT : Java.ORDER_NONE) || 'false';
    let branch = Java.statementToCode(block, 'DO');
    branch = Java.addLoopTrap(branch, block);
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Java['controls_for'] = function (block) {
    // For loop.
    const variable0 = Java.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
    const argument0 = Java.valueToCode(block, 'FROM', Java.ORDER_ASSIGNMENT) || '0';
    const argument1 = Java.valueToCode(block, 'TO', Java.ORDER_ASSIGNMENT) || '0';
    const increment = Java.valueToCode(block, 'BY', Java.ORDER_ASSIGNMENT) || '1';
    let branch = Java.statementToCode(block, 'DO');
    branch = Java.addLoopTrap(branch, block);
    let code;
    if (stringUtils.isNumber(argument0) && stringUtils.isNumber(argument1) && stringUtils.isNumber(increment)) {
        const up = Number(argument0) <= Number(argument1);
        code = 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0;
        const step = Math.abs(Number(increment));
        if (step === 1) {
            code += up ? '++' : '--';
        } else {
            code += (up ? ' += ' : ' -= ') + step;
        }
        code += ') {\n' + branch + '}\n';
    } else {
        code = '';
        let startVar = argument0;
        if (!argument0.match(/^\w+$/) && !stringUtils.isNumber(argument0)) {
            startVar = Java.nameDB_.getDistinctName(variable0 + '_start', NameType.VARIABLE);
            code += 'int ' + startVar + ' = ' + argument0 + ';\n';
        }
        let endVar = argument1;
        if (!argument1.match(/^\w+$/) && !stringUtils.isNumber(argument1)) {
            endVar = Java.nameDB_.getDistinctName(variable0 + '_end', NameType.VARIABLE);
            code += 'int ' + endVar + ' = ' + argument1 + ';\n';
        }
        const incVar = Java.nameDB_.getDistinctName(variable0 + '_inc', NameType.VARIABLE);
        code += 'int ' + incVar + ' = ';
        if (stringUtils.isNumber(increment)) {
            code += Math.abs(increment) + ';\n';
        } else {
            code += 'Math.abs(' + increment + ');\n';
        }
        code += 'if (' + startVar + ' > ' + endVar + ') {\n';
        code += Java.INDENT + incVar + ' = -' + incVar + ';\n';
        code += '}\n';
        code += 'for (' + variable0 + ' = ' + startVar + '; ' + incVar +
            ' >= 0 ? ' + variable0 + ' <= ' + endVar + ' : ' + variable0 +
            ' >= ' + endVar + '; ' + variable0 + ' += ' + incVar + ') {\n' +
            branch + '}\n';
    }
    return code;
};

Java['controls_forEach'] = function (block) {
    // For each loop.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const variable0 = Java.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
    const argument0 = Java.valueToCode(block, 'LIST', Java.ORDER_ASSIGNMENT) || 'new ArrayList<>()';
    let branch = Java.statementToCode(block, 'DO');
    branch = Java.addLoopTrap(branch, block);
    let code = '';
    let listVar = argument0;
    if (!argument0.match(/^\w+$/)) {
        listVar = Java.nameDB_.getDistinctName(variable0 + '_list', NameType.VARIABLE);
        code += 'Object ' + listVar + ' = ' + argument0 + ';\n';
    }
    const indexVar = Java.nameDB_.getDistinctName(variable0 + '_value', NameType.VARIABLE);
    branch = Java.INDENT + variable0 + ' = ' + indexVar + ';\n' + branch;
    code += 'for (Object ' + indexVar + ' : (ArrayList) ' + listVar + ') {\n' + branch + '}\n';
    return code;
};

Java['controls_flow_statements'] = function (block) {
    // Flow statements: continue, break.
    switch (block.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return 'continue;\n';
    }
    throw Error('Unknown flow statement.');
};
