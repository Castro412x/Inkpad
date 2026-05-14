import { useState, useEffect, } from "react";
import { useDebounce } from "use-debounce";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    // Perform action with debounced value
  }, [debouncedValue]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Inkpad App</h1>
        <p className="text-sm text-slate-600">
          A quick and Beautiful note taking App <code>App.jsx</code>.
        </p>
      </div>
    </div>
  );
}

export default App;
