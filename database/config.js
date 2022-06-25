import mongoose from "mongoose";

const dbConnection =async()=>{
    try{
        
        await mongoose.connect(process.env.MONGODB_CNX);
        console.log("Base de datos online pelicula");
    }catch (error){
        throw new Error ("Error al iniciar la base de datos")
    } 
    

}

export {dbConnection}