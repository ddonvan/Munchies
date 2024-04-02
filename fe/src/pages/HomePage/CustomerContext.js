import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomerIdContext = createContext();

export const useCustomerId = () => useContext(CustomerIdContext);

export const CustomerIdProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('');

    //Customer fetching
    useEffect(() => {
      const fetchCustomers = async () => {
        const response = await axios.get(
          'http://localhost:8000/customers'
        );
        setCustomers(response.data);
      };
      fetchCustomers();
    }, []);

    const handleCustomerSelect = (e) => {
      const selectedCustomerId = e.target.selectedIndex-1;
      const selectedCustomer = customers[selectedCustomerId];
      const cId = selectedCustomer ? selectedCustomer["_id"]: '';
      console.log(cId);
      setCustomerId(cId);
    }

    return (
        <CustomerIdContext.Provider value={{ customerId, setCustomerId, handleCustomerSelect, customers}}>
            {children}
        </CustomerIdContext.Provider>
    );
};