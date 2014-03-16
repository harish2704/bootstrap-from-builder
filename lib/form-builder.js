function getType( obj ){
    return obj.__proto__.constructor.name;
};

var ect = require('ect'),
    fs = require('fs'),
    lingo = require('lingo');

var PackageRoot = __dirname + '/..';
var templateRoot = PackageRoot + '/templates' ;

var renderer = new ect({ root: templateRoot, ext: '.html' });

exports.render = function( schema ){
    var out = {};
    out.lingo = lingo;
    out.schema = schema;
    // try{
    var text = renderer.render('bootstrap3', out);
    return text;
    // } catch( e ){
        // console.log( Object.keys( e ) );
        // console.log( e.stack );
        // console.log( e.code );
        // return null;
    // }

};


var Field = function( name, settings ){
    this.name = name;
    function getFieldType( settings ){
        var type;
        switch ( getType( settings ) ) {
            case 'String':
                type = settings;
                break;
            case 'Object':
                type = settings.type;
                break;
            case 'Array':
                var s = settings[0];
                type = getFieldType( s );
                break;
            default:
                throw new Error('Unknown field type ' + settings );
        }
        return type;
    }
    this.type = getFieldType( settings );
    this.id = settings.id || 'id-' + name;
    this.description = settings.description;
    this.options = settings.options;
    this.value = settings.value;
};

var Schema = function( settings ){
    var schema = this;
    Object.keys( settings ).forEach( function(key){
        var val = settings[key];
        schema[key] = new Field( key, val );
    });
};

exports.Schema = Schema;

var helpers = {};
helpers.bootstrap3 = function ( settings ){
	return exports.render( new Schema(settings) );
};
 
exports.helpers = helpers;
