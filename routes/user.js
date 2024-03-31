import express from 'express';
const router = express.Router();

import { getUsers, createUsers, updateUser, deleteUser, loginUser, logoutUser } from '../controller/user.js'

router.route('/').get(getUsers).post(createUsers)
router.route('/:id').patch(updateUser).delete(deleteUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

export default router; 
