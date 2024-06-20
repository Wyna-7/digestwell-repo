
import { getEntries, editEntry, postEntry, deleteEntry, isItem } from './apiService';
import nock from 'nock';

const BASE_URL = 'http://localhost:3000';
const userId = 1;
const mockItem = {
  id: 1,
  createdAt: '2023-01-01T00:00:00Z',
  name: 'Chocolate Cake',
  select: 'Food',
  health_impact: 'Negative',
  userId: 1,
};

const mockSymptom = {
  id: 1,
  createdAt: '2023-01-01T00:00:00Z',
  stool_type: 'Type 1',
  is_bleeding: 'Yes',
  other_symptoms: 'None',
  userId: 1,
  itemId: 1,
};
const mockEntries = [
  {
    id: 1,
    createdAt: '2023-01-01T00:00:00Z',
    stool_type: 'Type 1',
    is_bleeding: 'Yes',
    other_symptoms: 'None',
    userId: 1,
    itemId: 1,
    name: '',
    select: '',
    health_impact: '',
  },
  {
    id: 1,
    createdAt: '2023-01-01T00:00:00Z',
    name: 'Chocolate Cake',
    select: 'Food',
    health_impact: 'Negative',
    stool_type: '',
    is_bleeding: '',
    other_symptoms: '',
    userId: 1,
    itemId: '',
  },
];

const mockEntryFromDataBase = {
  id: 1,
  createdAt: '2023-01-01T00:00:00Z',
  name: 'Chocolate Cake',
  select: 'Food',
  health_impact: 'Negative',
  stool_type: '',
  is_bleeding: false,
  other_symptoms: '',
  userId: 1,
  itemId: 1,
};

const mockEntryToDataBase = {
  name: 'Chocolate Cake',
  select: 'Food',
  health_impact: 'Negative',
  stool_type: '',
  is_bleeding: false,
  other_symptoms: '',
  userId: 1,
};
const mockEntryToDataBase2 = {
  name: '',
  select: '',
  health_impact: 'Negative',
  stool_type: '',
  is_bleeding: false,
  other_symptoms: '',
  userId: 1,
};


describe('API functions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getEntries should fetch and merge symptoms and items', async () => {
    nock(BASE_URL)
      .get(`/symptoms/${userId}`)
      .reply(200, [mockSymptom]);

    nock(BASE_URL)
      .get(`/items/${userId}`)
      .reply(200, [mockItem]);

    const entries = await getEntries(userId);
    expect(entries).toEqual(mockEntries);
  });

  it('editEntry should send a PATCH request', async () => {
    nock(BASE_URL)
      .patch(`/items/${mockItem.id}`)
      .reply(200, mockItem);
    const response = await editEntry(mockItem.id, mockEntryFromDataBase);
    expect(response).toEqual(undefined);
  });

  it('deleteEntry should send a DELETE request', async () => {
    nock(BASE_URL)
      .delete(`/items/${mockItem.id}`)
      .reply(200, mockItem);
    const response = await deleteEntry(mockItem.id, mockEntryFromDataBase);
    expect(response).toEqual(undefined);
  });

  it('postEntry should send a POST request', async () => {
    nock(BASE_URL)
      .post('/items')
      .reply(200, mockItem);

    const response = await postEntry(mockEntryToDataBase);
    expect(response).toEqual(mockItem);
  });


  it('isItem should correctly identify items', () => {
    expect(isItem(mockEntryToDataBase)).toBe(true);
    expect(isItem(mockEntryFromDataBase)).toBe(true);
    expect(isItem(mockEntryToDataBase2)).toBe(false);
  });

});
