const BASE_URL = 'http://localhost:3000/'; 

function isItem(entry) {
  return entry?.name && entry?.select && entry?.health_impact;
}

const getEntries = async (userId) => {
  const symptoms = await fetch(BASE_URL + `symptoms/${userId}`).then((resp) => resp.json());
  const items = await fetch(BASE_URL + `items/${userId}`).then((resp) => resp.json());
  const entries = [...symptoms, ...items];
  // add missing properties to each entry
  return entries.map((entry) => {
    return {
      // shared properties
      id: entry?.id  || '',
      createdAt: entry?.createdAt  || '',
      // item properties
      name: entry?.name  || '',
      select: entry?.select  || '',
      health_impact: entry?.health_impact  || '',
      // symptom properties
      stool_type: entry?.stool_type  || '',
      is_bleeding: entry?.is_bleeding  || '',
      other_symptoms: entry?.other_symptoms  || '',
      userId: entry?.userId  || '',
      itemId: entry?.itemId  || '',
    };
  });
};

async function fetchRequest (method, id, data) {
  console.log('fetchRequest', method, id, data);
  let endpoint = '';
  if (isItem(data)) {
    endpoint = 'items';
  } else {
    endpoint = 'symptoms';
  }

  if (id) endpoint += `/${id}`;

  const entry = await fetch(`${BASE_URL}${endpoint}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (['DELETE', 'PATCH'].includes(method)) return;
  const resp = await entry.json();
  return resp;
}

const editEntry = async (id, data) => {
  return await fetchRequest('PATCH', id, data);
};

const postEntry = async (item) => {
  return await fetchRequest('POST', null, item);
};

const deleteEntry = async (id) => {
  return await fetchRequest('DELETE', id, undefined);
};

export { getEntries, editEntry, postEntry, deleteEntry };
