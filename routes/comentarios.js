import {Router} from 'express';
import { buscarC, comentarioGet, comentarioPost, eliminarC, listarCdeP, listarCdeU, listarIdC } from '../controllers/comentarios.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import HelperPelicula from '../helpser/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';
import { validarJWT } from '../middlewares/Validarjwt.js';
import HelperComen from '../helpser/comentario.js';

const router=Router();

router.post('/',[
    validarJWT,
    check('usuario',"El usuario debe ser obligatorio").not().isEmpty(),
    check('usuario',"Usuario no existe").isMongoId(),
    check('usuario').custom(HelperUsuario.existeUsuario),
    check('pelicula',"La pelicula debe ser obligatoria").not().isEmpty(),
    check('pelicula',"Pelicula no existe").isMongoId(),
    check('pelicula').custom(HelperPelicula.existePeliculas),
    validarCampos
],comentarioPost);

router.get('/',comentarioGet);

router.get("/listarCdeU/:id",[
    check('id').isMongoId(),
    check('id').custom(HelperUsuario.existeUsuario),
    validarCampos
],listarCdeU);

router.get("/listarCdeP/:id",[
    check('id').isMongoId(),
    check('id').custom(HelperPelicula.existePeliculas),
    validarCampos
],listarCdeP);

router.get("/listarId/:id",[
    check('id').isMongoId(),
    check('id').custom(HelperComen.existeComen),
    validarCampos
],listarIdC);

router.get("/buscarC",buscarC);

router.delete("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperComen.existeComen),
    validarCampos
],eliminarC);

export default router;