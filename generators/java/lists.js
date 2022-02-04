'use strict'

goog.module('Blockly.Java.lists');

const Java = goog.require('Blockly.Java');
const stringUtils = goog.require('Blockly.utils.string');
const {NameType} = goog.require('Blockly.Names');

Java['lists_create_empty'] = function () {
    // Create an empty list.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    return ['new Var(new ArrayList<>())', Java.ORDER_ATOMIC];
};

Java['lists_create_with'] = function (block) {
    // Create a list with any number of elements of any type.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const elements = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
        elements[i] = Java.valueToCode(block, 'ADD' + i, Java.ORDER_NONE) || 'null';
        elements[i] = 'add(Var.valueOf(' + elements[i] + '));';
    }
    const code = 'new Var(new ArrayList<>()) {{ ' + elements.join(' ') + ' }}';
    return [code, Java.ORDER_ATOMIC];
};

Java['lists_repeat'] = function (block) {
    // Create a list with one element repeated.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const functionName = Java.provideFunction_('listsRepeat', [
        'public static ArrayList<Object> ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(ArrayList<Object> value, int n) {',
        '    ArrayList<Object> result = new Var(new ArrayList<>());',
        '    for (int x = 0; x < n; x++) {',
        '        result.add(value);',
        '    }',
        '    return result', '}'
    ]);
    const element = Java.valueToCode(block, 'ITEM', Java.ORDER_NONE) || 'null';
    const repeatCount = Java.valueToCode(block, 'NUM', Java.ORDER_MULTIPLICATIVE) || '0'
    const code = functionName + '(' + element + ', ' + repeatCount + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
}

Java['lists_length'] = function (block) {
    // Array length.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const list = Java.valueToCode(block, 'VALUE', Java.ORDER_MEMBER) || 'new Var(new ArrayList<>())';
    return [list + '.size()', Java.ORDER_FUNCTION_CALL];
};

Java['lists_isEmpty'] = function (block) {
    // Is the array empty?
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const list = Java.valueToCode(block, 'VALUE', Java.ORDER_NONE) || 'new Var(new ArrayList<>())';
    return [list + '.size() == 0', Java.ORDER_LOGICAL_NOT];
};

Java['lists_indexOf'] = function (block) {
    // Find an item in the list.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const operator = block.getFieldValue('END') === 'FIRST' ? 'indexOf' : 'lastIndexOf';
    const list = Java.valueToCode(block, 'VALUE', Java.ORDER_NONE) || 'new Var(new ArrayList<>())';
    const item = Java.valueToCode(block, 'FIND', Java.ORDER_NONE) || '\'\'';
    const code = list + '.' + operator + '(' + item + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
}

Java['lists_getIndex'] = function (block) {
    // Get element at index.
    // Note: Until January 2013 this block did not have MODE or WHERE inputs.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const mode = block.getFieldValue('MODE') || 'GET';
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    const listOrder = (where === 'RANDOM') ? Java.ORDER_NONE : Java.ORDER_MEMBER;
    const list = Java.valueToCode(block, 'VALUE', listOrder) || 'new Var(new ArrayList<>())';

    switch (where) {
        case ('FIRST'):
            if (mode === 'GET') {
                const code = list + '.get(0)';
                return [code, Java.ORDER_MEMBER];
            } else {
                const code = list + '.remove(0)';
                if (mode === 'GET_REMOVE') {
                    return [code, Java.ORDER_FUNCTION_CALL];
                } else if (mode === 'REMOVE') {
                    return code + ';\n';
                }
            }
            break;
        case ('LAST'):
            if (mode === 'GET') {
                const code = list + '.get(' + list + '.size - 1)';
                return [code, Java.ORDER_MEMBER];
            } else {
                const code = list + '.remove(' + list + '.size - 1)';
                if (mode === 'GET_REMOVE') {
                    return [code, Java.ORDER_FUNCTION_CALL];
                } else if (mode === 'REMOVE') {
                    return code + ';\n';
                }
            }
            break;
        case ('FROM_START'): {
            const at = Java.getAdjusted(block, 'AT');
            if (mode === 'GET') {
                const code = list + '.get(' + at + ')';
                return [code, Java.ORDER_MEMBER];
            } else {
                const code = list + '.remove(' + at + ')';
                if (mode === 'GET_REMOVE') {
                    return [code, Java.ORDER_FUNCTION_CALL];
                } else if (mode === 'REMOVE') {
                    return code + ';\n';
                }
            }
            break;
        }
        case ('FROM_END'): {
            const at = Java.getAdjusted(block, 'AT');
            if (mode === 'GET') {
                const code = list + '.get(' + list + '.size() - ' + at + ' - 1)';
                return [code, Java.ORDER_MEMBER];
            } else {
                const code = list + '.remove(' + list + '.size() - ' + at + ' - 1)';
                if (mode === 'GET_REMOVE') {
                    return [code, Java.ORDER_FUNCTION_CALL]
                } else if (mode === 'REMOVE') {
                    return code + ';\n';
                }
            }
            break;
        }
        case ('RANDOM'): {
            if (mode === 'GET') {
                const code = list + '.get((int) (Math.random() *  ' + list + '.size()))';
                return [code, Java.ORDER_MEMBER];
            } else {
                const code = list + '.remove((int) (Math.random() *  ' + list + '.size()))';
                if (mode === 'GET_REMOVE') {
                    return [code, Java.ORDER_FUNCTION_CALL];
                } else if (mode === 'GET_REMOVE') {
                    return code + ';\n';
                }
            }
            break;
        }
    }
    throw Error('Unhandled combination (lists_getIndex).');
};

Java['lists_setIndex'] = function (block) {
    // Set element at index.
    // Note: Until February 2013 this block did not have MODE or WHERE inputs.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    let list = Java.valueToCode(block, 'LIST', Java.ORDER_MEMBER) || 'new Var(new ArrayList<>())';
    const mode = block.getFieldValue('MODE') || 'GET';
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    const value = Java.valueToCode(block, 'TO', Java.ORDER_ASSIGNMENT) || 'null';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    // Closure, which accesses and modifies 'list'.
    function cacheList() {
        if (list.match(/^\w+$/)) {
            return '';
        }
        const listVar = Java.nameDB_.getDistinctName('tmpList', NameType.VARIABLE);
        const code = listVar + ' = ' + list + ';\n';
        list = listVar;
        return code;
    }

    switch (where) {
        case ('FIRST'):
            if (mode === 'SET') {
                return list + '.set(0, ' + value + ');\n';
            } else if (mode === 'INSERT') {
                return list + '.add(0, ' + value + ');\n';
            }
            break;
        case ('LAST'):
            if (mode === 'SET') {
                let code = cacheList();
                code += list + '.set(' + list + '.size() - 1, ' + value + ');\n';
                return code;
            } else if (mode === 'INSERT') {
                return list + '.add(' + value + ');\n';
            }
            break;
        case ('FROM_START'): {
            const at = Java.getAdjusted(block, 'AT');
            if (mode === 'SET') {
                return list + '.set(' + at + ', ' + value + ');\n';
            } else if (mode === 'INSERT') {
                return list + '.add(' + at + ', ' + value + ');\n';
            }
            break;
        }
        case ('FROM_END'): {
            const at = Java.getAdjusted(block, 'AT');
            let code = cacheList();
            if (mode === 'SET') {
                code += list + '.set(' + list + '.size() - 1 - ' + at + ', ' + value + ');\n';
                return code;
            } else if (mode === 'INSERT') {
                code += list + '.add(' + list + '.size() - 1 - ' + at + ', ' + value + ');\n';
                return code;
            }
            break;
        }
        case ('RANDOM'): {
            let code = cacheList();
            const xVar = Java.nameDB_.getDistinctName('tmpX', NameType.VARIABLE);
            code += 'int ' + xVar + ' = (int) (Math.random() *  ' + list + '.size());\n';
            if (mode === 'SET') {
                code += list + '.set(' + xVar + ', ' + value + ');\n';
                return code;
            } else if (mode === 'INSERT') {
                code += list + '.add(' + xVar + ', ' + value + ');\n';
                return code;
            }
            break;
        }
    }
    throw Error('Unhandled combination (lists_setIndex).');
}

Java['lists_getSublist'] = function (block) {
    // Get sublist.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const list = Java.valueToCode(block, 'LIST', Java.ORDER_MEMBER) || 'new Var(new ArrayList<>())';
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');
    let at1;
    switch (where1) {
        case 'FROM_START':
            at1 = Java.getAdjustedInt(block, 'AT1');
            break;
        case 'FROM_END':
            at1 = Java.getAdjustedInt(block, 'AT1');
            at1 = list + '.size() - 1 - ' + at1;
            break;
        case 'FIRST':
            at1 = '0';
            break;
        default:
            throw Error('Unhandled option (lists_getSublist).');
    }

    let at2;
    switch (where2) {
        case 'FROM_START':
            at2 = Java.getAdjustedInt(block, 'AT1');
            break;
        case 'FROM_END':
            at2 = Java.getAdjustedInt(block, 'AT1');
            at2 = list + '.size() - 1 - ' + at2;
            break;
        case 'LAST':
            at2 = list + '.size() - 1';
            break;
        default:
            throw Error('Unhandled option (lists_getSublist).');
    }
    const code = list + '.subList(' + at1 + ', ' + at2 + ')';
    return [code, Java.ORDER_MEMBER];
};

Java['lists_sort'] = function (block) {
    // Block for sorting a list.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const list = Java.valueToCode(block, 'LIST', Java.ORDER_FUNCTION_CALL) || 'new Var(new ArrayList<>())';
    const reverse = block.getFieldValue('DIRECTION') === '1' ? 'false' : 'true';
    const type = block.getFieldValue('TYPE');
    const code = list + '.sort("' + type + '", 0, ' + list + '.size() - 1, ' + reverse + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
}

Java['lists_split'] = function (block) {
    // Block for splitting text into a list, or joining a list into text.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    let input = Java.valueToCode(block, 'INPUT', Java.ORDER_MEMBER);
    const delimiter = Java.valueToCode(block, 'DELIM', Java.ORDER_NONE) || '\' \'';
    const mode = block.getFieldValue('MODE');
    let functionName;
    switch (mode) {
        case 'SPLIT':
            if (!input) {
                input = 'new Var("")';
            }
            functionName = 'split';
            break;
        case 'JOIN':
            if (!input) {
                input = 'new Var(new ArrayList<>())'
            }
            functionName = 'join';
            break;
        default:
            throw Error('Unknown mode: ' + mode);
    }
    const code = input + '.' + functionName + '(' + delimiter + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['lists_reverse'] = function (block) {
    // Block for reversing a list.
    Java.definitions_['import_ArrayList'] = 'import java.util.ArrayList;';
    const list = Java.valueToCode(block, 'LIST', Java.ORDER_FUNCTION_CALL) || 'new Var(new ArrayList<>())';
    const code = list + '.reverse()';
    return [code, Java.ORDER_FUNCTION_CALL];
};
