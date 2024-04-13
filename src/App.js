import './App.css';

import DateRangePicker from './DateRangePicker';

const handleChange = (dateRange, weekendsInRange) => {
  console.log(dateRange, weekendsInRange)
}

function App() {
  return (
    <div className="App">
      <DateRangePicker onChange={handleChange}/>
    </div>
  );
}

export default App;
