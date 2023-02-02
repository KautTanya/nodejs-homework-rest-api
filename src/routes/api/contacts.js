const controlers = require("../../controllers/contacts/index");
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
  controlers.getList(req, res, next);
})

router.get('/:contactId', async (req, res, next) => {
  controlers.getListById(req, res, next);
})

router.post('/', async (req, res, next) => {
  controlers.postContact(req, res, next);
})

router.delete('/:contactId', async (req, res, next) => {
  controlers.deleteContact(req, res, next);
})

router.put('/:contactId', async (req, res, next) => {
  controlers.putContact(req, res, next);
})
router.patch('/:contactId/favorite', async (req, res, next) => {
  controlers.updateStatusContact(req, res, next);
})
module.exports = router;
