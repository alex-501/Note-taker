//routing refers to how endpoints respond to user requests
//is also a middleware function
const router = require('express').Router();

router.use(require('./notesRoutes'));

module.exports = router; 
