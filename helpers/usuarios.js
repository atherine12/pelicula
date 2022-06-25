import Usuarios from "../models/usuarios.js";

const HelperUsuario={
    existeEmail:async(email)=>{
        if(email){
            const existe=await Usuarios.findOne({email})
            if(existe) throw new Error("Correo existente en la Bd")
        }
    },
    
    existeUsuario:async(id)=>{
        const existe =await Usuarios.findById(id)
        if(! existe) throw new Error("Usuario no existe en la bd")
    },
    noexisteEmail:async(email)=>{
        if(email){
            const existe=await Usuarios.findOne({email})
            if(!existe) throw new Error("Correo no existe Bd")
        }
    },
}



export default HelperUsuario