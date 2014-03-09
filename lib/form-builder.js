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
};
var FieldTypesMap={
    'string' : FieldTypes.text,
    'text' : FieldTypes.text,
};

var Field = function( name, settings ){
    this.name = name;
    var type = typeof settings == 'function' ? settings.name.toLowerCase() : settings.type;
    this.type = FieldTypesMap[ type ];
    this.id = settings.id || 'id-' + name;
    this.description = settings.description;
};

exports.Schema = function( settings ){
    var schema = this;
    Object.keys( settings ).forEach( function(key){
        console.log( key );
        var val = settings[key];
        schema[key] = new Field( key, val );
    });
}

var helpers = {};
function genHelper( settings ){
	return exports.render( new Schema(settings) );
}
helpers.bootstrap3 = toHelper( settings );

