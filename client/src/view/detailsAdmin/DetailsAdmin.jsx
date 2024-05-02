import d from './DetailsAdmin.module.css'
import { useParams, useLocation } from 'react-router-dom'
import { NavAdmin } from '../../components/componentAdmin'
import Footer from '../../components/footer/Footer'

const DetailsAdmin = () => {
    const { id } = useParams()
    const location = useLocation();

    return (
        <div>
            <NavAdmin />
            <div className={d.bodyAdmin}>
                <div className={d.container}>
                    <div className={d.left}></div>
                    <div className={d.right}></div>
                </div>
                <div className={d.prodRelations}></div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailsAdmin