import Peliculas from "../models/peliculas.js";

const HelperPelicula={
    existePeliculas:async(id)=>{
        const existe =await Peliculas.findById(id)
        if(! existe) throw new Error("Pelicula no existe en la bd")
    },
    
    existePeliculasPorTitulo:async(titulo)=>{
        const existe =await Peliculas.findById(titulo)
        if(! existe) throw new Error("Pelicula no existe👎")
    },
}


export default HelperPelicula
