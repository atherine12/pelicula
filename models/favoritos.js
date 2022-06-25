import mongoose from "mongoose";

const favSchema=new mongoose.Schema({
    usuario:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    pelicula:{type:mongoose.Schema.ObjectId,ref:"pelicula",required:true},
    createdAt:{type:Date,default:Date.now()}
});



export default mongoose.model("favorito",favSchema);