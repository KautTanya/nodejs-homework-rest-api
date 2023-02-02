const {Contact} = require("../../MongoDb/contactModel");
const schema = require("../../schemas/schemas");


const postContact = async (req, res, next) => {
    const validationResult = schema.shemaPost.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ "message": "missing required name field"});
      
    }
        const {name, email, phone, favorite = false} = req.body;
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
};
   
   module.exports = {
    postContact,
   }