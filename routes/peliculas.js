import {Router} from 'express';
import { check } from 'express-validator';
import { actorBuscarGet, buscarpeliGet, eliminarPeli, idGetPeli, modificarPut, mostrarImagen, peliculasGet, peliculasPost, posterPut } from '../controllers/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarMongoId, validarMongoIdN} from '../middlewares/validar-mongoid.js';
import { validarJWT } from '../middlewares/Validarjwt.js';
import validarExistaArchivo from'../middlewares/validar-exista-archivo.js'
import HelperPelicula from"../helpser/peliculas.js";
const routes =Router()

routes.post("/",[
    validarJWT,
    check('titulo',"El titulo siempre es obligatorio").not().isEmpty(),
    check('titulo',"El titulo tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('subtitulo',"El subtitulo tiene que tener menos de 40 caracteres").isLength({max:40}),
    check('fecha',"La fecha debe ser obligatoria").not().isEmpty(),
    check('descripcion',"La descripcion siempre es obligatoria").not().isEmpty(),
    check('genero',"El genero es obligatorio").not().isEmpty(),
    check('genero',"El genero tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('duracion',"La duracion debe ser obligatoria").not().isEmpty(),
    check('reparto').custom(validarMongoId),
    validarCampos
],peliculasPost);

routes.get("/",peliculasGet);

routes.get("/buscar",[
    check('titulo',"El titulo siempre es obligatorio").not().isEmpty(),
    validarCampos
],buscarpeliGet);

routes.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelperPelicula.existePeliculas), 
    validarCampos   
],mostrarImagen)

routes.get("/buscarID/:id",[
    check('id').isMongoId(),
    check('id').custom(HelperPelicula.existePeliculas),
    validarCampos
],idGetPeli);

routes.get("/BuscarActorId/:id",[
    check('id').isMongoId(),
    validarCampos
],actorBuscarGet);

routes.put("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperPelicula.existePeliculas),
    validarExistaArchivo,
    validarCampos
],posterPut);

routes.put("/editar/:id",[
    validarJWT,
    check('titulo',"El titulo debe ser obligatorio").not().isEmpty(),
    check('titulo',"El titulo tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('subtitulo',"El subtitulo tiene que tener menos de 40 caracteres").isLength({max:40}),
    check('fecha',"La fecha debe ser obligatorioa").not().isEmpty(),
    check('descripcion',"La descripcion es obligatorioa").not().isEmpty(),
    check('genero',"El genero es obligatorio").not().isEmpty(),
    check('genero',"El genero tiene que tener menos de 20 caracteres").isLength({max:20}),
    check('duracion',"La duracion siempre es obligatoria").not().isEmpty(),
    check('reparto').custom(validarMongoId),
    validarCampos
],modificarPut);

routes.delete('/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperPelicula.existePeliculas),
    validarCampos
],eliminarPeli)

export default routes;