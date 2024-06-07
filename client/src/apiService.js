const baseUrl = 'http://localhost:3000/entries';

const getEntries = async () => {
  const entries = await fetch(baseUrl).then((resp) => resp.json());
  return entries;
};

const editEntries = async (id, data) => {
  const entry = await fetch(`${baseUrl}/${id}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resp = await entry.json();
  return resp;
};

export { getEntries, editEntries };
