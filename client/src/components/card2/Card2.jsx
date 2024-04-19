import c from './Card2.module.css'


const Card2 = () => {
    let image = "https://carrefourar.vtexassets.com/arquivos/ids/254852-1600-auto?v=637975513936830000&width=1600&height=auto&aspect=true "
    return (
        <div className={c.card}>
            <div className={c.container}>

                <div className={c.left}>
                    <h3>image</h3>
                </div>

                <div className={c.right}>
                    <div>descrition</div>
                    <div>Stock</div>
                    <div>Precio</div>
                    <div>Comprar Ahora</div>
                    <div>Agregar al carrito</div>
                </div>
                <div className={c.action}>
                    <div>❤️</div>
                    <div>C</div>
                </div>

            </div>
        </div>
    )
}


export default Card2