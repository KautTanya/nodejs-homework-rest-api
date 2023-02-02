const {Contact} = require("../../MongoDb/contactModel");

const getList = async (req, res, next) => {
        const list = await Contact.find();
        res.status(200).json(list);
   };
   
   module.exports = {
    getList,
   }