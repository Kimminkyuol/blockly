'use strict';

goog.module('Blockly.Java.variables');

const Java = goog.require('Blockly.Java');
const {NameType} = goog.require('Blockly.Names');

Java['variables_get'] = function (block) {
    // Variable getter.
    const code = Java.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
    return [code, Java.ORDER_ATOMIC];
};

Java['variables_set'] = function (block) {
    // Variable setter.
    const argument0 = Java.valueToCode(block, 'VALUE', Java.ORDER_ASSIGNMENT) || '0';
    const varName = Java.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
    return varName + ' = ' + argument0 + ';\n';
};
