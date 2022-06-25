import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    titulo:{type:String,maxlength:20,required:true},
    subtitulo:{type:String,maxlength:40},
    fecha:{type:Date,required:true},
    descripcion:{type:String,required:true},
    genero:{type:String,maxlength:20,required:true},
    duracion:{type:String,required:true},
    calificacion:{type:Number},
    imagen:{type:String},
    reparto:[
        {idactor:{type:mongoose.Schema.ObjectId,ref:"Actores",required:true},
        personaje:{type:String,required:true}
        }
    ],
    createdAt:{type:Date,default:Date.now()}
})



export default mongoose.model("pelicula",PersonSchema)