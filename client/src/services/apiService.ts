import { EntryFromDataBase, EntryToDataBase } from '../types';

const BASE_URL = 'http://localhost:3000/';

//TODO import entry interface from types file after merge
function isItem(entry: EntryToDataBase | EntryFromDataBase) {
  return entry?.name && entry?.select;
}

const getEntries = async (userId: number) => {
  const symptoms = await fetch(BASE_URL + `symptoms/${userId}`, { credentials: 'include' }).then((resp) => resp.json());
  const items = await fetch(BASE_URL + `items/${userId}`, { credentials: 'include' }).then((resp) => resp.json());
  const entries = [...symptoms, ...items];
  // add missing properties to each entry
  return entries.map((entry) => {
    return {
      // shared properties
      id: entry?.id || '',
      createdAt: entry?.createdAt || '',
      // item properties
      name: entry?.name || '',
      select: entry?.select || '',
      health_impact: entry?.health_impact || '',
      // symptom properties
      stool_type: entry?.stool_type || '',
      is_bleeding: entry?.is_bleeding || '',
      other_symptoms: entry?.other_symptoms || '',
      userId: entry?.userId || '',
      itemId: entry?.itemId || '',
    };
  });
};

async function fetchRequest(method: string, id: number | null, data: EntryToDataBase | EntryFromDataBase) {
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
    credentials: 'include',
  });
  if (['DELETE', 'PATCH'].includes(method)) return;
  const resp = await entry.json();
  return resp;
}

const editEntry = async (id: number, data: EntryFromDataBase) => {
  return await fetchRequest('PATCH', id, data);
};

const postEntry = async (item: EntryToDataBase) => {
  return await fetchRequest('POST', null, item);
};

const deleteEntry = async (id: number, data: EntryFromDataBase) => {
  return await fetchRequest('DELETE', id, data);
};

export { getEntries, editEntry, postEntry, deleteEntry, isItem };
