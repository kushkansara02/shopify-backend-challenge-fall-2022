function updateInventory() {
  const createForm = document.getElementById('form');
  const id = createForm['id'].value;
  const url = document.getElementById('url').value;
  const proto = document.getElementById('proto').value;
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    await fetch(`${proto}://${url}/inventory/${id}`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: createForm['name'].value,
        count: createForm['count'].value,
        price: createForm['price'].value,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res) {
          document.querySelector('.alert').removeAttribute('hidden');
        }
      });
  });
}

async function deleteInventory() {
  const deleteForm = document.getElementById('form-delete');
  deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = deleteForm['id'].value;
    const url = document.getElementById('url').value;
    const proto = document.getElementById('proto').value;
    await fetch(`${proto}://${url}/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deletionComment: deleteForm['deletion-comment'].value,
      }),
    }).then(() => (window.location.href = '/inventory'));
  });
}

async function undeleteInventory(id) {
  const url = document.getElementById('url').value;
  const proto = document.getElementById('proto').value;
  await fetch(`${proto}://${url}/archived-inventory/${id}`, {
    method: 'DELETE',
  }).then(() => (window.location.href = '/inventory'));
}

async function redirectUpdate(id) {
  window.location.href = `/inventory/${id}`;
}

updateInventory();
deleteInventory();
