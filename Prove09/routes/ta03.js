//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const ta03Controller = require('../controllers/ta03.js');

router.get('/', ta03Controller.getProducts);
router.get('/search', ta03Controller.getSearchProducts);
router.get('/first', ta03Controller.getFirstProducts)
router.get('/prev', ta03Controller.getPrevProducts)
router.get('/next', ta03Controller.getNextProducts)
router.get('/last', ta03Controller.getLastProducts)

module.exports = router;