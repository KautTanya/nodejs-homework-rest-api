const server = require("../../models/contacts");
const express = require('express');
const router = express.Router();
const Joi = require("joi");



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

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().alphanum().min(10).max(13).required(),
});
const validationResult = schema.validate(req.body);
if (validationResult.error) {
  return res.status(400).json({ "message": "missing required name field"});
}
    const {name, email, phone} = req.body;
    const newContact = await server.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }


})

router.delete('/:contactId', async (req, res, next) => {
  try {
      const {contactId} = req.params;
      const contact = await server.getContactById(contactId); 
      const deleteContact  = await server.removeContact(contactId);
        if(!contact){
          return res.status(404).json({ message: 'Not found' })
        }
     
      res.status(200).json({ message: 'contact deleted' })
    } catch (error) {
      next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
 try{

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().alphanum().min(10).max(13),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ "message": "Not found" });
  }

  const {contactId} = req.params;
  if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
  }
  const {name, email, phone} = req.body;
  const updateContact = await server.updateContact(contactId, req.body);

  res.status(200).json(updateContact);
 } catch (error) {
   next(error);
}
})

module.exports = router;
