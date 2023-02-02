const {Contact} = require("../../MongoDb/contactModel");
const schema = require("../../schemas/schemas");


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
   
   module.exports = {
    putContact,
   }