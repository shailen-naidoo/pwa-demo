self.addEventListener('sync', (event) => {
  const { id, data } = JSON.parse(event.tag);

  if (id === 'userData') {
    fetch('http://localhost:8000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .then(res => console.log(res));
  }
});