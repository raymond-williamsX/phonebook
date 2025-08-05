const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const addBtn = document.getElementById('add-contact-btn');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Show modal
addBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Hide modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

function displayContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const div = document.createElement('div');
    div.className = 'contact-card';
    div.innerHTML = `
      <img src="${contact.image}" alt="profile" />
      <div class="contact-info">
        <strong>${contact.name}</strong><br/>
        📍 ${contact.address}<br/>
        📞 ${contact.phone}<br/>
        ✉️ ${contact.email}
      </div>
      <div class="contact-actions">
        <button onclick="editContact(${index})"><i class="fas fa-edit"></i></button>
        <button onclick="deleteContact(${index})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    contactList.appendChild(div);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const image = await readImage(document.getElementById('profile-pic').files[0]);
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const newContact = { image, name, address, phone, email };
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  displayContacts();
  form.reset();
  modal.classList.add('hidden');
});

function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result || '');
    if (file) {
      reader.readAsDataURL(file);
    } else {
      resolve('');
    }
  });
}

function deleteContact(index) {
  if (confirm("Delete this contact?")) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
  }
}

function editContact(index) {
  const c = contacts[index];
  document.getElementById('name').value = c.name;
  document.getElementById('address').value = c.address;
  document.getElementById('phone').value = c.phone;
  document.getElementById('email').value = c.email;
  modal.classList.remove('hidden');

  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  displayContacts();
}

displayContacts();
