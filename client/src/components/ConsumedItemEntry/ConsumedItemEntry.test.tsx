import { screen, render, within } from '@testing-library/react';
import ConsumedItemEntry from './ConsumedItemEntry';
import { ConsumedItemEntryProps } from '../../types';

const mockSetItemEntry = vi.fn();

const mockProps: ConsumedItemEntryProps = {
  isEditing: false,
  setItemEntry: mockSetItemEntry,
  itemEntry: {
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
  },
};

describe('ConsumedItemEntry tests render', () => {
  it('should render the item name in entry', () => {
    render(<ConsumedItemEntry {...mockProps} />);
    expect(screen.getByTestId('item-name')).toHaveTextContent('Chocolate');
  });
  it('should render the item select in entry', () => {
    render(<ConsumedItemEntry {...mockProps} />);
    expect(screen.getByTestId('item-select')).toHaveTextContent('Food');
  });
  it('should render the item health impact in entry', () => {
    render(<ConsumedItemEntry {...mockProps} />);
    expect(screen.getByTestId('item-health_impact')).toHaveTextContent('Beneficial');
  });
});

describe('ConsumedItemEntry edits', () => {
  it('should display edit view', () => {
    render(
      <ConsumedItemEntry isEditing={true} setItemEntry={mockProps.setItemEntry} itemEntry={mockProps.itemEntry} />,
    );
    expect(screen.getByTestId('edit-name')).toBeInTheDocument();
    expect(screen.getByTestId('edit-type')).toBeInTheDocument();
    expect(screen.getByTestId('edit-impact')).toBeInTheDocument();
  });
  it('should display type dropdown', () => {
    render(
      <ConsumedItemEntry isEditing={true} setItemEntry={mockProps.setItemEntry} itemEntry={mockProps.itemEntry} />,
    );
    const nameDropdown = expect(screen.getByTestId('edit-name')).toBeInTheDocument();
  });
});
