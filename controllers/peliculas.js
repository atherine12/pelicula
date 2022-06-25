
import peliculas from "../models/peliculas.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpser/subir-archivo.js";

const peliculasPost=async(req,res)=>{
    const {titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto}=req.body;
    const pelicula=new peliculas({titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto});
    await pelicula.save();

    res.json({
        "msg":"Pelicula creada exitosamente👍👍"
    })
}

const peliculasGet = async(req, res)=>{
    const pelicula=await peliculas
    .find()
    .populate("reparto.idactor",["nombre","foto","observaciones"])
    res.json({
        pelicula
    })
}

const buscarpeliGet=async(req, res)=>{
    const {titulo}=req.query;
    const pelicula=await peliculas.find({titulo})
    res.json({
        pelicula
    })
}

const idGetPeli=async(req, res)=>{
    const {id}=req.params;
    const idPeli=await peliculas.findById(id)
    res.json({idPeli})
}

const actorBuscarGet=async(req, res)=>{
    const {id}=req.params;
    const peli= await peliculas.find().where('reparto.idactor').in(id).exec();
    res.json({peli})
}

const posterPut=async(req, res)=>{
    const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto

            let peli = await peliculas.findById(id);

            //si el usuario ya tiene foto la borramos

            if (peli.imagen) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', peli.imagen);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
                
            }
           
            peli= await peliculas.findByIdAndUpdate(id, { imagen: nombre })
            
            //responder
            
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
}

const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let peli = await peliculas.findById(id)
        if (peli.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', peli.imagen);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}


const modificarPut=async(req, res)=>{
    const {titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto}=req.body
    const {id}=req.params;
    const editar=await peliculas.findByIdAndUpdate(id,{titulo,subtitulo,fecha,descripcion,genero,duracion,calificacion,reparto})
    res.json({
        "msg":"La pelicula fue editada con exito"
    })
}

const eliminarPeli=async(req, res)=>{
    const {id}=req.params;
    const peli=await peliculas.findOneAndDelete({id})
    res.json({
        "msg":"Se elimino exitosamente👎"
    })
}



export {peliculasPost,peliculasGet,mostrarImagen,buscarpeliGet,idGetPeli,actorBuscarGet,posterPut,modificarPut,eliminarPeli}