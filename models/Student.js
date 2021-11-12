const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {type: String, required: true}, //required: true fa que sigui un camp obligatori
    lastName: {type: String, required: true},
    age: {type: Number, required: true, max: 99},  //max: xx  el valor màxim que es pot passar. Tb hi ha el maxlength, utilitzat x ex pel ´num màxim de caracters que pot tenir una contrasenya (o el minlength)
    grades: {type: Array},
    class: {type: String, enum: ["A", "B"]}, //enum serveix per posar les opcions que pot seleccionar l'usuari. Aquí x ex posem que pot ser la classe A o B.
    pendingBills: {type: Boolean, default: false} //default: false fa que de base ja surti false
    idioma: {type: String, enum: ["ingles", "español", "NA"]}

  }, {versionKey: false, timestamps: true}) //el versionKey: false millor posar-lo sempre. timestamp fa que et doni la dada de quan s'ha creat el document (i actualitzat tb)
  
  module.exports = mongoose.model('Student', studentSchema)