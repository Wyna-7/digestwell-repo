const router = require('express').Router();

const {
  getEntries,
  postEntry,
  modifyEntry,
  deleteEntry,
} = require('./controller/entries');

router.get('/entries', getEntries);

router.post('/entries', postEntry);

// to modify an entry
router.put('/entries/:id', modifyEntry);

router.delete('/entries/:id', deleteEntry);

module.exports = router;
