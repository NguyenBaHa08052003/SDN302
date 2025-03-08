const express = require('express');

const router = express.Router();
const { getAllUsers, getDetailUser, updateUser, getAllRole, addUser, verifyAccount } = require('../../../controllers/v1/admin/user.controller');
const authMiddleware = require('../../../middlewares/auth/v1/auth.middleware');

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getDetailUser);
router.put('/:id', authMiddleware, updateUser);

router.post('/addUser', authMiddleware, addUser)
router.get('/verify-account/:id', verifyAccount)

router.get('/role/getAll', authMiddleware, getAllRole)
module.exports = router;