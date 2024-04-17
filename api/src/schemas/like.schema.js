const { z } = require('zod')

const likeSchema = z.object({
    prodId: z.number({ required_error: 'prodId is required' })
});



module.exports = { likeSchema }