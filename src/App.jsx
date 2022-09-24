import {Header} from './Pages/Header/index.jsx'
import StatusContext from './Context/useContext'
import './global.css'
import { BillControl } from './Pages/BillControl/index.jsx'
import { FinalNote } from './Pages/FinalNote/index.jsx'

export function App() {


  return (
    <StatusContext>
        <main>
          <header>
            <Header/>
          </header>
          <div>
            <BillControl/>
          </div>
        </main>
    </StatusContext>
  )
}


