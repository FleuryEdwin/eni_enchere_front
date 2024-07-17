import { Header } from './Component/Header/Header.jsx';
import { Footer } from './Component/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import AuthProvider from './Context/AuthContext.jsx';

function App() {
    return (

                <AuthProvider>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </AuthProvider>

    );
}

export default App;
