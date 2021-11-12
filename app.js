const mongoose = require('mongoose')
const chalk = require('chalk')
const DB = 'mongoose-example'  //creem una variable que utilitzarem abaix. 'mongoose-example' serà el nom de la BBDD de MongoDB

//Middleware for the view engine
// app.set("views", __dirname + "/views");
// app.set("view engine", "hbs");

//Models
const Student = require('./models/Student.js')
const { truncate } = require('fs/promises')


const connectToMongo = async()=>{
  try {

   await mongoose.connect(`mongodb://localhost:27017/${DB}`, {  //aquesta adreça sempre és la mateixa. És per conectar-nos a la BBDD
      useNewUrlParser: true,
      useUnifiedTopology: true,  //aquestes 2 línies tb són sempre iguals. Són el segon paràmetre de la funció. Si no funciona, ho borrem.
    })
    
    console.log(chalk.bgBlue('Conectado a Mongo'))

  } catch(err){
    console.log('Error:', err)
  }
}

connectToMongo()

//CREATE----------------------------------------------------------------------------CREATE----
//Creem un nou document (estudiant). Un cop creat i que el veiem a la consola, ho comentem (si no ho comentem, com que el nodemon es va actualitzant tota l'estona, ens anirà duplicant l'estudiant a la base de dades)

const createStudent = async()=>{  
    try{
      const student = await Student.create({
        name: 'Pere',
        lastName: 'Garrocho',
        age: 11,
        grades: [4, 5, 6, 6, 7, 8, 9],
        class: 'A',
        pendingBills: false
      })
      console.log(student)
    }catch(err){
      console.log('ERROR: ', err)
    }
  
  }
  
//   createStudent()



//READ--------------------------------------------------------------------------------READ----
//Podem utilitzar:
  //.find()
  //.findOne()
  //.findById()


//.find() només em dóna 1 resultat. Serveix bàsicament per buscar el _id. Si lo hacemos con este método, en el primer argumento recibe el FILTER y en el segundo el PROJECT. explicació JJ --> //2.1. .find(filter, project) --> Este metodo nos sirve para buscar todos los documentos sobre un modelo determinado que cumplan a condición que le pasamos por el filter (primer argumento)

const findStudent = async ()=>{
    try{
      const students = await Student.find({age: 37}, {name: 1, lastName: 1}, {sort: {lastName: 1}, limit: 20}))
       //Encuentra a todos los alumnos que tengan 37 años, y devuelve solo su nombre y apellido (y el _id que ya viene por defecto) de los primeros 20 alumnos (ordenados por orden alfabético según su apellido) Primer algumento el FILTER, segundo el PROJECT, y tercero TODODS los demás.
      console.log(students)
    }catch(err){
      console.log('ERROR: ', err)
    }
  }
  
  // findStudent()  //comento funció


//2.2. .findById(id) --> Este metodo te permite buscar un documento por su _id
const findStudentById = async (id)=>{
    try{
      const student = await Student.findById(id)  //Encuentra al alumno que tenga el id asociado que le hemos pasado como argumento
      console.log(student)
    }catch(err){
      console.log('ERROR: ', err)
    }
    
  }
// 


//UPDATE --------------------------------------------------------------------------UPDATE-----

//findOneAndUpdate() al primer argument posem un key xq trobi el document que volem canviar, i al segon hi posem el valor a modificar. si en volem modificar més d'1 ho anem posant entre {} i separats per ,
//Posar {new: true} xq em retorni l'estudiant actualitzat 
//explicació JJ ---> .findOneAndUpdate(<target>, <elementos que quiero cambiar>, {new: true}) --> Este metodo nos va a buscar un documento (target) y lo va a editar según los elementos que hayamos pasado en el segundo argumento (dentro de un objeto literal)

const updateStudent = async ()=>{
    try{
      const student = await Student.findOneAndUpdate(
        {name: 'Guillem'}, 
        // {pendingBills: true, lastName: "Ferretina"}, //exemple per actualitzar aquestes KEYS. comento xq sinó no em canvia el següent
        {"grades.3": 10}, //Para acceder a un array dentro de Mongo, hay que hacerlo con un . y poner todo el query entre comillas
        {new: true} //Esto hay que ponerlo para ver el documenot después de haber sido actualizado. Si no ponemos esto, vamos a ver el documento antes de haber sido actualizado.
      ) // Encuentra al primer alumno que se llame Guillem y cambia su primera nota (grades) a 10
      console.log(student)
    }catch(err){
      console.log('error: ', err)
    }
  }
  
//   updateStudent()
  
//3.2. updateMany(<target>, <elementos que quiero cambiar>) --> Actualiza uno o mas elementos que cumplan los requisitos que le pongas en el target

const updateSomeStudents = async ()=>{
    try{
      const response = await Student.updateMany({age: 9}, {age: 15}) //Cambia la edad de todos los alumnos que tengan 9 años a 15 años

      //const response = await Student.updateMany({idioma: {$exists: false}}, {idioma: "NA"}) //Añade el campo de idioma a todos los alumnos que no tuvieran el campo de idioma (y ponles el valor de NA) esto es un ejemplo para añadir un KEY. Previamente hemos ido a Student.js y hemos añadido el KEY

      console.log(response)
    }catch(err){
      console.log("ERROR: ", err)
    }
  }
  
//   updateSomeStudents()
  

  
//3.3 findByIdAndUpdate(id, <elementos a actualizar>, {new: true}) --> Este método funciona solo con _id. Te busca el documento que tenga ese _id único y lo actualiza con las propiedades que hayas definido en el objeto literal del segundo argumento.

  const updateStudentById = async (id)=>{
    try{
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {age: 5},
        {new: true} //Encuentra al alunno que tenga el id que le hemos pasado a la función como argumento y actualiza su edad a 5
      )
  
      console.log(updatedStudent)
    }catch(err){
      console.log(err)
    }
  }
  
//   updateStudentById("618e45609069081e8a2911dd") //aquí he posat la _id del Bernat




//4. DELETE------------OJO!! borrem tot un document----------------------------DELETE--------

// 4.1 .findOneAndDelete()

const deleteOneStudent = async ()=>{
    try{
      const response = await Student.findOneAndDelete({name: "Andrea"}) //Elimina al primer alumno que encuentres que se llame Andrea
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
  
  // deleteOneStudent()
  
  
  // 4.2 .deleteMany()
  const deleteManyStudents = async ()=>{
    try{
      const response = await Student.deleteMany({name: "Andrea"}) //Elimina a todos los alumnos que se llaman Andrea
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
  
  // deleteManyStudents()
  
  
  // 4.3 .findByIdAndDelete()
  
  const deleteStudentById = async (id)=>{
    try{
      const deletedStudent = await Student.findByIdAndDelete(id, {new: true})
      console.log(deletedStudent)
    }catch(err){
      console.log(err)
    }
  }
  
//   deleteStudentById("618e42f5061995ffab4f2a31")