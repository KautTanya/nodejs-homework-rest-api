const server = require("../models/contacts");
const schema = require("../schemas/schemas");

const getList = async (req, res, next) => {
    try {
        const list = await server.listContacts();
        res.status(200).json(list);
      } catch (error)
       {
        next(error);
      }
  };
  const getListById = async (req, res, next) => {
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
  };
  const postContact = async (req, res, next) => {
    try {
        const validationResult = schema.shemaPost.validate(req.body);
        if (validationResult.error) {
          return res.status(400).json({ "message": "missing required name field"});
        }
            const {name, email, phone} = req.body;
            const newContact = await server.addContact(name, email, phone);
            res.status(201).json(newContact);
          } catch (error) {
            next(error);
          }
  };

  const deleteContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await server.getContactById(contactId); 
        await server.removeContact(contactId);
          if(!contact){
            return res.status(404).json({ message: 'Not found' })
          }
       
        res.status(200).json({ message: 'contact deleted' })
      } catch (error) {
        next(error);
      }
  };

  const putContact = async (req, res, next) => {
    try {
      const validationResult = schema.shemaPut.validate(req.body);
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
  };
  module.exports = {
    getList,
    getListById,
    postContact,
    deleteContact,
    putContact
  }