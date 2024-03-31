import express from 'express'
const router = express.Router();

import { getLabs, createLabs, updateLab, deleteLab, searchLabs,getLabById, getPaginatedData } from '../controller/lab.js';

router.route('/').get(getLabs).post(createLabs).get(getPaginatedData)
router.route('/search').get(searchLabs)
router.route('/:id').patch(updateLab).delete(deleteLab).get(getLabById)


export default router;