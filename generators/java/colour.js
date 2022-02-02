'use strict';

goog.module('Blockly.Java.colour');

const Java = goog.require('Blockly.Java');

Java['colour_picker'] = function (block) {
    // Colour picker.
    const code = Java.quote_(block.getFieldValue('COLOUR'));
    return [code, Java.ORDER_ATOMIC];
};

Java['colour_random'] = function (block) {
    // Generate a random colour.
    const functionName = Java.provideFunction_('colourRandom', [
        'public static String ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '    double num = Math.floor(Math.random() * Math.pow(2, 24));',
        '    return String.format("#%06x", (int) num);',
        '    return \'#\' + str.substring(str.length() - 6)', '}'
    ]);
    const code = functionName + '()';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['colour_rgb'] = function (block) {
    // Compose a colour from RGB components expressed as percentages.
    const red = Java.valueToCode(block, 'RED', Java.ORDER_NONE) || 0;
    const green = Java.valueToCode(block, 'GREEN', Java.ORDER_NONE) || 0;
    const blue = Java.valueToCode(block, 'BLUE', Java.ORDER_NONE) || 0;
    const functionName = Java.provideFunction_('colourRgb', [
        'public static String ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(double r, double g, double b) {',
        '    r = Math.round(Math.max(Math.min(r, 100), 0) * 2.55);',
        '    g = Math.round(Math.max(Math.min(g, 100), 0) * 2.55);',
        '    b = Math.round(Math.max(Math.min(b, 100), 0) * 2.55);',
        '    return String.format("#%02x%02x%02x", (int) r, (int) g, (int) b);', '}'
    ]);
    const r = Java.valueToCode(block, 'RED', Java.ORDER_NONE) || 0;
    const g = Java.valueToCode(block, 'GREEN', Java.ORDER_NONE) || 0;
    const b = Java.valueToCode(block, 'BLUE', Java.ORDER_NONE) || 0;
    const code = functionName + '(' + r + ', ' + g + ', ' + b + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['colour_blend'] = function (block) {
    // Blend two colours together.
    const functionName = Java.provideFunction_('colour_blend', [
        'public static String ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(String c1, String c2, double ratio) {',
        '    int r = 0;',
        '    int g = 0;',
        '    int b = 0;',
        '    try {',
        '        ratio = Math.max(Math.min(ratio, 1), 0);',
        '        int r1 = Integer.parseInt(c1.substring(1, 3), 16);',
        '        int g1 = Integer.parseInt(c1.substring(3, 5), 16);',
        '        int b1 = Integer.parseInt(c1.substring(5, 7), 16);',
        '        int r2 = Integer.parseInt(c2.substring(1, 3), 16);',
        '        int g2 = Integer.parseInt(c2.substring(3, 5), 16);',
        '        int b2 = Integer.parseInt(c2.substring(5, 7), 16);',
        '        r = (int) Math.round(r1 * (1 - ratio) + r2 * ratio);',
        '        g = (int) Math.round(g1 * (1 - ratio) + g2 * ratio);',
        '        b = (int) Math.round(b1 * (1 - ratio) + b2 * ratio);',
        '    } catch (Exception e) {',
        '        //',
        '    }',
        '    return String.format("#%02x%02x%02x", r, g, b);'
    ]);
    const colour1 = Java.valueToCode(block, 'COLOUR1', Java.ORDER_NONE) || '\"#000000\"';
    const colour2 = Java.valueToCode(block, 'COLOUR2', Java.ORDER_NONE) || '\"#000000\"';
    const ratio = Java.valueToCode(block, 'RATIO', Java.ORDER_NONE) || 0;
    const code = functionName + '(' + colour1 + ', ' + colour2 + ', ' + ratio + ')';
    return [code, Java.ORDER_FUNCTION_CALL];
};
