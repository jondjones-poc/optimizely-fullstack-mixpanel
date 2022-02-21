import "../styles/globals.scss";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyApp({Component, pageProps}) {
    return <div className="app">
        <Header/>
        <Component {...pageProps} />
        <Footer/>
    </div>
}

export default MyApp
