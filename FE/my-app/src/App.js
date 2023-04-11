//import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/login"
import Welcome from './components/Welcome/WelcomePage';
import {Route , Routes} from "react-router-dom"
function App() {
  return (
    <div >
      <Routes>
        < Route path = "/" exact element = {<Login/>}/>
        < Route path = "/" exact element = {<Welcome/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
