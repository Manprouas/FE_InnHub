import { useLocation } from 'react-router-dom';
import Footer from "../component/Footer";
import Routers from "../routes/Routes";
import '../App.css'
import Login from '../pages/Login';

const Layout = () => {
  const location = useLocation();
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
