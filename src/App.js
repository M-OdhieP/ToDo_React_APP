import logo from "./logo.svg";
import "./App.css";
import Welcome from "./Welcome";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="" />
      <Welcome>Halo</Welcome>
    </div>
  );
}

export default App;
