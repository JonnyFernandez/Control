const { z } = require("zod");

const postProdSchema = z.object({
    name: z
        .string({ required_error: "name is required" }).min(3, { message: "Name must be at least 3 characters" }),

    image: z.string({ required_error: "image is required" }),

    description: z
        .string({ required_error: "description is required" }),

    brand: z
        .string({ required_error: "brand is required" }).optional(),
    distributor: z
        .string({ required_error: "distributor is required" }).optional(),
    stock: z
        .number({ required_error: "stock is required" }),
    cost: z
        .number({ required_error: "cost is required" }),
    off: z
        .number({ required_error: "off is required" }).optional(),

    category: z
        .string({ required_error: 'category is required' }).refine(value => ['libreria', 'limpieza', 'otros', 'jugueteria', 'quimica', 'sueltos', 'piscina', 'bazar', 'plasticos', 'perfumeria', 'indumentaria'].includes(value), {
            message: "Invalid category value, must be one of: 'libreria', 'limpieza', 'otros', 'jugueteria', 'quimica', 'sueltos', 'piscina', 'bazar', 'plasticos', 'perfumeria', 'indumentaria' "
        }),
    iva: z
        .number({ required_error: "iva is required" }).optional(),
    iibb: z
        .number({ required_error: "iibb is required" }).optional(),
    others: z
        .number({ required_error: "others is required" }).optional(),
    gain: z
        .number({ required_error: "gain is required" }).optional(),

});
const updateProdSchema = z.object({
    name: z
        .string({ required_error: "name is required" }).optional(),

    image: z.string({ required_error: "image is required" }).optional(),

    description: z
        .string({ required_error: "description is required" }).optional(),

    brand: z
        .string({ required_error: "brand is required" }).optional(),
    distributor: z
        .string({ required_error: "distributor is required" }).optional(),
    stock: z
        .number({ required_error: "stock is required" }).optional(),
    cost: z
        .number({ required_error: "cost is required" }).optional(),
    off: z
        .number({ required_error: "off is required" }).optional(),

    category: z
        .string({ required_error: 'gender is required' }).refine(value => ['libreria', 'limpieza', 'otros', 'jugueteria', 'quimica', 'sueltos', 'piscina', 'bazar', 'plasticos', 'perfumeria', 'indumentaria'].includes(value), {
            message: "Invalid category value, must be one of: 'libreria', 'limpieza', 'otros', 'jugueteria', 'quimica', 'sueltos', 'piscina', 'bazar', 'plasticos', 'perfumeria', 'indumentaria' "
        }).optional(),
    iva: z
        .number({ required_error: "iva is required" }).optional(),
    iibb: z
        .number({ required_error: "iibb is required" }).optional(),
    others: z
        .number({ required_error: "others is required" }).optional(),
    gain: z
        .number({ required_error: "gain is required" }).optional(),

});


module.exports = { postProdSchema, updateProdSchema };
