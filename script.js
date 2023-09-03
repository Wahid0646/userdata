let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

function renderContacts() {
    document.getElementById('contactList').innerHTML = contacts.map(contact => `
        <li>
            <strong>${contact.name}</strong> (${contact.email}) - ${contact.phone}
            <button class="deleteBtn" onclick="deleteContact(${contact.id})">Delete</button>
        </li>
    `).join('');
}

function deleteContact(contactId) {
    contacts = contacts.filter(contact => contact.id !== contactId);
    renderContacts();
    saveContactsToLocalstorage();
}

function saveContactsToLocalstorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const id = Date.now();
    const newContact = { id, name, email, phone };

    // Use CORS Anywhere as a proxy to bypass CORS restrictions for testing
    axios.post('https://cors-anywhere.herokuapp.com/https://crudcrud.com/api/a3153fd3d1b4415696ab421146c9f67f/contactData', newContact)
        .then(response => {
            // If the POST request is successful, add the contact to the local array
            contacts.push(newContact);
            renderContacts();
            saveContactsToLocalstorage();
            document.getElementById('appointmentForm').reset();
        })
        .catch(error => {
            // Handle any errors that occur during the POST request
            console.error('Error adding contact:', error);
        });
});

window.onload = renderContacts;