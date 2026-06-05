import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Toggle dark mode">
      <Icon className="h-4 w-4" />
    </button>
  );
};

export default ThemeToggle;
