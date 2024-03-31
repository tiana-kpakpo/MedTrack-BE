import express from 'express';
const router = express.Router();

import { getDrugs, uploadDrugs, updateDrug, deleteDrug, getDrugById, getUnitPricing, searchDrugs} from '../controller/drug.js'

router.route('/').get(getDrugs).post(uploadDrugs)
router.route('/unit-pricing').get(getUnitPricing)
router.route('/search').get(searchDrugs)
router.route('/:id').patch(updateDrug).delete(deleteDrug).get(getDrugById)

export default router; 
