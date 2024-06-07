const baseUrl = 'http://localhost:3000';

const getEntries = async () => {
  const entries = await fetch(`${baseUrl}/entries`).then((resp) => resp.json());
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
  const entry = await fetch(`${baseUrl}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  const resp = await entry.json();
  return resp;
};

export { getEntries, editEntry, postEntry };
