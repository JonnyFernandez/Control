const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const onlyUlrs = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|data:image\/(jpeg|png|gif|bmp|svg\+xml);base64,[A-Za-z0-9+/]+=*$/;

export default function Validation(input) {
    let errors = {};

    // Name
    if (input.name) {
        if (input.name.length === 1) {
            errors.name = "Nombre Corto";
        }

        if (input.name.length === 0) {
            errors.name = "Nombre Requerido";
        }
        if (input.name.length < 4) {
            errors.name = "Minimo 4 caracteres";
        }

    } else {
        errors.name = "Nombre es Requerido";
    }
    // Description
    if (input.description.length === 0) {
        errors.description = "Descripcion es Requerida";
    }
    // stock
    if (input.stock == 0) {
        errors.stock = "stock es Requerido";
    }
    // cost
    if (input.cost == 0) {
        errors.cost = "costo es Requerido";
    }


    // Category
    if (input.category.length === 0) {
        errors.category = "Seleccionar Categoria";
    }









    return errors;
}