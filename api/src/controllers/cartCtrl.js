const { ShoppingCart, Product, CartItem, User } = require('../db')
const { Op } = require('sequelize')
const utils = require('../utils/loader_info')
const transporter = require('../utils/mailer')



module.exports = {
    createCart: async (total, items, user) => {
        for (let i = 0; i < items.length; i++) {
            const existProd = await Product.findByPk(items[i].id);
            if (!existProd) {
                throw new Error('Product with id ' + items[i].id + ' does not exist');
            }
            // Verificar si hay suficiente stock
            if (existProd.stock < items[i].count) {
                throw new Error('Insufficient stock for product with id ' + items[i].id);
            }
        }
        const code = utils.codeCart();
        const newCart = await ShoppingCart.create({ total, user, code });
        // Agregar productos al carrito con sus cantidades asociadas y reducir el stock
        for (const item of items) {
            const product = await Product.findByPk(item.id);
            const cantidad = item.count;
            await newCart.addProduct(product, { through: { cantidad } });
            // Reducir el stock del producto
            await Product.update({ stock: parseFloat(product.stock) - cantidad }, { where: { id: parseFloat(product.id) } });
        }

        let arr = []

        for (let i = 0; i < items.length; i++) {
            const product = await Product.findByPk(items[i].id);
            const cantidad = items[i].count;
            arr.push({ name: product.name, code: product.code, price: product.off > 0 ? product.price * (1 - product.off) : product.price, count: cantidad })
        }

        // Construir la cadena HTML para los detalles de los productos y calcular el monto total de la compra
        let productosHTML = '<h2>Detalles del pedido:</h2>';
        let totalCompra = 0; // Variable para almacenar el monto total de la compra
        for (const item of arr) {
            const subtotal = item.count * item.price; // Calcular el subtotal para cada producto
            totalCompra += subtotal; // Agregar el subtotal al monto total de la compra
            productosHTML += `
                <p><strong>Nombre:</strong> ${item.name}</p>
                <p><strong>Código:</strong> ${item.code}</p>
                <p><strong>Precio:</strong> $${item.price}</p>
                <p><strong>Cantidad:</strong> ${item.count}</p>
                <p><strong>Subtotal:</strong> $${subtotal}</p>
                <br>
            `;
        }

        // Agregar el monto total al cuerpo del correo electrónico
        productosHTML += `<p><strong>Total de la compra:</strong> $${totalCompra}</p>`;

        const userEmail = await User.findByPk(user);
        const email = userEmail.email;

        //-----------------------------------------------------------------------------------

        await transporter.sendMail({
            from: '"Marelys" <arcancode@gmail.com>',
            to: email,
            subject: "¡Compra Efectuada! ✔",
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f0f0f0;
                                color: #333;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 20px;
                                background-color: #fff;
                                border-radius: 8px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #4285f4;
                            }
                            p {
                                line-height: 1.6;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>¡Bienvenido a Distribuidora Marelys!</h1>
                            <p>Hola</p>
                            <p>Estamos emocionados de tenerte como parte de nuestra comunidad. Explora nuestra variedad de productos, Bueno Bonito Barato.</p>
                            ${productosHTML} <!-- Insertar detalles de los productos aquí -->
                            <p>¡Gracias por tu compra!</p>
                            <p>Atentamente,<br>Jonny Fernandez <br> LinkedIn: <a href="https://www.linkedin.com/in/jonathan-fernandez-65a959277/">https://www.linkedin.com/in/jonathan-fernandez-65a959277/</a> <br> Github: <a href="https://github.com/JonnyFernandez">https://github.com/JonnyFernandez</a> <br> Portfolio: <a href="https://portfolio-t79v.vercel.app/">https://portfolio-t79v.vercel.app/</a> </p>
                        </div>
                    </body>
                </html>
            `,
        });

        //-----------------------------------------------------------------------------------

        return newCart;
    },


    getCart: async () => {
        const carts = await ShoppingCart.findAll({
            include: [{
                model: Product,
                attributes: ["id", "name", "code", "image", "cost", "off", "iva", "iibb", "others", "gain", "price"],
                through: {
                    model: CartItem,
                    attributes: ['cantidad'] // Incluye solo la cantidad de productos en el carrito
                }
            }]
        });


        // return carts
        return carts.map(item => {
            return {
                id: item.id,
                code: item.code,
                date: item.createdAt,
                userCart: item.user,
                total: item.Products.reduce((acc, current) => acc + (current.CartItem.cantidad * parseFloat(current.price)), 0),
                products: item.Products.map(item => {
                    return {
                        code: item.code,
                        name: item.name,
                        quantity: item.CartItem.cantidad,

                        price: (parseFloat(item.price * (1 - item.off))).toFixed(2),
                        realPrice: parseFloat(item.price).toFixed(2),
                        discount: parseFloat(item.price * (item.off) * item.CartItem.cantidad),
                        off: parseFloat(item.off),

                        image: item.image,
                        Subtotal: item.CartItem.cantidad * (parseFloat(item.price * (1 - item.off))).toFixed(2),
                    }
                }),
            }
        })




    },
    deleteCart: async (id) => {
        const aux = await ShoppingCart.destroy({ where: { id } })
        return `Delete Successfully ${aux} ♠`
    },
    getCodeCart: async (code) => {
        const aux = await ShoppingCart.findOne({
            where: {
                code: {
                    [Op.iLike]: "%" + code + "%"
                }
            },
            include: [{
                model: Product,
                attributes: ["id", "name", "code", "image", "cost", "off", "iva", "iibb", "others", "gain", "price"],
                through: {
                    model: CartItem,
                    attributes: ['cantidad'] // Incluye solo la cantidad de productos en el carrito
                }
            }]

        })
        if (!aux) throw new Error(`CodeCart: ${code}, non-existent`)
        // return aux
        return {
            id: aux.id,
            code: aux.code,
            date: aux.createdAt,
            userCart: aux.user,


            products: aux.Products.map(item => {
                return {
                    code: item.code,
                    name: item.name,
                    quantity: item.CartItem.cantidad,

                    price: (parseFloat(item.price * (1 - item.off))).toFixed(2),
                    realPrice: parseFloat(item.price).toFixed(2),
                    discount: parseFloat(item.price * (item.off) * item.CartItem.cantidad),
                    off: parseFloat(item.off),

                    image: item.image,
                    Subtotal: item.CartItem.cantidad * (parseFloat(item.price * (1 - item.off))).toFixed(2),
                }
            }),
        }
    }

}



