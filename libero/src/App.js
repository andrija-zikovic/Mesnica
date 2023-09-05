import './App.css';
import Nav from './Nav'
import Header from './Header';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Nav />
      <Header title={"Mesnica"} />
      <Home />
    </div>
  );
}

export default App;
