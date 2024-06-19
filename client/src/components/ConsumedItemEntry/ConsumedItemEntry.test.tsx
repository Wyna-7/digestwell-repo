import { screen, render, within, prettyDOM, waitFor } from '@testing-library/react';
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

  it('should display type dropdown and type options', async () => {
    render(
      <ConsumedItemEntry isEditing={true} setItemEntry={mockProps.setItemEntry} itemEntry={mockProps.itemEntry} />,
    );
    const typeDropdown = within(await screen.findByTestId('edit-type')).getByRole('combobox');

    expect(typeDropdown).toBeInTheDocument();

    await userEvent.click(typeDropdown);

    expect(screen.getByLabelText('id-beverage')).toBeInTheDocument();
  });
});

//HI SEBASTIAN PLEASE HAVE FUN WITH THIS :)

//   it('should display selected type', async () => {
//     // const user = userEvent.setup();

//     render(
//       <ConsumedItemEntry isEditing={true} setItemEntry={mockProps.setItemEntry} itemEntry={mockProps.itemEntry} />,
//     );
//     const typeDropdown = within(screen.getByTestId('edit-type')).getByRole('combobox');

//     await userEvent.click(typeDropdown);

//     const beverageOption = screen.getByLabelText('id-beverage');

//     await userEvent.click(beverageOption);

//     await userEvent.click(typeDropdown);

//     await waitFor(() => {
//       expect(within(screen.getByLabelText('edit-type')).getByRole('combobox')).toHaveTextContent('Beverage');
//     });
//   });
// });

// // const user = userEvent.setup();

// render(<ConsumedItemEntry isEditing={true} setItemEntry={mockProps.setItemEntry} itemEntry={mockProps.itemEntry} />);
// const typeDropdown = within(await screen.findByTestId('edit-type')).getByRole('combobox');

// await userEvent.click(typeDropdown);

// const beverageOption = await screen.findByTestId('id-beverage');
// await userEvent.click(beverageOption);

// console.log(prettyDOM(screen.getByLabelText('edit-type', { selector: '[role="combobox"]' })));
// console.log(prettyDOM(screen.getByLabelText('id-beverage')));
