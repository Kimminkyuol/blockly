'use strict'

goog.module('Blockly.Java')
goog.module.declareLegacyNamespace()

const objectUtils = goog.require('Blockly.utils.object');
const stringUtils = goog.require('Blockly.utils.string');
const Variables = goog.require('Blockly.Variables');
const {Generator} = goog.require('Blockly.Generator');
const {inputTypes} = goog.require('Blockly.inputTypes');
const {Names, NameType} = goog.require('Blockly.Names');

const Java = new Generator('Java')

Java.addReservedWords(
    'abstract,assert,boolean,break,case,catch,class,const,continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while,' +
    'false,null,true,' +
    'abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,coerce,dir,id,oct,sorted,intern,equal');

Java.ORDER_ATOMIC = 0;            // 0 "" ...
Java.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Java.ORDER_STRING_CONVERSION = 1; // `expression...`
Java.ORDER_MEMBER = 2;            // . []
Java.ORDER_FUNCTION_CALL = 2;     // ()
Java.ORDER_POSTFIX = 3;           // expr++ expr--
Java.ORDER_EXPONENTIATION = 3;    // **
Java.ORDER_LOGICAL_NOT = 3;       // not
Java.ORDER_UNARY_SIGN = 4;        // ++expr --expr +expr -expr ~ !
Java.ORDER_MULTIPLICATIVE = 5;    // * / %
Java.ORDER_ADDITIVE = 6;          // + -
Java.ORDER_BITWISE_SHIFT = 7;     // << >> >>>
Java.ORDER_RELATIONAL = 8;        // < > <= >= instanceof
Java.ORDER_EQUALITY = 9;          // == !=
Java.ORDER_BITWISE_AND = 10;      // &
Java.ORDER_BITWISE_XOR = 11;      // ^
Java.ORDER_BITWISE_OR = 12;       // |
Java.ORDER_LOGICAL_AND = 13;      // &&
Java.ORDER_LOGICAL_OR = 14;       // ||
Java.ORDER_CONDITIONAL = 15;      // ? :
Java.ORDER_ASSIGNMENT = 16;       // = += -= *= /= %= &= ^= |= <<= >>= >>>=
Java.ORDER_NONE = 99;             // (...)

Java.ORDER_OVERRIDES = [
    // (foo()).bar -> foo().bar
    // (foo())[0] -> foo()[0]
    [Java.ORDER_FUNCTION_CALL, Java.ORDER_MEMBER],
    // (foo())() -> foo()()
    [Java.ORDER_FUNCTION_CALL, Java.ORDER_FUNCTION_CALL],
    // (foo.bar).baz -> foo.bar.baz
    // (foo.bar)[0] -> foo.bar[0]
    // (foo[0]).bar -> foo[0].bar
    // (foo[0])[1] -> foo[0][1]
    [Java.ORDER_MEMBER, Java.ORDER_MEMBER],
    // (foo.bar)() -> foo.bar()
    // (foo[0])() -> foo[0]()
    [Java.ORDER_MEMBER, Java.ORDER_FUNCTION_CALL],

    // !(!foo) -> !!foo
    [Java.ORDER_LOGICAL_NOT, Java.ORDER_LOGICAL_NOT],
    // a && (b && c) -> a && b && c
    [Java.ORDER_LOGICAL_AND, Java.ORDER_LOGICAL_AND],
    // a || (b || c) -> a || b || c
    [Java.ORDER_LOGICAL_OR, Java.ORDER_LOGICAL_OR]
];

Java.isInitialized = false;

Java.init = function (workspace) {
    Object.getPrototypeOf(this).init.call(this);

    if (!this.nameDB_) {
        this.nameDB_ = new Names(this.RESERVED_WORDS_);
    } else {
        this.nameDB_.reset();
    }

    this.nameDB_.setVariableMap(workspace.getVariableMap());
    this.nameDB_.populateVariables(workspace);
    this.nameDB_.populateProcedures(workspace);

    const defVars = []
    const devVarList = Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
        defVars.push('Object' + this.nameDB_.getName(devVarList[i], NameType.VARIABLE) + ';');
    }

    if (defVars.length) {
        this.definitions_['variables'] = defVars.join('\n');
    }
    this.isInitialized = true;
};

Java.finish = function (code) {
    const imports = [];
    const definitions = [];
    for (let name in this.definitions_) {
        const def = this.definitions_[name];
        if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }
    code = Object.getPrototypeOf(this).finish.call(this, code);
    this.isInitialized = false;

    this.nameDB_.reset();
    const allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

Java.scrubNakedValue = function (line) {
    return line + ';\n';
};

Java.quote_ = function (string) {
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

Java.multiline_quote_ = function (string) {
    const lines = string.split(/\n/g).map(this.quote_);
    return lines.join(' + \'\\n\' +\n');
};

Java.scrub_ = function (block, code, opt_thisOnly) {
    let commentCode = '';
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        let comment = block.getCommentText();
        if (comment) {
            comment = stringUtils.wrap(comment, this.COMMENT_WRAP - 3);
            commentCode += this.prefixLines(comment + '\n', '// ');
        }
        for (let i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type === inputTypes.VALUE) {
                const childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    comment = this.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += this.prefixLines(commentCode, '// ');
                    }
                }
            }
        }
    }
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

Java.getAdjustedInt = function (block, atId, opt_delta, opt_negate) {
    let delta = opt_delta || 0;
    const atOrder = delta ? this.ORDER_ADDITIVE : this.ORDER_NONE;
    let at = this.valueToCode(block, atId, atOrder) || '0';

    if (stringUtils.isNumber(at)) {
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at
        }
    } else {
        if (delta > 0) {
            at = '((Number) ' + at + ').intValue() + ' + delta + '';
        } else if (delta < 0) {
            at = '((Number) ' + at + ').intValue() - ' + -delta + ')';
        } else {
            at = '((Number) ' + at + ').intValue()';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
};

Java.getAdjustedDouble = function (block, atId, opt_delta, opt_negate) {
    let delta = opt_delta || 0;
    const atOrder = delta ? this.ORDER_ADDITIVE : this.ORDER_NONE;
    let at = this.valueToCode(block, atId, atOrder) || '1.0';

    if (stringUtils.isNumber(at)) {
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at
        }
    } else {
        if (delta > 0) {
            at = '((Number) ' + at + ').doubleValue() + ' + delta + '';
        } else if (delta < 0) {
            at = '((Number) ' + at + ').doubleValue() - ' + -delta + ')';
        } else {
            at = '((Number) ' + at + ').doubleValue()';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
};

exports = Java;
