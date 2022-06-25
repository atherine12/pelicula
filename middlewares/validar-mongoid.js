
import mongoose from "mongoose";
import HelperActores from "../helpser/actores.js";



const validarMongoId = async(reparto) => {
  if (reparto.length > 0) {
    for (let i = 0; i < reparto.length; i++) {
      const element = reparto[i].idactor;
      const valido =  mongoose.Types.ObjectId.isValid(element);
      if (!valido) {
        throw new Error("id no es valido" );
      }
      const xx=await HelperActores.existeActores(element)
      if (xx) {
        throw new Error("id no es existe" );
      }
    }
  }
};

const validarMongoIdN=async(id) => {
  const validar= mongoose.Types.ObjectId.isValid(id);
  if(!validar) {
    throw new Error("id no es valido")
  }
}

export {validarMongoId,validarMongoIdN}
