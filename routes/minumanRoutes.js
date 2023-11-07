
const express = require("express");
const minumanController = require("../controller/minuman-controller.js");
const { isAdmin } = require("../middleware/authorization.js");
const { authUser } = require('../middleware/authentication.js');
const router = express.Router();


router.post('/minuman', authUser, isAdmin, minumanController.createNew); 
router.get('/minuman', minumanController.getAll);
router.get('/minuman/:id', minumanController.getById);
router.put('/minuman/:id', authUser, isAdmin, minumanController.update);
router.patch('/minuman/:id', authUser, isAdmin, minumanController.updateStatus);
router.delete('/minuman/:id', authUser, isAdmin, minumanController.deleteData);




module.exports = router
