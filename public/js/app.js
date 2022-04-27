function updateInventory() {
  const createForm = document.getElementById('form');
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = createForm['id'].value;
    await fetch(`http://localhost:3000/inventory/${id}`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: createForm['name'].value,
        count: createForm['count'].value,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res) {
          document.querySelector('.alert').removeAttribute('hidden');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  });
}

async function deleteInventory(id) {
  console.log(id);
  await fetch(`http://localhost:3000/inventory/${id}`, {
    method: 'DELETE',
  }).then(() => (window.location.href = '/inventory'));
}

updateInventory();
