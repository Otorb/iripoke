import './App.css';
import Home from './Components/Home/Home'
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create'
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element= {<Home/>}/> 
      <Route path="/:id" element={<Detail /> } />
      <Route path="/create" element={<Create /> } />
      </Routes>
    </div>
  );
}

export default App;
