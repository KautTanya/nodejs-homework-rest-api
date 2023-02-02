const {Contact} = require("../../MongoDb/contactModel");

const deleteContact = async (req, res, next) => {
    const {contactId} = req.params;
    const contact = await Contact.findById(contactId); 
    await Contact.findByIdAndRemove(contactId);
      if(!contact){
        return res.status(404).json({ message: 'Not found' })
      }
    res.status(200).json({ message: 'contact deleted' })
 
};

module.exports = {
    deleteContact,
   }