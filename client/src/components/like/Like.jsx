import b from './Like.module.css'
import Card from '../card/Card'
import { useSelector } from 'react-redux'


const Like = () => {
    const fav = useSelector(state => state.prod.favorites)
    // console.log(fav);

    const cardsShowed = fav.filter(item => item.status === true);
    const ShowFav = () => {
        if (cardsShowed.length >= 1) {
            return cardsShowed.map(item => (
                <div key={item.id}>
                    <Card id={item.id} name={item.name} price={item.price} image={item.image} />
                </div>
            ));
        } else {
            return <h2>No tienes favoritos aun </h2>;
        }
    }


    return (
        <div className={b.like}>
            <h2 className={b.title}> Favoritos </h2>
            {ShowFav()}

        </div>
    )
}


export default Like