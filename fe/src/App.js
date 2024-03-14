import logo from './logo.svg';
import './App.css';
import MenuComponent from './menu/menu.component';

function App() {
  return (
    <div className="App">
      <h2> Ordering App</h2>

      <div className='Menu'>
        <h3>Menu List</h3>
        <MenuComponent></MenuComponent>
      </div>

    </div>
  );
}

export default App;
