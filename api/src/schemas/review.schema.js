const { z } = require('zod')

const reviewSchema = z.object({
    review: z.string({ required_error: 'review is required' }),
    productId: z.number({ required_error: 'productId is required' }).optional(),
});


module.exports = { reviewSchema }

