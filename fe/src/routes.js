import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';


export const OurRoutes = () =>{
    return (
        <Router>
            <Routes>
                <Route exact path = "/" element={<HomePage/>}>
                    
                </Route>
                <Route exact path = "/cart"  element={ <CartPage/>}>
                   
                </Route>
            </Routes>
        </Router>
    )
}