import Footer from "../component/Footer"
import Header from "../component/Header"
import Routers from "../routes/Routes"

const Layout = () => {
    return (
        <>
            <Header/>
            <main>
                <Routers/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout