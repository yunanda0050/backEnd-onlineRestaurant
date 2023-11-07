
const express = require("express");
const pesananController = require("../controller/pesanan-controller.js");
const { isUserOwnPesananAuth } = require("../middleware/authorization.js");
//const { isAdmin } = require("../middleware/authorization.js");
const { authUser } = require('../middleware/authentication.js');
const router = express.Router();


router.post('/pesanan', authUser, pesananController.createNew);
router.get('/pesanan', authUser, pesananController.getAll);
router.get('/pesanan/:id', authUser, pesananController.getById);
router.put('/pesanan/:id', authUser, isUserOwnPesananAuth, pesananController.update);
router.delete('/pesanan/:id', authUser, isUserOwnPesananAuth, pesananController.deleteData);





module.exports = router