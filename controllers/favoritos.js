
import Favo from '../models/favoritos.js';

const favpost=async(req, res)=>{
    const {usuario,pelicula}=req.body;
    const fav=new Favo({usuario,pelicula})
    await fav.save();
    res.json({
        "msg":`Se a añadido la pelicula a favoritos`
    })
}

const favget=async(req, res)=>{
    const fav=await Favo
    .find()
    .populate("usuario","usuario")
    .populate("pelicula",["titulo","imagen"])
    res.json({
        fav
    })
}

const favListarU=async(req, res)=>{
    const {id}=req.params;
    const fav=await Favo.find().where('usuario').in(id).exec();
    res.json({fav})
}

const favlistarId=async(req, res)=>{
    const {id}=req.params;
    const fav=await Favo.findById(id)
    res.json({fav})
}

const favPeliTitulo=async(req, res)=>{
    const{id}=req.params;
    const fav=await Favo.find().where('pelicula').in(id).exec();
    res.json({fav})
}

const favEliminar=async(req, res)=>{
    const{id}=req.params;
    const fav=await Favo.findOneAndDelete(id)
    res.json({
        "msg":"Se he eliminado exitosamente"
    })
}




export{favpost,favget,favListarU,favlistarId,favPeliTitulo,favEliminar}