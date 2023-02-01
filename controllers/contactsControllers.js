const schema = require("../schemas/schemas");
const {Contact} = require("../MongoDb/contactModel");

const getList = async (req, res, next) => {
        const list = await Contact.find();
        res.status(200).json(list);
   };

const getListById = async (req, res, next) => {
      const {contactId} = req.params;
      const contact = await Contact.findById(contactId);
      if(!contact) {
        return res.status(404).json({ message: 'Not found' })
      }
      res.status(200).json({contact})
     
  };

const postContact = async (req, res, next) => {
        const validationResult = schema.shemaPost.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": "missing required name field"});
          
        }
            const {name, email, phone, favorite = false} = req.body;
            const newContact = await Contact.create(req.body);
            res.status(201).json(newContact);
  };

  const deleteContact = async (req, res, next) => {
        const {contactId} = req.params;
        const contact = await Contact.findById(contactId); 
        await Contact.findByIdAndRemove(contactId);
          if(!contact){
            return res.status(404).json({ message: 'Not found' })
          }
        res.status(200).json({ message: 'contact deleted' })
     
  };

  const putContact = async (req, res, next) => {
    
      const validationResult = schema.shemaPut.validate(req.body);
      if (validationResult.error) {
        return res.status(404).json({ "message": "Not found" });
      }
    
      const {contactId} = req.params;
      if (Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "missing fields" });
      }
      const {name, email, phone, favorite = false} = req.body;
      const updateContact = await Contact.findByIdAndUpdate(contactId, req.body);
    
      res.status(200).json(updateContact);
     
  };
const updateStatusContact = async (req, res, next) =>{
    const {contactId} = req.params;
    const contact = await Contact.findById(contactId); 
    if(!contact){
        return res.status(404).json({ message: 'Not found' })
      }
      
    const {favorite} = req.body;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "missing field favorite" });
    }
    const updateStatus = await Contact.findByIdAndUpdate(contactId, {favorite});
    res.status(200).json(updateStatus);
}

  module.exports = {
    getList,
    getListById,
    postContact,
    deleteContact,
    putContact,
    updateStatusContact,
  }