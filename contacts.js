const fs = require('fs').promises
const { v4: uuidv4 } = require('uuid')
const path = require('path')
require('colors')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, 'utf-8')
		return JSON.parse(contacts)
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const getContactById = async contactId => {
	try {
		const contacts = await listContacts()
		return contacts.filter(({ id }) => id === contactId)
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const removeContact = async contactId => {
	try {
		const contacts = await listContacts()
		const newContacts = contacts.filter(({ id }) => id !== contactId)
		await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2),  'utf-8' )

		return newContacts
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const addContact = async (name, email, phone) => {
    try {
        
		const contacts = await listContacts()
		const newContact = {
			id: uuidv4(),
			name,
			email,
			phone,
		}
		const updatedContacts = [newContact, ...contacts]
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2),  'utf-8' )
		return newContact
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

listContacts()

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}