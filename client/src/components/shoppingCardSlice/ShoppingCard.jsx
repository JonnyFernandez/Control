import { useState } from 'react';
import style from './ShoppingCard.module.css';

const ShoppingCard = (props) => {
    const { id, name, image, price, stock } = props
    const [quanty, setQuanty] = useState(1);

    const deleteIntem = () => alert('borrando item')

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
                    <p>Precio: ${price}</p>
                </div>

                <div className={style.quantyAndDelete}>
                    <div className={style.quantyDiv}>
                        {quanty > 1 ? <div className={style.less} onClick={() => setQuanty(prev => prev - 1)}>-</div> : ''}
                        <div>{quanty}</div>
                        <div className={style.more} onClick={() => setQuanty(prev => prev + 1)}>+</div>

                    </div>
                    <div className={style.deleteDiv}>
                        <div onClick={deleteIntem} className={style.deleteItem}>Eliminar</div>
                    </div>
                </div>

                <span>stock:{stock}</span>
            </div>

        </div>
    );
};

export default ShoppingCard;
