const { z } = require('zod')

const registerSchema = z.object({
    username: z.string({ required_error: 'Username is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters' }),
    type: z.string({ required_error: 'Type is required' }).refine(value => ["admin", "client", "seller"].includes(value), {
        message: 'Invalid type value, must be one of: "admin", "client", "seller"'
    }).optional(),
});


const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email..' }),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters' })
});


module.exports = { registerSchema, loginSchema }