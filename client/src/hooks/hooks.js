
export const useDebounce = (func,timeoutRef) => {

    // Clear previous timeout if the user is typing quickly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update debouncedValue after 2000ms
    timeoutRef.current = setTimeout(() => {
        func();

    }, 2000); // 2000ms debounce delay
  };
