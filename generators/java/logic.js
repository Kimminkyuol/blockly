'use strict';

goog.module('Blockly.Java.logic');

const Java = goog.require('Blockly.Java');

Java['controls_if'] = function (block) {
    // If/elseif/else condition.
    let n = 0;
    let code = '';
    if (Java.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Java.injectId(Java.STATEMENT_PREFIX, block);
    }
    do {
        const conditionCode = Java.valueToCode(block, 'IF' + n, Java.ORDER_NONE) || 'false';
        let branchCode = Java.statementToCode(block, 'DO' + n);
        if (Java.STATEMENT_SUFFIX) {
            branchCode = Java.prefixLines(
                Java.injectId(Java.STATEMENT_SUFFIX, block),
                Java.INDENT
            ) + branchCode;
        }
        code += (n > 0 ? 'else' : '') + 'if (' + conditionCode + ') {\n' + branchCode + '}';
        n++;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE') || Java.STATEMENT_SUFFIX) {
        let branchCode = Java.statementToCode(block, 'ELSE');
        if (Java.STATEMENT_SUFFIX) {
            branchCode = Java.prefixLines(
                Java.injectId(Java.STATEMENT_SUFFIX, block),
                Java.INDENT
            ) + branchCode;
        }
        code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};

Java['controls_ifelse'] = Java['controls_if'];

Java['logic_compare'] = function (block) {
    // Comparison operator.
    const OPERATORS = {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='};
    const operator = OPERATORS[block.getFieldValue('OP')];
    const order = (operator === '==' || operator === '!=') ? Java.ORDER_EQUALITY : Java.ORDER_RELATIONAL;
    const argument0 = Java.valueToCode(block, 'A', order) || '0';
    const argument1 = Java.valueToCode(block, 'B', order) || '0';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Java['logic_operation'] = function (block) {
    // Operations 'and', 'or'.
    const operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
    const order = (operator === '&&') ? Java.ORDER_LOGICAL_AND : Java.ORDER_LOGICAL_OR;
    let argument0 = Java.valueToCode(block, 'A', order);
    let argument1 = Java.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        argument0 = 'false';
        argument1 = 'false';
    } else {
        const defaultArgument = (operator === '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Java['logic_negate'] = function(block) {
  // Negation.
  const order = Java.ORDER_LOGICAL_NOT;
  const argument0 = Java.valueToCode(block, 'BOOL', order) || 'true';
  const code = '!' + argument0;
  return [code, order];
};

Java['logic_boolean'] = function(block) {
  // Boolean values true and false.
  const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
  return [code, Java.ORDER_ATOMIC];
};

Java['logic_null'] = function() {
  // Null data type.
  return ['null', Java.ORDER_ATOMIC];
};

Java['logic_ternary'] = function(block) {
  // Ternary operator.
  const value_if = Java.valueToCode(block, 'IF', Java.ORDER_CONDITIONAL) || 'false';
  const value_then = Java.valueToCode(block, 'THEN', Java.ORDER_CONDITIONAL) || 'null';
  const value_else = Java.valueToCode(block, 'ELSE', Java.ORDER_CONDITIONAL) || 'null';
  const code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Java.ORDER_CONDITIONAL];
};
