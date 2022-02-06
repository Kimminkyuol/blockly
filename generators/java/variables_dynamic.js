'use strict';

goog.module('Blockly.Java.variablesDynamic');

const Java = goog.require('Blockly.Java');
goog.require('Blockly.Java.variables');

// Java is dynamically typed.
Java['variables_get_dynamic'] = Java['variables_get'];
Java['variables_set_dynamic'] = Java['variables_set'];
