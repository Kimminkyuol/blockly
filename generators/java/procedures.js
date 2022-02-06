'use strict';

goog.module('Blockly.Java.procedures');

const Java = goog.require('Blockly.Java');
const {NameType} = goog.require('Blockly.Names');

Java['procedures_defreturn'] = function (block) {
    // Define a procedure with a return value.
    const functionName = Java.nameDB_.getName(block.getFieldValue('NAME'), NameType.PROCEDURE);
    let xFix1 = '';
    if (Java.STATEMENT_PREFIX) {
        xFix1 += Java.injectId(Java.STATEMENT_PREFIX, block);
    }
    if (Java.STATEMENT_SUFFIX) {
        xFix1 += Java.injectId(Java.STATEMENT_SUFFIX, block);
    }
    if (xFix1) {
        xFix1 = Java.prefixLines(xFix1, Java.INDENT);
    }
    let loopTrap = '';
    if (Java.INFINITE_LOOP_TRAP) {
        loopTrap = Java.prefixLines(
            Java.injectId(Java.INFINITE_LOOP_TRAP, block),
            Java.INDENT);
    }
    const branch = Java.statementToCode(block, 'STACK');
    let returnValue = Java.valueToCode(block, 'RETURN', Java.ORDER_NONE) || '';
    let xFix2 = '';
    if (branch && returnValue) {
        xFix2 = xFix1;
    }
    if (returnValue) {
        returnValue = Java.INDENT + 'return ' + returnValue + ';\n';
    }
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = 'Object ' + Java.nameDB_.getName(variables[i], NameType.VARIABLE);
    }
    let code = 'public static Object ' + functionName + '(' + args.join(', ') + ') {\n' + xFix1 + loopTrap + branch + xFix2 + returnValue + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%' + functionName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as a procedure with a return value.
Java['procedures_defnoreturn'] = Java['procedures_defreturn'];

Java['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    const functionName = Java.nameDB_.getName(block.getFieldValue('NAME'), NameType.PROCEDURE);
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = Java.valueToCode(block, 'ARG' + i, Java.ORDER_NONE) || 'null';
    }
    const code = functionName + '(' + args.join(',') + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
}

Java['procedures_callnoreturn'] = function (block) {
    // Call a procedure with no return value.
    // Generated code is for a function call as a statement is the same as a function call as a value, with the addition of line ending.
    const tuple = Java['procedures_callreturn'](block);
    return tuple[0] + ';\n';
};

Java['procedures_ifreturn'] = function (block) {
    // Conditionally return value from a procedure.
    const condition = Java.valueToCode(block, 'CONDITION', Java.ORDER_NONE) || 'false';
    let code = 'if (' + condition + ') {\n';
    if (Java.STATEMENT_SUFFIX) {
        code += Java.prefixLines(Java.injectId(Java.STATEMENT_SUFFIX, block), Java.INDENT);
    }
    if (block.hasReturnValue_) {
        const value = Java.valueToCode(block, 'VALUE', Java.ORDER_NONE) || 'null';
        code += Java.INDENT + 'return ' + value + ';\n';
    } else {
        code += Java.INDENT + 'return;\n';
    }
    code += '}\n';
    return code;
};
