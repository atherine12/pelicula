import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import pelicula from "../routes/peliculas.js";
import usuario from "../routes/usuarios.js";
import favoritos from "../routes/favoritos.js";
import actores from "../routes/actores.js"
import comentarios from "../routes/comentarios.js"
import fileupload from "express-fileupload"

class Server{
    constructor(){
        this.app=express();
        this.middlewares();
        this.port=process.env.PORT;
        this.connectarbd()
        this.routes() 
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        // this.app.use(express.static())
        this.app.use(fileupload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    async connectarbd(){
        await dbConnection()
    }

    routes(){
        this.app.use("/api/peliculas",pelicula)
        this.app.use("/api/usuario",usuario)
        this.app.use("/api/favoritos",favoritos)
        this.app.use("/api/actores",actores)
        this.app.use("/api/comentarios",comentarios)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default Server