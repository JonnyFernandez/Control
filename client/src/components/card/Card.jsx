import C from './Card.module.css'

const Card = () => {
    return (
        <div className={C.card}>
            <div className={C.image}>
                imager
            </div>
            <div className={C.description}>
                description
            </div>
            <div className={C.stock}>
                stock
            </div>
            {/* <div className={C.review}>
                reviews
            </div> */}
            <div className={C.price}>
                $ precio
            </div>
            <div className={C.likes}>❤️</div>
            <div className={C.buyNow}>Comrar ahora</div>
            <div className={C.addToCart}>Agregar al carroto</div>

        </div>
    )
}

export default Card
