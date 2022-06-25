import Fav from "../models/favoritos.js";

const HelperFav={
    existeFav:async(id)=>{
        const existe =await Fav.findById(id)
        if(! existe) throw new Error("Id no existe en la bd")
    },
}


export default HelperFav