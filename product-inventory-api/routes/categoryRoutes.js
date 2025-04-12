const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id/products', categoryController.getCategoryWithProducts);
router.get('/summary/analytics', categoryController.getCategorySummary);

module.exports = router;
