import { ForkKnife } from "phosphor-react";
import styles from "./FinalNote.module.css";
import { useStatusContext } from "../../Context/useContext";
import productList from "../../Data/Product";


export function FinalNote({ canal }) {
    const currentProduct = item => item.name === product.name
    const channelProductsNames = item => item.name
    const names = canal.products.map(channelProductsNames)
    const priceProductList = (productList.map(pList => {
        if (names.find(name => name === pList.name)) {
            let {quantity} = canal.products.find(item => item.name === pList.name)
            console.log("🚀 ~ file: index.jsx ~ line 14 ~ priceProductList ~ quantity", quantity)
            return {...pList, quantity}
        }
    })).filter(Boolean)
    console.log("🚀 ~ file: index.jsx ~ line 16 ~ priceProductList ~ priceProductList", priceProductList)

    return (
        <main className={styles.mainSheet}>
            <div className={styles.note}>
                <div className={styles.infoRest}>
                    <span>Restaurante <ForkKnife size={20} /></span>
                    <p>Rua X , 10</p>
                    <p>Tel: 9999-9999</p>
                    <p>É um prazer servir os nossos clientes!</p>
                    <div className={styles.infoRestControl}>
                        <p>Mesa: {canal.tableNumber}</p>
                        <p>Clientes: {canal.clientQuantity}</p>
                    </div>
                </div>

                {canal.products.length > 0 && (
                    canal.products.map(product => {
                        return (
                        <div className={styles.bill}>
                            <p>{product.quantity}x</p>
                            <p>{product.name}</p>
                            <p>{(productList.find(item => item.name === product.name))?.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}</p>
                            {console.log("🚀 ~ file: index.jsx ~ line 31 ~ FinalNote ~ product", product)}
                        </div>
                        )
                    })
                )}

                <div className={styles.totalBill}>
                    <div className={styles.total}>
                        <p className={styles.totalNum}>Total <em>*sem a Tx. de serviço</em> :</p>
                        {priceProductList.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.quantity),
                                0).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                    </div>
                    <div className={styles.total}>
                        <span className={styles.totalTitle}>Total: 
                            <p className={styles.totalNumtwo}>
                                {priceProductList.reduce((previousValue, currentValue) => {
                                    const totalBill = previousValue + (currentValue.price * currentValue.quantity)
                                    const percent = (totalBill * 10)/100
                                        
                                    return totalBill + percent
                                },0).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    })}</p>                                   
                        </span>
                    </div>
                </div>


            </div>
        </main>
    )
}