import {Router} from 'express';
import { favEliminar, favget, favlistarId, favListarU, favPeliTitulo, favpost } from '../controllers/favoritos.js';
import { check } from 'express-validator';
import HelperUsuario from '../helpser/usuarios.js';
import HelperPelicula from '../helpser/peliculas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarMongoIdN } from '../middlewares/validar-mongoid.js';
import { validarJWT } from '../middlewares/Validarjwt.js';
import HelperFav from '../helpser/favoritos.js';
const router =Router()

router.post("/",[
    validarJWT,
    check('usuario',"El usuario debe ser obligatorio").not().isEmpty(),
    check('usuario',"Usuario no existe").isMongoId(),
    check('usuario').custom(HelperUsuario.existeUsuario),
    check('pelicula',"La pelicula debe ser obligatoria").not().isEmpty(),
    check('pelicula',"pelicula no existe").isMongoId(),
    check('pelicula').custom(HelperPelicula.existePeliculas),
    validarCampos
],favpost)

router.get("/",[
    validarJWT,
],favget)

router.get("/listarU/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperUsuario.existeUsuario),
    validarCampos
],favListarU)

router.get("/listarId/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperFav.existeFav),
    validarCampos
],favlistarId)

router.get("/buscarTituloP/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperPelicula.existePeliculas),
    validarCampos
],favPeliTitulo)

router.delete("/:id",[
    validarJWT,
    check('id').custom(validarMongoIdN),
    check('id').custom(HelperFav.existeFav),
    validarCampos
],favEliminar)

export default router