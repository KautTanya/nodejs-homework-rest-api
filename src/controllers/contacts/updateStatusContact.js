const {Contact} = require("../../MongoDb/contactModel");

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
    updateStatusContact,
   }