import { Header } from './Component/Header/Header.jsx';
import { Footer } from './Component/Footer/Footer.jsx';
import './App.css';
import './EnchereHome.css';
import { Outlet} from "react-router-dom";

function App(){

    return (
        <div className="App">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
