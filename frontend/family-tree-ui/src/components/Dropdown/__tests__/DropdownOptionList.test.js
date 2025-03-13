import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownOptionList } from '../DropdownOptionList';
import { DropdownOption } from '../DropdownOption';

// Mock DropdownOption component
jest.mock('../DropdownOption', () => ({
  DropdownOption: jest.fn(({ option }) => (
    <div data-testid={`option-${option.value}`}>{option.label}</div>
  ))
}));

describe('DropdownOptionList', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  const defaultProps = {
    options: mockOptions,
    highlightedIndex: 0,
    selectedOption: null,
    handleSelect: jest.fn(),
    highlightedRef: { current: null },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a list of options', () => {
    render(<DropdownOptionList {...defaultProps} />);
    
    // Check if dropdown list is rendered with correct attributes
    const optionsList = screen.getByRole('listbox');
    expect(optionsList).toBeInTheDocument();
    expect(optionsList).toHaveAttribute('aria-live', 'polite');
    
    // Check if all options are rendered
    expect(DropdownOption).toHaveBeenCalledTimes(3);
    mockOptions.forEach(option => {
      expect(screen.getByTestId(`option-${option.value}`)).toBeInTheDocument();
    });
  });

  test('passes correct props to DropdownOption', () => {
    render(<DropdownOptionList {...defaultProps} />);
    
    // Check first option props - notice we include the second undefined argument
    expect(DropdownOption).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        option: mockOptions[0],
        isHighlighted: true,
        isSelected: false,
        onClick: expect.any(Function),
        highlightedRef: defaultProps.highlightedRef,
      }),
      undefined
    );
    
    // Check second option props
    expect(DropdownOption).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        option: mockOptions[1],
        isHighlighted: false,
        isSelected: false,
        onClick: expect.any(Function),
        highlightedRef: null,
      }),
      undefined
    );
  });

  test('highlights the correct option based on highlightedIndex', () => {
    render(
      <DropdownOptionList
        {...defaultProps}
        highlightedIndex={1}
      />
    );
    
    // First option should not be highlighted
    expect(DropdownOption).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        option: mockOptions[0],
        isHighlighted: false,
        onClick: expect.any(Function),
      }),
      undefined
    );
    
    // Second option should be highlighted
    expect(DropdownOption).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        option: mockOptions[1],
        isHighlighted: true,
        highlightedRef: defaultProps.highlightedRef,
        onClick: expect.any(Function),
      }),
      undefined
    );
  });

  test('marks the selected option correctly', () => {
    render(
      <DropdownOptionList
        {...defaultProps}
        selectedOption={mockOptions[2]}
      />
    );
    
    // Third option should be marked as selected
    expect(DropdownOption).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        option: mockOptions[2],
        isSelected: true,
        onClick: expect.any(Function),
      }),
      undefined
    );
  });

  test('renders "No results found" when options array is empty', () => {
    render(
      <DropdownOptionList
        {...defaultProps}
        options={[]}
      />
    );
    
    // DropdownOption should not be called
    expect(DropdownOption).not.toHaveBeenCalled();
    
    // "No results found" message should be displayed
    const noResultsElement = screen.getByText('No results found.');
    expect(noResultsElement).toBeInTheDocument();
    expect(noResultsElement).toHaveAttribute('role', 'option');
    expect(noResultsElement).toHaveAttribute('aria-disabled', 'true');
  });

  test('calls handleSelect when an option is clicked', () => {
    // Reset the mock to directly test the click handler
    DropdownOption.mockImplementation(({ option, onClick }) => (
      <div 
        data-testid={`option-${option.value}`}
        onClick={onClick}
      >
        {option.label}
      </div>
    ));
    
    render(<DropdownOptionList {...defaultProps} />);
    
    // Click on the second option
    fireEvent.click(screen.getByTestId(`option-${mockOptions[1].value}`));
    
    // handleSelect should be called with the second option
    expect(defaultProps.handleSelect).toHaveBeenCalledWith(mockOptions[1]);
  });
});
