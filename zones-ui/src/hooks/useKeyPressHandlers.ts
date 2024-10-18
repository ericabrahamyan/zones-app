import { useEffect } from 'react';

const useKeyPressHandlers = ({
  onEscape,
  onEnter,
}: {
  onEscape?: () => void;
  onEnter?: () => void;
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape();
      } else if (event.key === 'Enter' && onEnter) {
        onEnter();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onEscape, onEnter]);
};

export default useKeyPressHandlers;
