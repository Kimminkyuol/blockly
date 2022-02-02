'use strict';

goog.module('Blockly.Java.colour');

const Java = goog.require('Blockly.Java');

Java['colour_picker'] = function (block) {
    const code = Java.quote_(block.getFieldValue('COLOUR'));
    return [code, Java.ORDER_ATOMIC];
};

Java['colour_random'] = function (block) {
    const functionName = Java.provideFunction_('colourRandom', [
        'private String ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '    double num = Math.floor(Math.random() * Math.pow(2, 24));',
        '    String str = Double.toHexString(num);',
        '    return \'#\' + str.substring(str.length() - 6)', '}'
    ]);
    const code = functionName + '()';
    return [code, Java.ORDER_FUNCTION_CALL];
};

Java['colour_rgb'] = function (block) {
    const red = Java.valueToCode(block, 'RED', Java.ORDER_NONE) || 0;
    const green = Java.valueToCode(block, 'GREEN', Java.ORDER_NONE) || 0;
    const blue = Java.valueToCode(block, 'BLUE', Java.ORDER_NONE) || 0;
    const functionName = Java.provideFunction_('colourRgb', [
        'private String ' + Java.FUNCTION_NAME_PLACEHOLDER_ + '(double r, double g, double b) {',
        '    double rDou = r * 2.25;',
        '    double gDou = g * 2.25;',
        '    double bDou = b * 2.25;',
        '    String rStr = (\'0\' + Long.toHexString(Math.round(rDou))).substring(1, 3);',
        '    String gStr = (\'0\' + Long.toHexString(Math.round(gDou))).substring(1, 3);',
        '    String bStr = (\'0\' + Long.toHexString(Math.round(bDou))).substring(1, 3);',
        '    return \'#\' + rStr + gStr + bStr;', '}'
    ]);
}
