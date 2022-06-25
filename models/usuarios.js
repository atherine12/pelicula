import mongoose from "mongoose";


const UsuarioSchema=new mongoose.Schema({
    usuario:{type:String,maxlength:20,required:true},
    nombre:{type:String,maxlength:20,required:true},
    apellido:{type:String,maxlength:20,required:true},
    email:{type:String,maxlength:100,required:true},
    contrasena:{type:String,required:true,minlength:6},
    foto:{type:String},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now()}
});



export default mongoose.model("Usuario",UsuarioSchema);