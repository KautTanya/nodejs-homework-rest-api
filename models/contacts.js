const fs = require('fs/promises');
const { nanoid } = require("nanoid");
const path = require('path');

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readData(){
  try{
    const dataRaw = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(dataRaw);
    return data;
  } catch(error){
    console.log(error);
  }

}

async function writeData(data){
  try{
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
  } catch(error){
    console.log(error);
  }

}


const listContacts = async () => {
  try{
    const  info = await readData();
    return info;
  } catch(error){
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try{
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
        if (!contact) {
          return null;
        }
        return contact;
  } catch(error){
    console.log(error);
  }

}

const removeContact = async (contactId) => {
  try{
    const contacts = await readData();
    const removeData = contacts.filter((contact) => contact.id !== contactId);
    await writeData(removeData);
    return (removeData);
  } catch(error){
    console.log(error);
  }
}

const addContact = async (name, email, phone) => {
  
  try{
    const id = nanoid();
    const newContact = {id, name, email, phone};
    const data = await readData();
    data.push(newContact);
    await writeData(data);
    return(data)
  } catch(error){
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try{
    const contacts = await readData();
    let newData = null;
   contacts.forEach((contact) =>  {
      if (contact.id === contactId) {
        if (body.name) {
          contact.name = body.name;
        }
        if (body.email) {
          contact.email = body.email;
        }
        if (body.phone) {
          contact.phone = body.phone;
        }
        newData = contact;
      }
    });
       
    await writeData(contacts);
    return (newData);
  } catch(error){
    console.log(error);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
