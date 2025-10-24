'use strict';

// --- SORTING TABLE ---
const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
let sortDirections = {};

table.querySelectorAll('th').forEach((th, index) => {
  th.addEventListener('click', () => {
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumber = index === 3 || index === 4; // Age or Salary
    let direction = sortDirections[index] === 'ASC' ? 'DESC' : 'ASC';
    sortDirections[index] = direction;

    rows.sort((a, b) => {
      let aText = a.children[index].innerText.replace(/\$|,/g, '');
      let bText = b.children[index].innerText.replace(/\$|,/g, '');
      if (isNumber) {
        aText = Number(aText);
        bText = Number(bText);
      }
      if (direction === 'ASC') return aText > bText ? 1 : aText < bText ? -1 : 0;
      else return aText < bText ? 1 : aText > bText ? -1 : 0;
    });

    tbody.append(...rows);
  });
});

// --- ROW SELECTION ---
tbody.querySelectorAll('tr').forEach((tr) => {
  tr.addEventListener('click', () => {
    tbody.querySelectorAll('tr').forEach(r => r.classList.remove('active'));
    tr.classList.add('active');
  });
});

// --- ADD NEW EMPLOYEE FORM ---
const form = document.createElement('form');
form.className = 'new-employee-form';
form.innerHTML = `
  <label>Name: <input data-qa="name" type="text" required></label>
  <label>Position: <input data-qa="position" type="text" required></label>
  <label>Office:
    <select data-qa="office" required>
      <option>Tokyo</option>
      <option>Singapore</option>
      <option>London</option>
      <option>New York</option>
      <option>Edinburgh</option>
      <option>San Francisco</option>
    </select>
  </label>
  <label>Age: <input data-qa="age" type="number" required></label>
  <label>Salary: <input data-qa="salary" type="number" required></label>
  <button type="submit">Save to table</button>
  <div data-qa="notification"></div>
`;
document.body.prepend(form);

const notification = form.querySelector('[data-qa="notification"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.querySelector('[data-qa="name"]').value.trim();
  const position = form.querySelector('[data-qa="position"]').value.trim();
  const office = form.querySelector('[data-qa="office"]').value;
  const age = Number(form.querySelector('[data-qa="age"]').value);
  const salary = Number(form.querySelector('[data-qa="salary"]').value);

  notification.textContent = '';
  notification.className = '';
  
  if (name.length < 4) {
    notification.textContent = 'Name must be at least 4 characters.';
    notification.classList.add('error');
    return;
  }
  if (age < 18 || age > 90) {
    notification.textContent = 'Age must be between 18 and 90.';
    notification.classList.add('error');
    return;
  }
  if (!position || !office || !age || !salary) {
    notification.textContent = 'All fields are required.';
    notification.classList.add('error');
    return;
  }

  const newRow = document.createElement('tr');
  newRow.innerHTM
