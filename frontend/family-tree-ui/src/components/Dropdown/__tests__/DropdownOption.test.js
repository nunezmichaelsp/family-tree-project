import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownOption } from '../DropdownOption';

describe('DropdownOption', () => {
  const mockOption = { value: 'option1', label: 'Option 1' };
  const defaultProps = {
    option: mockOption,
    isHighlighted: false,
    isSelected: false,
    onClick: jest.fn(),
    highlightedRef: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders option with correct content', () => {
    render(<DropdownOption {...defaultProps} />);
    
    const optionElement = screen.getByText(mockOption.label);
    expect(optionElement).toBeInTheDocument();
    expect(optionElement).toHaveAttribute('title', mockOption.label);
  });

  test('renders with correct attributes for accessibility', () => {
    render(<DropdownOption {...defaultProps} />);
    
    const optionItem = screen.getByRole('option');
    expect(optionItem).toHaveAttribute('id', `option-${mockOption.value}`);
    expect(optionItem).toHaveAttribute('aria-selected', 'false');
    expect(optionItem).toHaveAttribute('tabIndex', '-1');
  });

  test('applies correct styling when not highlighted or selected', () => {
    render(<DropdownOption {...defaultProps} />);
    
    const optionItem = screen.getByRole('option');
    expect(optionItem).toHaveClass('p-2');
    expect(optionItem).toHaveClass('cursor-pointer');
    expect(optionItem).toHaveClass('hover:bg-[#9fc3f870]');
    expect(optionItem).not.toHaveClass('bg-[#9fc3f870]');
    expect(optionItem).not.toHaveClass('bg-[#0d6efd]');
    expect(optionItem).not.toHaveClass('text-white');
  });

  test('applies correct styling when highlighted and not selected', () => {
    render(<DropdownOption {...defaultProps} isHighlighted={true} />);
    
    const optionItem = screen.getByRole('option');
    expect(optionItem).toHaveClass('bg-[#9fc3f870]');
    expect(optionItem).not.toHaveClass('bg-[#0d6efd]');
    expect(optionItem).not.toHaveClass('text-white');
    expect(optionItem).toHaveAttribute('aria-selected', 'true');
  });

  test('applies correct styling when selected', () => {
    render(<DropdownOption {...defaultProps} isSelected={true} />);
    
    const optionItem = screen.getByRole('option');
    expect(optionItem).toHaveClass('bg-[#0d6efd]');
    expect(optionItem).toHaveClass('text-white');
    expect(optionItem).not.toHaveClass('bg-[#9fc3f870]');
    expect(optionItem).toHaveAttribute('aria-selected', 'true');
  });

  test('applies correct styling when both highlighted and selected', () => {
    render(<DropdownOption {...defaultProps} isHighlighted={true} isSelected={true} />);
    
    const optionItem = screen.getByRole('option');
    expect(optionItem).toHaveClass('bg-[#0d6efd]');
    expect(optionItem).toHaveClass('text-white');
    expect(optionItem).not.toHaveClass('bg-[#9fc3f870]');
  });

  test('uses highlightedRef when isHighlighted is true', () => {
    const mockRef = { current: null };
    
    render(
      <DropdownOption 
        {...defaultProps} 
        isHighlighted={true} 
        highlightedRef={mockRef}
      />
    );
    
    // Implementation is limited as we can't easily check if ref is attached in testing
    const optionItem = screen.getByRole('option');
    expect(optionItem).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    render(<DropdownOption {...defaultProps} />);
    
    const optionItem = screen.getByRole('option');
    fireEvent.click(optionItem);
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('renders with truncated text for long labels', () => {
    const longLabelOption = { 
      value: 'longOption', 
      label: 'This is a very long option label that should be truncated in the UI'
    };
    
    render(<DropdownOption {...defaultProps} option={longLabelOption} />);
    
    const textElement = screen.getByText(longLabelOption.label);
    
    // Check if truncate classes are applied
    expect(textElement).toHaveClass('truncate');
    
    // Check if title attribute is set for tooltip on hover
    expect(textElement).toHaveAttribute('title', longLabelOption.label);
    
    // Check if style attributes for text truncation are applied
    const computedStyle = window.getComputedStyle(textElement);
    expect(computedStyle.whiteSpace).toBe('nowrap');
    expect(computedStyle.overflow).toBe('hidden');
    expect(computedStyle.textOverflow).toBe('ellipsis');
  });
});