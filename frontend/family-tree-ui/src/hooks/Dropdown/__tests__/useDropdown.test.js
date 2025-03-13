import { renderHook, act } from '@testing-library/react';
import { useDropdown } from '../useDropdown';

describe('useDropdown', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  const defaultProps = {
    options: mockOptions,
    defaultValue: null,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with default values', () => {
    const { result } = renderHook(() => useDropdown(defaultProps));
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedOption).toBeNull();
    expect(result.current.searchTerm).toBe('');
    expect(result.current.highlightedIndex).toBe(-1);
    expect(result.current.filteredOptions).toEqual(mockOptions);
  });

  test('initializes with provided defaultValue', () => {
    const selectedOption = mockOptions[1];
    const { result } = renderHook(() => 
      useDropdown({ ...defaultProps, defaultValue: selectedOption })
    );
    
    expect(result.current.selectedOption).toEqual(selectedOption);
  });

  test('toggleDropdown changes isOpen state', () => {
    const { result } = renderHook(() => useDropdown(defaultProps));
    
    act(() => {
      result.current.toggleDropdown();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.toggleDropdown();
    });
    
    expect(result.current.isOpen).toBe(false);
  });

  test('handleSelect selects an option and calls onChange', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => 
      useDropdown({ ...defaultProps, onChange })
    );
    
    const optionToSelect = mockOptions[0];
    
    act(() => {
      result.current.handleSelect(optionToSelect);
    });
    
    expect(result.current.selectedOption).toEqual(optionToSelect);
    expect(result.current.isOpen).toBe(false);
    expect(onChange).toHaveBeenCalledWith(optionToSelect.value);
  });

  test('handleSearch updates searchTerm and filters options', () => {
    const { result } = renderHook(() => useDropdown(defaultProps));
    
    act(() => {
      result.current.handleSearch({ target: { value: 'option1' } });
    });
    
    expect(result.current.searchTerm).toBe('option1');
    expect(result.current.highlightedIndex).toBe(0);
  });

  test('handleKeyDown with ArrowDown increases highlightedIndex', () => {
    const { result } = renderHook(() => useDropdown(defaultProps));
    
    // Open dropdown first
    act(() => {
      result.current.toggleDropdown();
    });
    
    act(() => {
      result.current.handleKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() });
    });
    
    expect(result.current.highlightedIndex).toBe(1);
  });

  test('handleKeyDown with ArrowUp decreases highlightedIndex', () => {
    const { result } = renderHook(() => useDropdown(defaultProps));
    
    // Open dropdown first
    act(() => {
      result.current.toggleDropdown();
    });
    
    // First set highlightedIndex to 2
    act(() => {
      result.current.handleKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() });
      result.current.handleKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() });
    });
    
    act(() => {
      result.current.handleKeyDown({ key: 'ArrowUp', preventDefault: jest.fn() });
    });
    
    expect(result.current.highlightedIndex).toBe(1);
  });

  test('handleKeyDown with Enter selects the highlighted option', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => 
      useDropdown({ ...defaultProps, onChange })
    );
    
    // Open dropdown first
    act(() => {
      result.current.toggleDropdown();
    });
    
    act(() => {
      result.current.handleKeyDown({ key: 'Enter', preventDefault: jest.fn() });
    });
    
    expect(onChange).toHaveBeenCalled();
  });

  test('handleKeyDown with Escape closes the dropdown', () => {
    const { result } = renderHook(() => useDropdown(defaultProps));
    
    // Open dropdown first
    act(() => {
      result.current.toggleDropdown();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.handleKeyDown({ key: 'Escape', preventDefault: jest.fn() });
    });
    
    expect(result.current.isOpen).toBe(false);
  });
});
