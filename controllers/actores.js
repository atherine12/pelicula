import Actores from "../models/actores.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpser/subir-archivo.js";

const actorPost=async(req, res)=>{ 
    const{nombre,observaciones}=req.body
    const actor=new Actores({nombre,observaciones})
    await actor.save()
    res.json({
        "msg":" Felicidades actor agregado"
    })
}

const actorGet=async(req, res)=>{
    const actor=await Actores.find()
    res.json({actor})
}

const actorBuscar=async(req, res)=>{
    const {nombre}=req.query;
    const actor=await Actores.find({nombre})
    res.json({actor})
}

const actorBuscarId=async(req, res)=>{
    const {id}=req.params;
    const idActor=await Actores.findById(id)
    res.json({idActor})
}

const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let actor = await Actores.findById(id)
        if (actor.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', actor.foto);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta la Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const fotoPut=async(req, res)=>{
    const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            
            let actor = await Actores.findById(id);
            
            if (actor.foto) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', actor.foto);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
                
            }
           
            actor= await Actores.findByIdAndUpdate(id, { foto: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
}

const editarPut=async(req, res)=>{
    const {nombre,observaciones}=req.body
    const {id}=req.params;
    const actorEditar=await Actores.findByIdAndUpdate(id,{nombre,observaciones})
    res.json({
        "msg":`Los datos fueron modificados con exito`
    })
}

const actorBorrarId=async(req, res)=>{
    const {id}=req.params;
    const idActor=await Actores.findOneAndDelete(id)
    res.json({
        "msg":"Eliminado exitosamente"
    })
}



export{actorPost,actorGet,actorBuscar,actorBuscarId,fotoPut,editarPut,actorBorrarId,mostrarImagen}