import Actores from "../models/actores.js";

const HelperActores={
    existeActores:async(id)=>{
        const existe =await Actores.findById(id)
        if(! existe) throw new Error("Actor no existe en la bd")
    },
    
}


export default HelperActores