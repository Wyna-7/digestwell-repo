
import { getEntries, editEntry, postEntry, deleteEntry, isItem } from './apiService';
import nock from 'nock';
import { userId, mockSymptom, mockItem, mockEntries, mockEntryFromDataBase, mockEntryFromDataBase2, mockEntryToDataBase, mockEntryToDataBase2 } from '../mocks/apiService';

const BASE_URL = 'http://localhost:3000';
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
      .reply(200, 'Deleted');
    let response = await deleteEntry(mockItem.id, mockEntryFromDataBase);
    expect(response).toEqual(undefined);

    nock(BASE_URL)
      .delete('/symptoms/1')
      .reply(200, 'Deleted');
    response = await deleteEntry(mockItem.id, mockEntryFromDataBase2);
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
