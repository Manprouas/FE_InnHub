import { useLocation } from 'react-router-dom';
import Footer from "../component/Footer";
import Header from "../component/Header";
import Routers from "../routes/Routes";

const Layout = () => {
    const location = useLocation();

    // Cek apakah path saat ini adalah "/login" atau "/signup"
    const isAuthPage = location.pathname === "/Login" || location.pathname === "/Signup";

    return (
        <>
            {!isAuthPage && <Header />}
            <main>
                <Routers />
            </main>
            {!isAuthPage && <Footer />}
        </>
    );
}

export default Layout;
