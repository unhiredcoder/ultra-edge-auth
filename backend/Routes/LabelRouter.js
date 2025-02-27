const { verifyLabel } = require('../Controllers/LabelController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.post('/verify-label',ensureAuthenticated,verifyLabel);

module.exports = router;