import Comen from "../models/comentarios.js";

const HelperComen={
    existeComen:async(id)=>{
        const existe =await Comen.findById(id)
        if(! existe) throw new Error("Id no existe en la bd")
    },
}


export default HelperComen