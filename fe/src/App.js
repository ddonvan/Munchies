import './App.css';
import {OurRoutes} from './routes';
// import { MenuComponent } from './components/menu/menu.component';

function App() {
  

  //Menu Item Filtering
  // const handleOrderClick= (restId) => {
  //   setSelectedRestId(restId);
  // };

  // const filteredMenuItems = selectedRestId ? menus.filter(item => item.rest_id === selectedRestId) : [];


  return (
    <div className="App">
      <OurRoutes/>
      
      

    </div>
  );
}

export default App;
