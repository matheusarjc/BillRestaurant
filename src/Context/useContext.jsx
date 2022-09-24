import { createContext, useContext, useState } from "react";

const StatusContext = createContext({
    tableNumber: '',
    setTableNumber:'',
    clientQuantity: '', 
    setClientQuantity:'',
    selectValue: [],
    setSelectValue: '',
    quantity:'',
    setQuantity:'',

})

function GlobalStatus({ children }) {
    const [tableNumber, setTableNumber] = useState();
    const [clientQuantity, setClientQuantity] = useState();
    const [selectValue, setSelectValue]= useState([]);
    const [quantity, setQuantity] = useState([]);
    return <StatusContext.Provider 
        value={{
            tableNumber,
            setTableNumber,
            clientQuantity,
            setClientQuantity,
            selectValue,
            setSelectValue,
            quantity,
            setQuantity,
        }}>
        {children}
    </StatusContext.Provider>
}

export const useStatusContext = () => useContext(StatusContext);
export default GlobalStatus;