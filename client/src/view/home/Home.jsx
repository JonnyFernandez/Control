import Nav from "../../components/nav/Nav"
import Footer from "../../components/footer/Footer"
import H from "./Home.module.css"


const Home = () => {
    return (
        <div className={H.home}>
            <Nav />
            <div className={H.body}>

            </div>
            <Footer />

        </div>
    )
}


export default Home