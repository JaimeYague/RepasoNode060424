const mongoose = require('mongoose'); //mongoose es una libreria que te permite modelizar las cosas

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true},

    age: { type: Number },
    weight: { type: Number },
    description: { type: String, required: true }
});

const Character = mongoose.model('Character', characterSchema);

//EXPORTAMOS

module.exports = Character;
