import c from './Card2.module.css'


const Card2 = (props) => {

    return (
        <div className={c.cardList}>
            <div className={c.item1}>Cod: {props.code || "Codigo"}</div>
            <div className={c.item1}>{props.name || "Nombre"}</div>
            <div className={c.item1}>Precio: {props.price || "Precio"}</div>
            <div className={c.item1}>Categoria: {props.category || "Categoria"}</div>
            <div className={c.item1}>Stock: {props.stock || "stock"}</div>
            <div className={c.item1}>Like: {props.likes.length}</div>
            <div className={c.item1}>Reseña: {props.reviews.length}</div>
            <div className={c.item1}>detalle</div>
        </div>
    )
}


export default Card2