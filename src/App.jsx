import {Header} from './Component/Header/Header.jsx';
import {Footer} from './Component/Footer/Footer.jsx';
import './App.css';
import './EnchereHome.css';
import {useEffect, useState} from "react";
//import {AuctionList} from "./Component/Auction/AuctionList.jsx";
import {Outlet} from "react-router-dom";

function App() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/categories').then(response => response.json()).then(data => {
            console.log(data)
            setCategories(data);
        }).catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="App">
            <Header/>
            <main>

                <Outlet/>

            </main>
            <Footer/>
        </div>
    );
}

export default App;
