import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

//Fetches all contacts in the phonebook with a get request, returns the response's data
const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//POSTs a new contact resource to the server, returns the response's data
const createContact = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

//replaces an existing contact resource, identified using id, with the object passed as newContactData, returns the response's data
const editContact = (contactId, newContactData) => {
    const request = axios.put(`${baseUrl}/${contactId}`, newContactData)
    return request.then(response => response.data)
}

//deletes an existing contact resource, identified using id, returns the response's data
const deleteContact = (contactId) => {
    const request = axios.delete(`${baseUrl}/${contactId}`)
    return request.then(response => response.data)
}

export default {
    getAllContacts,
    createContact,
    editContact,
    deleteContact
}