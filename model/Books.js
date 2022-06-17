const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: false
    },
    _id: Number
}, { _id: false })

bookSchema.plugin(AutoIncrement);

/* var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});
 */
module.exports = mongoose.model('Data', bookSchema)