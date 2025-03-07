const express = require('express');

const router = express.Router();
const { getAllUsers, getDetailUser, updateUser } = require('../../../controllers/v1/admin/user.controller');

router.get('/', getAllUsers);
router.get('/:id', getDetailUser);
router.put('/:id', updateUser);

module.exports = router;