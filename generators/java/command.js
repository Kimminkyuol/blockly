'use strict';

goog.module('Blockly.Java.command');

const Java = goog.require('Blockly.Java');

Java['command'] = function (block) {
    Java.definitions_['import_Command'] = 'import org.bukkit.command.Command;';
    Java.definitions_['import_CommandSender'] = 'import org.bukkit.command.CommandSender;';
    const branch = Java.statementToCode(block, 'DO');
    let code =
        '@Override\n' +
        'public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {\n' +
        branch +
        '    return true;\n' + '}';
    code = Java.scrub_(block, code);
    Java.definitions_['%onCommand'] = code;
    return null;
};

Java['command_player'] = function () {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    return ['(Player) sender', Java.ORDER_NONE];
};

Java['command_get'] = function () {
    return ['sender', Java.ORDER_NONE];
};

Java['command_arg'] = function (block) {
    const index = Java.valueToCode(block, 'INDEX', Java.ORDER_NONE) || '0';
    return ['args[' + index + ']', Java.ORDER_NONE];
};

Java['command_args_length'] = function () {
    return ['args.length', Java.ORDER_NONE];
};

Java['command_has_args'] = function () {
    return ['(args.length > 0)', Java.ORDER_NONE];
};

Java['command_check_sender_is_player'] = function () {
    Java.definitions_['import_Player'] = 'import org.bukkit.entity.Player;';
    return ['(sender instanceof Player)', Java.ORDER_NONE];
};
