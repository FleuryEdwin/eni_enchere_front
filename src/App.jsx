import  { useState } from 'react';
import { Header } from './Component/Header/Header.jsx';
import { Footer } from './Component/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { userContext } from './Context/AuthContext.jsx';

function App() {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    return (
        <userContext.Provider value={{ user, login }}>
            <div className="App">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </userContext.Provider>
    );
}


export default App;
