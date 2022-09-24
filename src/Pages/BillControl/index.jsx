import { useState } from "react";
import { useStatusContext } from "../../Context/useContext";
import StatusContext from '../../Context/useContext';
import productList from "../../Data/Product";
import tableList from "../../Data/Table"
import styles from './BillControl.module.css';
import { FinalNote } from "../FinalNote/index";

export function BillControl(){
    const [orders, setOrders] = useState([])   
    const [order, setOrder] = useState({
        tableNumber: 1,
        clientQuantity: '1',
        product: '',
        quantity: '1'
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        setOrders(prev => {
            if(prev.some(currentOrder => currentOrder.tableNumber === order.tableNumber)){
                return prev.map(currentOrder => {
                    if(currentOrder.tableNumber !== order.tableNumber){
                        return currentOrder
                    }
                    if(currentOrder.products.some(product => product.name === order.product)){
                        return({
                            ...currentOrder, 
                            clientQuantity: order.clientQuantity,
                            products: currentOrder.products.map(product => {
                                if(product.name !== order.product){
                                    return product
                                } 
                                return {...product, quantity: product.quantity + Number(order.quantity)}
                            })
                        })
                    }else {
                        return({
                            ...currentOrder,
                            clientQuantity: order.clientQuantity,
                            products: [...currentOrder.products, {name: order.product, quantity: Number(order.quantity)}]
                        })
                    }
                })
            }else {
                return [
                    ...prev,
                    {
                        tableNumber: order.tableNumber,
                        clientQuantity: order.clientQuantity,
                        products: [{name: order.product, quantity: Number(order.quantity)}]
                    }
                ]
            }
        })
    }

    return(
        <StatusContext>
            <main className={styles.mainSheet}>
                <div className={styles.generalContainer}>
                    <div className={styles.title}>
                        <span>Bill Control</span>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.restInfo}>
                            <div className={styles.table}>
                                <label htmlFor="mesa">Mesa:</label>
                                <select value={order.tableNumber} name="mesa" className={styles.selectStyles} 
                                onChange={(e) => setOrder(prev => ({...prev, tableNumber: e.target.value}))}>
                                    {tableList.map((numb, index) => (
                                        <option key={index} value={numb.table}>{numb.table}</option>
                                    ))}
                                </select>
                            </div>
                                        
                            <div className={styles.clientsBox}>
                                <label htmlFor="clientes">Clientes:</label>
                                <input className={styles.inputClient} value={order.clientQuantity} type="number" min='1' onChange={(e) => setOrder(prev => ({...prev, clientQuantity: e.target.value}))}/>
                            </div>
                        </div>

                        <div className={styles.pqtd}>
                            <div className={styles.crossPQ}>
                                <div className={styles.pdiv}>
                                    <label htmlFor="product">Produto:</label>
                                    <select value={order.product} className={styles.selectOptions} onChange={(e) => setOrder(prev => ({...prev, product: e.target.value}))}>
                                        {productList.map((item,index) =>(
                                            <option key={index} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.quantBox}>
                                    <label htmlFor="qtd">Quantidade:</label>
                                    <input className={styles.inputClient} 
                                        type="number" min="1" 
                                        value={order.quantity}
                                        onChange={(e) => setOrder(prev => ({...prev, quantity: e.target.value}))}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <button className={styles.inputADD} type='submit' >Adicionar produto</button> 
                            </div>
                        </div>

                    </form>
                </div>
                {orders.length > 0 && (
                    orders.map((currentOrder, index) => (
                        <FinalNote 
                            key={index}
                            canal={currentOrder}
                        />
                    ))
                )}
            </main>
        </StatusContext>
        
    )
}