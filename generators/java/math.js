'use strict'

goog.module('Blockly.Java.math');

const Java = goog.require('Blockly.Java');
const {NameType} = goog.require('Blockly.Names');

Java['math_number'] = function (block) {
    // Numeric value.
    const code = Number(block.getFieldValue('NUM'));
    // const order = code >= 0 ? Java.ORDER_ATOMIC : Java.ORDER_UNARY_NEGATION;
    return [code, Java.ORDER_ADDITIVE];
};

Java['math_arithmetic'] = function (block) {
    // Basic arithmetic operators, and power.
    const OPERATORS = {
        'ADD': [' + ', Java.ORDER_ADDITION],
        'MINUS': [' - ', Java.ORDER_SUBTRACTION],
        'MULTIPLY': [' * ', Java.ORDER_MULTIPLICATION],
        'DIVIDE': [' / ', Java.ORDER_DIVISION],
        'POWER': [null, Java.ORDER_NONE]
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = Java.getAdjustedDouble(block, 'A', order);
    const argument1 = Java.getAdjustedDouble(block, 'B', order);
    let code;
    if (!operator) {
        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
        return [code, Java.ORDER_FUNCTION_CALL];
    }
    code = argument0 + operator + argument1;
    return [code, order];
};

Java['math_single'] = function (block) {
    // Math operators with single operand.
    const operator = block.getFieldValue('OP');
    let code;
    let arg;
    if (operator === 'NEG') {
        code = Java.getAdjustedDouble(block, 'NUM', Java.ORDER_UNARY_SIGN);
        return [code, Java.ORDER_UNARY_NEGATION];
    }
    if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
        arg = Java.getAdjustedDouble(block, 'NUM', Java.ORDER_DIVISION);
    } else {
        arg = Java.getAdjustedDouble(block, 'NUM', Java.ORDER_NONE);
    }
    switch (operator) {
        case 'ABS':
            code = 'Math.abs(' + arg + ')';
            break;
        case 'ROOT':
            code = 'Math.sqrt(' + arg + ')';
            break;
        case 'LN':
            code = 'Math.log(' + arg + ')';
            break;
        case 'EXP':
            code = 'Math.exp(' + arg + ')';
            break;
        case 'POW10':
            code = 'Math.pow(10,' + arg + ')';
            break;
        case 'ROUND':
            code = 'Math.round(' + arg + ')';
            break;
        case 'ROUNDUP':
            code = 'Math.ceil(' + arg + ')';
            break;
        case 'ROUNDDOWN':
            code = 'Math.floor(' + arg + ')';
            break;
        case 'SIN':
            code = 'Math.sin(' + arg + ' / 180 * Math.PI)';
            break;
        case 'COS':
            code = 'Math.cos(' + arg + ' / 180 * Math.PI)';
            break;
        case 'TAN':
            code = 'Math.tan(' + arg + ' / 180 * Math.PI)';
            break;
    }
    if (code) {
        return [code, Java.ORDER_FUNCTION_CALL];
    }
    switch (operator) {
        case 'LOG10':
            code = 'Math.log(' + arg + ') / Math.log(10)';
            break;
        case 'ASIN':
            code = 'Math.asin(' + arg + ') / Math.PI * 180';
            break;
        case 'ACOS':
            code = 'Math.acos(' + arg + ') / Math.PI * 180';
            break;
        case 'ATAN':
            code = 'Math.atan(' + arg + ') / Math.PI * 180';
            break;
        default:
            throw Error('Unknown math operator: ' + operator);
    }
    return [code, Java.ORDER_DIVISION];
};

Java['math_constant'] = function (block) {
    // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
    const CONSTANTS = {
        'PI': ['Math.PI', Java.ORDER_MEMBER],
        'E': ['Math.E', Java.ORDER_MEMBER],
        'GOLDEN_RATIO': ['(1 + Math.sqrt(5)) / 2', Java.ORDER_DIVISION],
        'SQRT2': ['Math.sqrt(2)', Java.ORDER_MEMBER],
        'SQRT1_2': ['Math.sqrt(1.0 / 2)', Java.ORDER_MEMBER],
        'INFINITY': ['Double.POSITIVE_INFINITY', Java.ORDER_ATOMIC]
    };
    return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Java['math_number_property'] = function (block) {
    // Check if a number is even, odd, prime, whole, positive, or negative
    // or if it is divisible by certain number. Returns true or false.
    const number_to_check = Java.getAdjustedDouble(block, 'NUMBER_TO_CHECK', Java.ORDER_MODULUS);
    const dropdown_property = block.getFieldValue('PROPERTY');
    let code;
    if (dropdown_property === 'PRIME') {
        const functionName = Java.provideFunction_('mathIsPrime', [
            'public static boolean ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(double n) {',
            '    if (n < 2) return false;',
            '    if (n == 2.0 || n == 3.0) return true;',
            '    if (n % 2 == 0 || n % 3 == 0) return false;',
            '    long sqrtN = (long) Math.sqrt(n) + 1;',
            '    for (long i = 6L; i <= sqrtN; i += 6) {',
            '        if (n % (i - 1) == 0 || n % (i + 1) == 0) return false;',
            '    }',
            '    return true;',
            '}',]);
        code = functionName + '(' + number_to_check + ')';
        return [code, Java.ORDER_FUNCTION_CALL];
    }
    switch (dropdown_property) {
        case 'EVEN':
            code = number_to_check + ' % 2 == 0';
            break;
        case 'ODD':
            code = number_to_check + ' % 2 == 1';
            break;
        case 'WHOLE':
            code = number_to_check + ' % 1 == 0';
            break;
        case 'POSITIVE':
            code = number_to_check + ' > 0';
            break;
        case 'NEGATIVE':
            code = number_to_check + ' < 0';
            break;
        case 'DIVISIBLE_BY': {
            const divisor = Java.getAdjustedDouble(block, 'DIVISOR', Java.ORDER_MODULUS);
            code = number_to_check + ' % ' + divisor + ' == 0';
            break;
        }
    }
    return [code, Java.ORDER_EQUALITY];
};

Java['math_change'] = function (block) {
    // Add to a variable in place.
    const argument0 = Java.getAdjustedDouble(block, 'DELTA');
    const varName = Java.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
    return '((Number) ' + varName + ').doubleValue() + ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Java['math_round'] = Java['math_single'];
// Trigonometry functions have a single operand.
Java['math_trig'] = Java['math_single'];

Java['math_on_list'] = function (block) {
    // Math functions for lists.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    Java.definitions_['import_Collections'] = 'import java.util.Collections;';
    const func = block.getFieldValue('OP');
    let list;
    let code;
    switch (func) {
        case 'SUM':
            list = Java.valueToCode(block, 'LIST', Java.ORDER_MEMBER) || 'new ArrayList<>()';
            code = '((ArrayList) ' + list + ').stream().mapToDouble(value -> ((Number) value).doubleValue()).sum()'
            break;
        case 'MIN':
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = '((ArrayList) ' + list + ').isEmpty() ? null : Collections.min((ArrayList) ' + list + ')';
            break;
        case 'MAX':
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = '((ArrayList) ' + list + ').isEmpty() ? null : Collections.max((ArrayList) ' + list + ')';
            break;
        case 'AVERAGE': {
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = '((ArrayList) ' + list + ').stream().mapToDouble(value -> ((Number) value).doubleValue()).average().orElse(0)'
            break;
        }
        case 'MEDIAN': {
            const functionName = Java.provideFunction_('mathMedian', [
                'public static Object ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(ArrayList array) {',
                '    Collections.sort(array);',
                '    if (array.size() % 2 == 1) {',
                '        return array.get((array.size() + 1) / 2 - 1);',
                '    } else {',
                '        return array.get((array.size() + 1) / 2);',
                '    }', '}'
            ]);
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = functionName + '((ArrayList)' + list + ')';
            break;
        }
        case 'MODE': {
            const functionName = Java.provideFunction_('mathModes', [
                'public static Object ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(ArrayList array) {',
                '    Object r = 0;',
                '    int max = 0;',
                '    for (Object o1 : array) {',
                '        int count = 0;',
                '        for (Object o2 : array) {',
                '            if (o2 == o1) count++;',
                '            if (count > max) {',
                '                r = o1;',
                '                max = count;',
                '            }',
                '        }',
                '    }',
                '    return max > 1 ? r : null;', '}'
            ]);
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = functionName + '((ArrayList) ' + list + ')';
            break;
        }
        case 'STD_DEV': {
            const functionName = Java.provideFunction_('mathStandardDeviation', [
                'public static double ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(ArrayList array) {',
                '    double sum = 0.0, sd = 0.0;',
                '    int length = array.size();',
                '    for (Object num : array) {',
                '        sum += ((Number) num).doubleValue();',
                '    }',
                '    double mean = sum / length;',
                '    for (Object num : array) {',
                '        sd += Math.pow(((Number) num).doubleValue() - mean, 2);',
                '    }',
                '    return Math.sqrt(sd / length);', '}'
            ]);
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = functionName + '((ArrayList) ' + list + ')';
            break;
        }
        case 'RANDOM': {
            Java.definitions_['import_random'] = 'import java.util.Random;';
            list = Java.valueToCode(block, 'LIST', Java.ORDER_NONE) || 'new ArrayList<>()';
            code = '((ArrayList) ' + list + ').get(new Random().nextInt(((ArrayList) ' + list + ').size()))'
            break;
        }
        default:
            throw Error('Unknown operator: ' + func);
    }
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['math_modulo'] = function (block) {
    // Remainder computation.
    const argument0 = Java.getAdjustedDouble(block, 'DIVIDEND', Java.ORDER_MODULUS);
    const argument1 = Java.getAdjustedDouble(block, 'DIVISOR', Java.ORDER_MODULUS);
    const code = argument0 + ' % ' + argument1;
    return [code, Java.ORDER_MODULUS];
};

Java['math_constrain'] = function (block) {
    // Constrain a number between two limits.
    const argument0 = Java.getAdjustedDouble(block, 'VALUE', Java.ORDER_NONE);
    const argument1 = Java.getAdjustedDouble(block, 'LOW', Java.ORDER_NONE);
    const argument2 = Java.getAdjustedDouble(block, 'HIGH', Java.ORDER_NONE);
    const code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' + argument2 + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['math_random_int'] = function (block) {
    // Random integer between [X] and [Y].
    Java.definitions_['import_random'] = 'import java.util.Random;';
    const argument0 = Java.getAdjustedDouble(block, 'FROM', Java.ORDER_NONE);
    const argument1 = Java.getAdjustedDouble(block, 'TO', Java.ORDER_NONE);
    const code = 'new Random().nextInt(' + argument0 + ', ' + argument1 + ' + 1)';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['math_random_float'] = function () {
    // Random fraction between 0 and 1.
    return ['Math.random()', Java.ORDER_FUNCTION_CALL];
};

Java['math_atan2'] = function (block) {
    // Arctangent of point (X, Y) in degrees from -180 to 180.
    const argument0 = Java.valueToCode(block, 'X', Java.ORDER_NONE) || '0';
    const argument1 = Java.valueToCode(block, 'Y', Java.ORDER_NONE) || '0';
    return ['Math.atan2(' + argument1 + ', ' + argument0 + ') / Math.PI * 180', Java.ORDER_DIVISION];
};

