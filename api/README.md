## Dependencias que podrias necesitar

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) // Encriptaciones
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser) // mejorar el formato de las cookies
- [Cors](https://www.npmjs.com/package/cors) // conexion con el front
- [Dotenv](https://www.npmjs.com/package/dotenv) // variables de entorno
- [Express](https://www.npmjs.com/package/express) // ¿Qué es la función Express?
  Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona mecanismos para: Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) // define un método compacto y autocontenido para la transmisión segura de información entre partes codificadas como un objeto JSON

- [Morgan](https://www.npmjs.com/package/morgan) // registrar solicitudes y respuestas HTTP
- [Nodemon](https://www.npmjs.com/package/nodemon) // monitorear cualquier cambio en su fuente de directorio y reiniciar automáticamente su servidor o aplicaciones
- [Zod](https://www.npmjs.com/package/zod) // es un una herramienta para validación de esquemas
- [Jest](https://jestjs.io/docs/getting-started) // crear, ejecutar y estructurar pruebas
- [Supertest](https://www.npmjs.com/package/supertest) // se encarga de que la aplicación que se está probando se inicie en el puerto que utiliza internamente
- [Nodemailer](https://nodemailer.com/) // te permite enviar emails desde tu servidor con facilidad
- [Swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) //una serie de reglas, especificaciones y herramientas que nos ayudan a documentar nuestras APIs
- [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) // Transforma tus comentarios en el código fuente en documentación legible y estructurada para tus API

## install all

```
npm install bcryptjs cookie-parser cors dotenv express jsonwebtoken morgan nodemon zod nodemailer swagger-ui-express swagger-jsdoc sequelize pg pg-hstore axios
```

### DBMS

#### En caso que trabajes con PostgreSQL

- [Sequelize](https://www.npmjs.com/package/sequelize) //es un ORM para Nodejs que nos permite manipular varias bases de datos SQL de una manera bastante sencilla, entre estas bases de datos podemos encontrar: mysql, sqlite, postgres, mssql
- [pg](https://www.npmjs.com/package/pg) // Sequelize proporciona la funcionalidad ORM y la interfaz para interactuar con tu base de datos, mientras que el paquete pg proporciona la conexión a la base de datos PostgreSQL y las funciones necesarias para ejecutar las consultas SQL generadas por Sequelize.
- [pg-hstore](https://www.npmjs.com/package/pg-hstore)

#### Login POST: `http://localhost:3001/api/auth/login`

```
{
"email":"code1@gmail.",
"password":"123456"
}
```

#### Register POST: `http://localhost:3001/api/auth/register`

```
{
"email":"code1@gmail.com",
"password":"123456",
"username":"goodnight",
"type": "admin"
}
```

#### Cerrar seccion POST: `http://localhost:3001/api/auth/logout`

#### Perfil GET: `http://localhost:3001/api/auth/profile`

#### Verify token GET: `http://localhost:3001/api/auth/verify`

# Request

### Products:

- GET `http://localhost:3001/api/prod/` _get all_
- GET `http://localhost:3001/api/prod?name=papa` _get by Name_
- GET `http://localhost:3001/api/prod/123` _get by Code_
- POST `http://localhost:3001/api/prod/` _create prod_

```
{
  "name":"Servilleta intercalada",
  "image":"imagen",
  "description":"cloro vacano pa pileta",
  "brand": "clorokin",
  "distributor": "Cofil",
  "stock":1000,
  "cost":1000,
  "off":0.1,
  "category":"limpieza",
  "iva":0.21,
  "iibb": 0.025,
  "others": 0.1,
  "gain": 0.6
}
```

- PUT `http://localhost:3001/api/prod/2` _update prod_

```
//no necesariamente tengo que enviar todo, puedo enviar solo lo que necesito modificar
{
  "name":"trapo de piso",
  "image":"imagen",
  "description":"cloro vacano pa pileta",
  "brand": "clorokin",
  "distributor": "Cofil",
  "stock":1000,
  "cost":200,
  "category":"limpieza",
  "iva":0.21,
  "iibb": 0.025,
  "others": 0.1,
  "gain": 0.6
}

```

- PUT `http://localhost:3001/api/prod/5` _Agregar porcentade de despuesto a un prod_

```
{
    "off":0.1,
}
```

- PUT `http://localhost:3001/api/prod/category/55` _agregar porcentaje de descuento a toda una categoria_

```
{
  // agregar porcentaje Costs por categoria
   "off": 0.1,
  "category":"quimica"
}
```

- PUT `http://localhost:3001/api/prod/addPorcent/14` _agregar o restar porcentaje al precio base toda una categoria_

```
{
  // Actualizaciond e Off por categoria
  "percent":0.1,
  "category": "quimica"
}
```

- DELETE `http://localhost:3001/api/prod/1` _eliminar prod_

## Reviews

- GET `http://localhost:3001/api/review/` _Get all Review_
- DELETE `http://localhost:3001/api/review/1` _delete Review_
- POST `http://localhost:3001/api/review/` _Create Review_

```
//reseña a la pagina
{
    "review":"hola mundo"
}
```

```
//reseña a un producto
{
    "review":"un lindo producto",
    "productId":1
}
```

## Like

- POST `http://localhost:3001/api/like/`

```
{
    "prodId":1
}
```

- DELETE `http://localhost:3001/api/like/9`

## ShoppingCart:

- POST `http://localhost:3001/api/cart/` _Create Cart_

```
{
  "total":100.4,
   "items":[{"id":7,"count":1100},{"id":8,"count":8000},{"id":9,"count":777}]
}
```

- GET `http://localhost:3001/api/cart/` _get all_
- GET `http://localhost:3001/api/cart/C-9749` _get cart by code_
- DELETE `http://localhost:3001/api/cart/1` _delete cart_

## Product Statistics

- GET `http://localhost:3001/api/productStatistics/`
