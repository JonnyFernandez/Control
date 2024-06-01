import { useEffect, useState } from 'react';
import style from './ShoppingCard.module.css';
import { removeCard, deleteQuantity, updateQuantity } from '../../redux/prodSlice';
import { useDispatch } from 'react-redux';



const ShoppingCard = (props) => {
    const dispatch = useDispatch()

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedQuantity = JSON.parse(localStorage.getItem('quanty')) || [];

    const { id, name, image, price, stock } = props
    const [quantityOptions, setQuantityOptions] = useState([]);


    const deleteIntem = () => {
        dispatch(removeCard(id))
        dispatch(deleteQuantity(id))

        const updatedCart = storedCart.filter(item => item.id !== id)
        const updatedQuanty = storedQuantity.filter(item => item.id !== id)

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('quanty', JSON.stringify(updatedQuanty));
    }

    useEffect(() => {
        const options = Array.from({ length: stock }, (_, i) => i + 1)
        setQuantityOptions(options)
    }, [])

    const handleQuantity = (event) => {
        const { value } = event.target
        const data = { id: id, count: Number(value) }

        dispatch(updateQuantity(data))

    }


    return (
        <div className={style.shoppingCard}>
            <div className={style.imageContainer}>
                <img src={image} alt="" />
            </div>

            <div className={style.infoContainer}>

                <div className={style.name}>
                    <p>{name}</p>
                </div>

                <div className={style.price}>
                    <p>Precio: ${Number(price).toLocaleString('es-ES')}</p>
                </div>

                <div className={style.quantyAndDelete}>
                    <div className={style.quantyDiv}>
                        <div className={style.cantidad}>Cantidad:</div>
                        <select name="quantity" id="quantity" onChange={handleQuantity}>
                            <option value="">Cantidad</option>
                            {quantityOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>


                    </div>
                    <div className={style.deleteDiv}>
                        <div className={style.stock}>stock: {stock}</div>
                        <div onClick={deleteIntem} className={style.deleteItem}>Eliminar</div>
                    </div>
                </div>

                {/* <span>Stock: {stock}</span> */}
            </div>

        </div>
    );
};

export default ShoppingCard;
