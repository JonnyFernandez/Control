import z from './BuyNow.module.css'
import { useParams } from "react-router-dom"

const BuyNow = () => {
    const { id } = useParams()

    return (
        <div className={z.buy}>
            <div className={z.header}>
                <div>back</div>
                <div>Logo</div>
                <div>More items</div>
            </div>

            <div className={z.body}>

                <div className={z.prodContainer}>
                    <div className={z.left}>{id}</div>
                    <div className={z.right}></div>
                </div>

            </div>

            <div className={z.reviews}>reviews</div>

            <div className={z.similarProd}>prod similares</div>
            {/* <div className={z.footer}>footer</div> */}
        </div>
    )
}

export default BuyNow