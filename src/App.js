import './App.css';

import DateRangePicker from './DateRangePicker';

const handleChange = (dates) => {
  console.log(dates)
}

function App() {
  return (
    <div className="App">
      <DateRangePicker onChange={(dates) => handleChange(dates)}/>
    </div>
  );
}

export default App;
