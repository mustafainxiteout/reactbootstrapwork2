import React from 'react';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Userpage from './components/Userpage';
import Adminpage from './components/Adminpage';
import NewPage from './components/NewPage';
import BPage from './components/BPage';
import Dashboard from './components/Dashboard';
import PrivateRoute from './Privateroute';


const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = true;
root.render(
  <Router>
  <Routes>
    <Route path='/' element={<App isAdmin={isAdmin}/>}/>
    <Route exact path="/" element={<PrivateRoute/>}><Route exact path="/Userpage" element={isAdmin ?  <Navigate to="/" />: <Userpage/>} isAdmin={isAdmin}/></Route>
    <Route exact path="/" element={<PrivateRoute/>}><Route exact path="/Admin/Dashboard" element={isAdmin ? <Adminpage navi={<Dashboard/>}/> : <Navigate to="/" />} isAdmin={isAdmin}/></Route>
    <Route exact path='/Admin/NewPage' element={<Adminpage navi={<NewPage/>}/>}/>
    <Route exact path='/Admin/NewPage/:pageId' element={<Adminpage navi={<BPage/>}/>}/>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
