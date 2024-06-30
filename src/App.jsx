import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
//import Menu from './components/Menu';
import MenuWrapper from './components/MenuWrapper';
import StaffDashboard from './components/StaffDashboard';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/customer' element={<MenuWrapper />} />
        <Route path='/staff' element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
