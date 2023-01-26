const server = require("../../models/contacts");
const express = require('express');
const router = express.Router()



router.get('/', async (req, res, next) => {
  try {
    const list = await server.listContacts();
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
  const contact = await server.getContactById(contactId);
  if(!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json({contact})
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, email, phone} = req.body;
    const newContact = await server.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }

  // res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  try {
      const {contactId} = req.params;
      const deleteContact  = await server.removeContact(contactId);

     
      res.status(200).json({ message: 'contact deleted' })
    } catch (error) {
      next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
 try{
  const {contactId} = req.params;
  const {name, email, phone} = req.body;
  const updateContact = await server.updateContact(contactId, name, email, phone)

  res.status(200).json(updateContact);
 } catch (error) {
   next(error);
}
})

module.exports = router;
