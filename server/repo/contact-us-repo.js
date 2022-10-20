const Contact = require("../model/contact");

async function sendContactUsMessage(name, email, subject, message) {
  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });
  return contact;
}

// list all contacts
async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

module.exports = { sendContactUsMessage, listContacts };
