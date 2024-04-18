import Nav from "../../components/nav/Nav"
import Footer from "../../components/footer/Footer"
import H from "./Home.module.css"
import Card from "../../components/card/Card"


const Home = () => {
    return (
        <div className={H.home}>
            <Nav />
            <div className={H.body}>
                <div className={H.bodyHeader}></div>
                <div className={H.container}>
                    <div className={H.cardContainer}>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>

                </div>
            </div>
            <Footer />

        </div>
    )
}


export default Home