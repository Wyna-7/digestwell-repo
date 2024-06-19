import { screen, render, within } from '@testing-library/react';
import ConsumedItemEntry from './ConsumedItemEntry';
import { ConsumedItemEntryProps } from '../../types';
import userEvent from '@testing-library/user-event';

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

beforeEach(() => {
  render(
    <ConsumedItemEntry isEditing={true} setItemEntry={mockProps.setItemEntry} itemEntry={mockProps.itemEntry} />,
  );
});

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
    expect(screen.getByTestId('edit-name')).toBeInTheDocument();
    expect(screen.getByTestId('edit-type')).toBeInTheDocument();
    expect(screen.getByTestId('edit-impact')).toBeInTheDocument();
  });

  it('should display type dropdown and type options', async () => {
    const typeDropdown = within(await screen.findByTestId('edit-type')).getByRole('combobox');

    expect(typeDropdown).toBeInTheDocument();

    await userEvent.click(typeDropdown);

    expect(await screen.findByTestId('id-food')).toBeInTheDocument();
    expect(await screen.findByTestId('id-beverage')).toBeInTheDocument();
    expect(await screen.findByTestId('id-medication')).toBeInTheDocument();
    expect(await screen.findByTestId('id-supplement')).toBeInTheDocument();
  });

  it('should display health impact dropdown and health impact options', async () => {
    const impactDropdown = within(await screen.findByTestId('edit-impact')).getByRole('combobox');

    expect(impactDropdown).toBeInTheDocument();

    await userEvent.click(impactDropdown);

    expect(await screen.findAllByText('Beneficial')).toHaveLength(2);
    expect(await screen.findByText('Neutral')).toBeInTheDocument();
    expect(await screen.findByText('Avoid')).toBeInTheDocument();
  });
});
