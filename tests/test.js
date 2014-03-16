var bfb = require('../lib/form-builder.js');
var Schema = bfb.Schema;

var schemaData = {
    name: 'string',
    married: 'boolean',
    age: 'number',
    address: {type: 'text', 'value': 'AKP Nagar, Kannur P.O, Palarivattam '},
    city : {
        type: 'select',
        options: [
            'thrissur',
            'palakkad',
            'eranakulam',
            ]
    }
};

var schema = new Schema( schemaData );
console.log( schema );

var form = bfb.render( schema );
form = '<form role="form"> ' + "\n" + form ;
form = form + "\n" + '</form>';
console.log( form );

