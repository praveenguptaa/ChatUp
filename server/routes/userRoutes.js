const { register, login, setAvatar, getAllUsers, firebaseLogin, checkUsername } = require('../controllers/userController');

const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/firebaseLogin",firebaseLogin);
router.post("/checkUsername",checkUsername);
router.post("/setAvatar/:id",setAvatar);
router.get("/allUsers/:id",getAllUsers)

module.exports = router;