const express = require('express');

const router = express.Router();
const { getAllUsers, getDetailUser, updateUser, getAllRole } = require('../../../controllers/v1/admin/user.controller');

router.get('/', getAllUsers);
router.get('/:id', getDetailUser);
router.put('/:id', updateUser);


router.get('/role/getAll', getAllRole)
module.exports = router;