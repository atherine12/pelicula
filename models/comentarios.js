import mongoose from "mongoose";

const ComentariosSchema=new mongoose.Schema({
    usuario:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    pelicula:{type:mongoose.Schema.ObjectId,ref:"pelicula",required:true},
    comentario:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()}
})


export default mongoose.model("Comentarios",ComentariosSchema)