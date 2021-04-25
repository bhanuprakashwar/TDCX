const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        require: true
    }

});
module.exports = mongoose.model('Task', TaskSchema);