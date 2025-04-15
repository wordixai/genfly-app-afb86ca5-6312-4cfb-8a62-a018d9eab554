import { useState } from 'react';
import { Calculator, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const CalculatorApp = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const { theme, setTheme } = useTheme();

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('0');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', '⌫'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Calculator</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="mb-4 p-4 rounded-md bg-muted">
          <div className="text-right text-sm text-muted-foreground h-6 overflow-x-auto">
            {input || '0'}
          </div>
          <div className="text-right text-3xl font-bold overflow-x-auto">
            {result}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <Button
              key={btn}
              variant={btn === '=' ? 'default' : 'outline'}
              size="lg"
              onClick={() => handleButtonClick(btn)}
              className={`${btn === '=' ? 'bg-primary' : ''} text-lg`}
            >
              {btn}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;