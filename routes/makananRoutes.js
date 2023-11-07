
const express = require("express");
const makananController = require("../controller/makanan-controller.js");
const { isAdmin } = require("../middleware/authorization.js");
const { authUser } = require('../middleware/authentication.js');
const router = express.Router();


router.post('/makanan', authUser, isAdmin, makananController.createNew); 
router.get('/makanan', makananController.getAll);
router.get('/makanan/:id', makananController.getById);
router.put('/makanan/:id', authUser, isAdmin, makananController.update);
router.patch('/makanan/:id', authUser, isAdmin, makananController.updateStatus);
router.delete('/makanan/:id', authUser, isAdmin, makananController.deleteData);




module.exports = router
