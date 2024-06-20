
import { screen, render } from '@testing-library/react';
import Entry from './Entry';
import { EntryWithEdit } from '../../types';
import { ReactNode } from 'react';
import EntriesContext from '../../context/EntriesContext';
import { useState } from 'react';

const initialEntries: EntryWithEdit[] = [
  {
    id: 1,
    createdAt: '2024-06-15 16:10:19.849+02',
    name: 'Chocolate',
    select: 'Food',
    health_impact: 'Beneficial',
    stool_type: 'Type 1',
    is_bleeding: false,
    other_symptoms: 'None',
    userId: 2,
    itemId: 3,
    isEditing: false,
  }
];

const mockProps: EntryWithEdit = initialEntries[0];

const MockEntriesProvider = ({ children }: { children: ReactNode }) => {
  const [entriesList, setEntriesList] = useState<EntryWithEdit[]>(initialEntries);
  const [userId, setUserId] = useState<number>(1);

  const contextValue = {
    userId,
    setUserId,
    entriesList,
    setEntriesList: (updateFunc) => setEntriesList((prevList) => updateFunc(prevList)),
  };

  return (
    <EntriesContext.Provider value={contextValue}>
      {children}
    </EntriesContext.Provider>
  );
};


beforeEach(() => {
  render(
    <MockEntriesProvider>
      <Entry {...mockProps} />
    </MockEntriesProvider>
  );
});

describe('Entry tests render', () => {
  it('should render the item name in entry', () => {
    expect(screen.getByTestId('item-name')).toHaveTextContent('Chocolate');
  });
  it('should render the item select in entry', () => {
    expect(screen.getByTestId('item-select')).toHaveTextContent('Food');
  });
  it('should render the item health impact in entry', () => {
    expect(screen.getByTestId('item-health_impact')).toHaveTextContent('Beneficial');
  });
  it('should display formatted date of the entry', async () => {
    expect(await screen.findByText('6/15/2024, 4:10:19 PM')).toBeInTheDocument();
  });
  it('should display EditCalendarIcon', async () => {
    expect(await screen.findByTestId('EditCalendarIcon')).toBeInTheDocument();
  });
  it('should display DeleteOutlineIcon', async () => {
    expect(await screen.findByTestId('DeleteOutlineIcon')).toBeInTheDocument();
  });

});