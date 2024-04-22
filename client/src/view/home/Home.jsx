import Nav from "../../components/nav/Nav"
import Footer from "../../components/footer/Footer"
import H from "./Home.module.css"
import Card3 from "../../components/card3/Card3"


const Home = () => {
    return (
        <div className={H.home}>
            <Nav />
            <div className={H.body}>
                <div className={H.botonera}>Botonera</div>
                <div className={H.container}>

                    <div className={H.containerCards}>
                        <Card3 />
                        <Card3 />
                        <Card3 />
                        <Card3 />
                        <Card3 />
                        <Card3 />
                        <Card3 />

                    </div>
                </div>


            </div>
            <Footer />

        </div>
    )
}


export default Home