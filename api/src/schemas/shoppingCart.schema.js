const { z } = require('zod');

const cartItemSchema = z.object({
    id: z.number().int().positive(),
    count: z.number().int().positive()
});

const shoppingCartSchema = z.object({
    total: z.number().positive().optional(),
    items: z.array(cartItemSchema)
});

module.exports = { shoppingCartSchema };
