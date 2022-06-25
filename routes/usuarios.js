import {Router} from 'express';
import { activarPut, buscarUsuario, desactivarPut, editarUsuarioDenuestraapiPeliculasPutAloJholman, fotoPut, listarId, listarUsuarios, usuarioLogin, usuarioPost, mostrarImagen } from '../controllers/usuarios.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';
import { validarJWT } from '../middlewares/Validarjwt.js';
import validarExistaArchivo from '../middlewares/validar-exista-archivo.js';

const router=Router();
router.post("/",[
    check('usuario',"El usuario debe ser obligatorio").not().isEmpty(),
    check('usuario',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('nombre',"El nombre siempre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('apellido',"El apellido siempre es obligatorio").not().isEmpty(),
    check('apellido',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('email',"El email es obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(HelperUsuario.existeEmail),
    check('contrasena',"El contrasena es obligatorio").not().isEmpty(),
    check('contrasena',"Debe tener mas de 6 caracteres").isLength({min:6}),
    validarCampos
],usuarioPost);

router.get("/",[
    check('email').custom(HelperUsuario.noexisteEmail),
    check('email',"No es un email valido").isEmail(),
    validarCampos
], usuarioLogin);

router.get("/listar",listarUsuarios);

router.get("/listarID/:id",[
    check('id').isMongoId(),
    validarCampos
],listarId);

router.get("/buscarU",buscarUsuario);

router.put("/:id",[
    validarJWT,
    check("id").isMongoId(),
    check('id').custom(HelperUsuario.existeUsuario),
    validarExistaArchivo,
    validarCampos
],fotoPut);

router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelperUsuario.existeUsuario), 
    validarCampos   
],mostrarImagen)

    
router.put('/editar/:id',[
    validarJWT,
    check("id").isMongoId(),
    check('id').custom(HelperUsuario.existeUsuario),
    check('usuario',"El usuario es obligatorio").not().isEmpty(),
    check('usuario',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('nombre',"El nombre debe ser obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('apellido',"El apellido es obligatorio").not().isEmpty(),
    check('apellido',"Debe tener menos de 20 caracteres").isLength({max:20}),
    check('email',"El email es obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(HelperUsuario.existeEmail),
    check('contrasena',"El contrasena es obligatorio").not().isEmpty(),
    check('contrasena',"Debe tener mas de 6 caracteres").isLength({min:6}),
    validarCampos
],editarUsuarioDenuestraapiPeliculasPutAloJholman)

router.put('/activar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperUsuario.existeUsuario),
    validarCampos
],activarPut)

router.put('/desactivar/:id',[
    validarJWT,
    check('id').custom(validarMongoIdN),
    check('id').custom(HelperUsuario.existeUsuario),
    validarCampos
],desactivarPut)

export default router;