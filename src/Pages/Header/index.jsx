import styles from './Header.module.css';

export function Header(){

    return(
        <header>
            <div className={styles.container}>
                <h1>Tarefa 03</h1>
                <span>DIVISOR DE CONTA DE RESTAURANTE</span>
            </div>
        </header>
    )
}