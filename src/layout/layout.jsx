import { useLocation } from 'react-router-dom';
import Header from "../component/Header";
import Footer from "../component/Footer";
import Routers from "../routes/Routes";

const Layout = () => {
  const location = useLocation();

  // Periksa apakah pengguna berada di halaman Login atau Signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}

      <main>
        <Routers />
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;
