const baseUrl = 'http://localhost:3000/entries';

const getEntries = async () => {
  const entries = await fetch(baseUrl).then((resp) => resp.json());
  return entries;
};

const editEntry = async (id, data) => {
  const entry = await fetch(`${baseUrl}/${id}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resp = await entry.json();
  return resp;
};

const postEntry = async (item) => {
  const entry = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  const resp = await entry.json();
  console.log(resp);
  return resp;
};

const deleteEntry = async (id) => {
  const entry = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  const resp = await entry.json();
  return resp;
};

export { getEntries, editEntry, postEntry, deleteEntry };
