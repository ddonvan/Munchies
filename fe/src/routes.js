import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import ManagerPage from "./pages/ManagerPage/ManagerPage";


export const OurRoutes = () =>{
    return (
        <Router>
            <Routes>
                <Route exact path = "/" element={<HomePage/>}>
                    
                </Route>
                <Route exact path = "/cart"  element={ <CartPage/>}>
                   
                </Route>

                <Route exact path = "/manager" element={<ManagerPage/>}>
                    
                </Route>
            </Routes>
        </Router>
    )
}