import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/css/page.css";
import Header from "./components/Header.js";
import Mainpage from "./pages/Mainpage.js";
import SyllabusForm from "./components/SyllabusForm.js";



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route >
          <div>
            <Header/>
          </div>
          <div className="App">
            <Mainpage />
          </div>
        </Route>
      
      </Switch>
      
      <div className="Syllabus">
      <h1>My Syllabus Application</h1><SyllabusForm/>
      </div>
    </BrowserRouter>
  );
}



export default App;
