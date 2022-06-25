import {Router} from 'express';
import { actorBorrarId, mostrarImagen, actorBuscar, actorBuscarId, actorGet, actorPost, editarPut, fotoPut } from '../controllers/actores.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';
import { validarJWT } from '../middlewares/Validarjwt.js';
import HelperActores from '../helpser/actores.js';
import validarExistaArchivo from '../middlewares/validar-exista-archivo.js';
const router =Router()

router.post('/',[
    validarJWT,
    check('nombre',"El nombre debe ser obligatorio").not().isEmpty(),
    check('nombre',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    validarCampos
],actorPost)

router.get('/',actorGet)

router.get('/buscar',actorBuscar)

router.get('/buscarId/:id',[
    check('id').isMongoId(),
    check('id').custom(HelperActores.existeActores),
    validarCampos
],actorBuscarId)

router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelperActores.existeActores), 
    validarCampos   
],mostrarImagen)

router.put('/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperActores.existeActores),
    validarExistaArchivo,
    validarCampos
],fotoPut)

router.put('/editar/:id',[
    validarJWT,
    check('nombre',"El nombre debe ser obligatorio").not().isEmpty(),
    check('nombre',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check("id").isMongoId(),
    check('id').custom(HelperActores.existeActores),
    validarCampos
],editarPut)

router.delete('/:id',[
    validarJWT,
    check("id").isMongoId(),
    check('id').custom(HelperActores.existeActores),
    validarCampos
],actorBorrarId)
export default router