import React from "react";
import "./App.css";
import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
function App() {
  return (
    <div className="App">
      <LoginContainer />
      <RegisterContainer />
    </div>
  );
}

export default App;
