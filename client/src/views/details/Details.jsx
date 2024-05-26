import z from './Details.module.css'
import { useParams } from "react-router-dom"
import { NavLink } from 'react-router-dom'

const Details = () => {
    const { id } = useParams()

    return (
        <div className={z.buy}>
            <div className={z.header}>
                <NavLink to={'/home'}>Back</NavLink>
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

export default Details