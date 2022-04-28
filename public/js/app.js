function updateInventory() {
  const createForm = document.getElementById('form');
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = createForm['id'].value;
    await fetch(
      `https://shopify-backend-challenge-fall-2022.kushkansara.repl.co/inventory/${id}`,
      {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: createForm['name'].value,
          count: createForm['count'].value,
        }),
      },
    )
      .then((data) => data.json())
      .then((res) => {
        if (res) {
          document.querySelector('.alert').removeAttribute('hidden');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .then(() => (window.location.href = '/inventory'));
  });
}

async function deleteInventory() {
  const deleteForm = document.getElementById('form-delete');
  deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = deleteForm['id'].value;
    await fetch(
      `https://shopify-backend-challenge-fall-2022.kushkansara.repl.co/inventory/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deletionComment: deleteForm['deletion-comment'].value,
        }),
      },
    ).then(() => (window.location.href = '/inventory'));
  });
}

async function undeleteInventory(id) {
  console.log(id);
  await fetch(
    `https://shopify-backend-challenge-fall-2022.kushkansara.repl.co/archived-inventory/${id}`,
    {
      method: 'DELETE',
    },
  ).then(() => (window.location.href = '/inventory'));
}

updateInventory();
deleteInventory();
