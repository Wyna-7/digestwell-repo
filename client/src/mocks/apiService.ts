export const userId = 1;
export const mockItem = {
  id: 1,
  createdAt: '2023-01-01T00:00:00Z',
  name: 'Chocolate Cake',
  select: 'Food',
  health_impact: 'Negative',
  userId: 1,
};
export const mockSymptom = {
  id: 1,
  createdAt: '2023-01-01T00:00:00Z',
  stool_type: 'Type 1',
  is_bleeding: 'Yes',
  other_symptoms: 'None',
  userId: 1,
  itemId: 1,
};
export const mockEntries = [
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
export const mockEntryFromDataBase = {
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
export const mockEntryFromDataBase2 = {
  id: 1,
  createdAt: '2023-01-01T00:00:00Z',
  name: '',
  select: '',
  health_impact: 'Negative',
  stool_type: '',
  is_bleeding: false,
  other_symptoms: '',
  userId: 1,
  itemId: 1,
};
export const mockEntryToDataBase = {
  name: 'Chocolate Cake',
  select: 'Food',
  health_impact: 'Negative',
  stool_type: '',
  is_bleeding: false,
  other_symptoms: '',
  userId: 1,
};
export const mockEntryToDataBase2 = {
  name: '',
  select: '',
  health_impact: 'Negative',
  stool_type: '',
  is_bleeding: false,
  other_symptoms: '',
  userId: 1,
};
