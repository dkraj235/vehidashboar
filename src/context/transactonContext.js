import { createContext, useEffect, useState } from "react";
import axios from "axios"

const TransactionContext = createContext();
const TransactionProvider = ({ children }) => {
    const [transactionData, setTransactionData] = useState();
    useEffect(() => {
        fetchTransactionData().then(data => {
            setTransactionData(data);
        });
    }, []);

    const fetchTransactionData = async () => {
        let baseUrl;
        if (process.env.NODE_ENV === 'development') {
            baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
        } else {
            baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
        }
        try {
            const response = await axios.get(`${baseUrl}/wallet/transactions`);
            return response.data
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    }
    return (
        <TransactionContext.Provider value={{ transactionData, setTransactionData }}>
            {children}
        </TransactionContext.Provider>
    )
}

export { TransactionContext, TransactionProvider }
