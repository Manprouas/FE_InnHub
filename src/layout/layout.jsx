import { useLocation } from 'react-router-dom';
import Footer from "../component/Footer";
import Routers from "../routes/Routes";
import '../App.css'

const Layout = () => {
  const location = useLocation();

  // Periksa apakah pengguna berada di halaman Login atau Signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <main>
        <Routers />
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;
