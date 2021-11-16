import React from "react";
import Header from "./components/header";
import Tasks from "./components/tasks";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Tasks />
      </header>
    </div>
  );
}

export default App;
