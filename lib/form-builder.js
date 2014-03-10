var ect = require('ect'),
    fs = require('fs'),
    lingo = require('lingo');

var PackageRoot = __dirname + '/..';
var templateRoot = PackageRoot + '/templates' ;

// var bootstrap3Template = fs.readFile( templateRoot + '/bootstrap3.html', 'utf-8' );
// var templateCollection = {
    // bootstrap3: bootstrap3Template,
// };

var renderer = new ect({ root: templateRoot, ext: '.html' });

exports.render = function( schema ){
    var out = {};
    out.lingo = lingo;
    out.schema = schema;
    return renderer.render('bootstrap3', out);
};

var FieldTypes = {
    'text' : 'text',
    'number' : 'number',
    'boolean' : 'boolean'
};

var FieldTypesMap={
    'string' : FieldTypes.text,
    'text' : FieldTypes.text,
    'number' : FieldTypes.number,
    'boolean' : FieldTypes.boolean
};

var Field = function( name, settings ){
    this.name = name;
    var type = typeof settings == 'string' ? settings : settings.type;
    this.type = FieldTypesMap[ type ];
    this.id = settings.id || 'id-' + name;
    this.description = settings.description;
};

var Schema = function( settings ){
    var schema = this;
    Object.keys( settings ).forEach( function(key){
        var val = settings[key];
        schema[key] = new Field( key, val );
    });
}
exports.Schema = Schema;

var helpers = {};
helpers.bootstrap3 = function ( settings ){
	return exports.render( new Schema(settings) );
}
 
exports.helpers = helpers;
