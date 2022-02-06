'use strict';

goog.module('Blockly.Java.text');

const Java = goog.require('Blockly.Java');
const {NameType} = goog.require('Blockly.Names');

const strRegExp = /^\s*'([^']|\\')*'\s*$/;

const forceString = function (value) {
    if (strRegExp.test(value)) {
        return [value, Java.ORDER_ATOMIC];
    }
    return ['String.valueOf(' + value + ')', Java.ORDER_FUNCTION_CALL];
};

const getSubstringIndex = function (stringName, where, opt_at) {
    if (where === 'FIRST') {
        return '0';
    } else if (where === 'FROM_END') {
        return stringName + '.length - 1 - ' + opt_at;
    } else if (where === 'LAST') {
        return stringName + '.length - 1';
    } else {
        return opt_at;
    }
};

Java['text'] = function (block) {
    // Text value.
    const code = Java.quote_(block.getFieldValue('TEXT'));
    return [code, Java.ORDER_ATOMIC];
};

Java['text_multiline'] = function (block) {
    // Text value.
    const code = Java.multiline_quote_(block.getFieldValue('TEXT'));
    const order = code.indexOf('+') !== -1 ? Java.ORDER_ADDITIVE : Java.ORDER_ATOMIC;
    return [code, order];
};

Java['text_join'] = function (block) {
    // Create a string made up of any number of elements of any type.
    switch (block.itemCount_) {
        case 0:
            return ['\'\'', Java.ORDER_ATOMIC];
        default: {
            const elements = new Array(block.itemCount_);
            for (let i = 0; i < block.itemCount_; i++) {
                elements[i] = forceString(Java.valueToCode(block, 'ADD' + i, Java.ORDER_NONE) || '\'\'')[0];
            }
            const code = elements.join(' + ');
            return [code, Java.ORDER_FUNCTION_CALL];
        }
    }
};

Java['text_append'] = function (block) {
    // Append to a variable in place.
    const varName = Java.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
    const value = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '\'\'';
    return varName + '=' + 'String.valueOf(' + varName + ') + ' + forceString(value)[0] + ';\n';
};

Java['text_length'] = function (block) {
    // String or array length.
    const text = Java.valueToCode(block, 'VALUE', Java.ORDER_MEMBER) || '\'\'';
    return ['String.valueOf(' + text + ').length()', Java.ORDER_MEMBER];
};

Java['text_indexOf'] = function (block) {
    // Search the text for a substring.
    const operator = block.getFieldValue('END') === 'FIRST' ? 'indexOf' : 'lastIndexOf';
    const substring = Java.valueToCode(block, 'FIND', Java.ORDER_NONE) || '\'\'';
    const text = Java.valueToCode(block, 'VALUE', Java.ORDER_MEMBER) || '\'\'';
    const code = 'String.valueOf(' + text + ').' + operator + '(' + substring + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['text_charAt'] = function (block) {
    // Get letter at index.
    // Note: Until January 2013 this block did not have the WHERE input.
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    const textOrder = (where === 'RANDOM') ? Java.ORDER_NONE : Java.ORDER_MEMBER;
    let text = Java.valueToCode(block, 'VALUE', textOrder) || '\'\'';
    text = 'String.valueOf(' + text + ')';
    switch (where) {
        case 'FIRST': {
            const code = text + '.charAt(0)';
            return [code, Java.ORDER_FUNCTION_CALL];
        }
        case 'LAST': {
            const code = text + '.charAt(' + text + '.length() - 1)';
            return [code, Java.ORDER_FUNCTION_CALL];
        }
        case 'FROM_START': {
            const at = Java.getAdjustedInt(block, 'AT');
            const code = text + '.charAt(' + at + ')';
            return [code, Java.ORDER_FUNCTION_CALL];
        }
        case 'FROM_END': {
            const at = Java.getAdjustedInt(block, 'AT');
            const code = text + '.charAt(' + text + '.length() - 1 - ' + at + ')';
            return [code, Java.ORDER_FUNCTION_CALL];
        }
        case 'RANDOM': {
            const functionName = Java.provideFunction_('textRandomLetter', [
                'public static char ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(String string) {',
                '    return string.charAt((int) (Math.random() * string.length()));', '}'
            ]);
            const code = functionName + '(' + text + ')';
            return [code, Java.ORDER_FUNCTION_CALL];
        }
    }
    throw Error('Unhandled option (text_charAt).');
};

Java['text_getSubstring'] = function (block) {
    // Get substring.
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');
    let text = Java.valueToCode(block, 'STRING', Java.ORDER_MEMBER) || '\'\'';
    text = 'String.valueOf(' + text + ')';
    let at1;
    switch (where1) {
        case 'FROM_START':
            at1 = Java.getAdjustedInt(block, 'AT1');
            break;
        case 'FROM_END':
            at1 = text + '.length() - 1 - ' + Java.getAdjustedInt(block, 'AT1');
            break;
        case 'FIRST':
            at1 = '0';
            break;
        default:
            throw Error('Unhandled option (text_getSubstring)');
    }

    let at2;
    switch (where2) {
        case 'FROM_START':
            at2 = Java.getAdjustedInt(block, 'AT2');
            break;
        case 'FROM_END':
            at2 = text + '.length() - 1 - ' + Java.getAdjustedInt(block, 'AT2');
            break;
        case 'LAST':
            at2 = text + '.length() - 1';
            break;
        default:
            throw Error('Unhandled option (text_getSubstring)');
    }
    const code = text + '.subString(' + at1 + ', ' + at2 + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['text_changeCase'] = function (block) {
    // Change capitalization.
    const OPERATORS = {
        'UPPERCASE': '.toUpperCase()',
        'LOWERCASE': '.toLowerCase()',
        'TITLECASE': null
    };
    const operator = OPERATORS[block.getFieldValue('CASE')];
    let text = Java.valueToCode(block, 'TEXT', Java.ORDER_MEMBER) || '\'\'';
    text = 'String.valueOf(' + text + ')';
    let code;
    if (operator) {
        code = text + operator;
    } else {
        Java.definitions_['import_Arrays'] = 'import java.util.Arrays;';
        Java.definitions_['import_Collectors'] = 'import java.util.stream.Collectors;';
        code = 'Arrays.stream(' + text + '.split(" ")).map(word -> word.isEmpty() ? word : Character.toTitleCase(word.charAt(0)) + word.substring(1).toLowerCase()).collect(Collectors.joining(" "));'
    }
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['text_trim'] = function (block) {
    // Trim spaces.
    const OPERATORS = {
        'LEFT': ".replaceAll(\"^\\\\s+\", \"\")",
        'RIGHT': ".replaceAll(\"\\\\s+$\", \"\")",
        'BOTH': '.trim()'
    };
    const operator = OPERATORS[block.getFieldValue('MODE')];
    let text = Java.valueToCode(block, 'TEXT', Java.ORDER_MEMBER) || '\'\'';
    text = 'String.valueOf(' + text + ')';
    return [text + operator, Java.ORDER_FUNCTION_CALL];
};

Java['text_print'] = function (block) {
    // Print statement.
    const msg = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '\'\'';
    return 'System.out.println(' + msg + ');\n';
};

Java['text_prompt_ext'] = function () {
    // Prompt function.
    throw Error("사용할 수 없는 블록: text_prompt_ext");
}

Java['text_prompt'] = Java['text_prompt_ext'];

Java['text_count'] = function (block) {
    Java.definitions_['import_Collections'] = 'import java.util.Collections;';
    Java.definitions_['import_List'] = 'import java.util.List;';
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '\'\'';
    const sub = Java.valueToCode(block, 'SUB', Java.ORDER_NONE) || '\'\'';
    const code = 'Collections.frequency(List.of(String.valueOf(' + text + ').split("")), ' + sub + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
}

Java['text_replace'] = function (block) {
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_NONE) || '\'\'';
    const from = Java.valueToCode(block, 'FROM', Java.ORDER_NONE) || '\'\'';
    const to = Java.valueToCode(block, 'TO', Java.ORDER_NONE) || '\'\'';
    const code = 'String.valueOf(' + text + ').replaceAll(String.valueOf(' + from + '), String.valueOf(' + to + '))';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['text_reverse'] = function (block) {
    const text = Java.valueToCode(block, 'TEXT', Java.ORDER_MEMBER) || '\'\'';
    const code = 'new StringBuffer(String.valueOf(' + text + ')).reverse().toString()';
    return [code, Java.ORDER_FUNCTION_CALL];
};
