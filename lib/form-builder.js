var ect = require('ect');

var PackageRoot = __dirname + '/..';
var templateRoot = PackageRoot + '/templates' ;

var renderer = new ect({ root: templateRoot, ext: '.html' });

function getType( args ){
    return args.__proto__.constructor.name;
}

function Field ( name, args ){
    var argType =  getType(args) ;
    switch ( argType) {
        case 'String':
            args = { type: 'string' };
            break;
        case 'Array':
            args = { value: new Schema( args[0] ) };
            args.type = 'array';
            args.value.prefix = name + '[<%- @ %>].';
            break;

    }

    this.type = args.type;
    this.name = name;
    this.id = args.id || 'id-' + this.name;
    this.value = args.value ;
    this.placeholder = args.placeholder || '';
    this.helpText = args.helpText || 'Enter ' + this.name;
    this.__defineGetter__('prefix', function(){
        if ( this.schema ) return this.schema.prefix;
        return '';
    });
    this.options = args.options;
}

exports.Field = Field;


function Schema ( args ){
    var schema = this;
    schema.prefix = args.$prefix || '';
    var fields = [];
    Object.keys( args ).forEach( function(k){
        if (k[0] == '$' ) return;
        var field =  new Field(k, args[k] );
        fields.push( field );
        field.schema = schema;
    });
    schema.fields = fields;
}

exports.Schema = Schema;


function render(data) {
    var schema = new Schema( data );
    return renderer.render('bootstrap3', schema );
}

exports.render = render;

var helpers = {};
exports.helpers = helpers;

helpers.bootstrap3 = render;

/*
 * var addForm = function( elem, name ){
 *     var mainContailner = $(elem.parentNode);
 *     var formNo = mainContailner.find('fieldset').length;
 *     var html = generator[name].call( formNo, {}, {}, {} );
 *     mainContailner.append( html );
 *     return false;
 * }
 */

