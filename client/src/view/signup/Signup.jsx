import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/useAuth';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signup, isAutenticated, errors: RegisterErrors } = useAuth()

    useEffect(() => {
        if (isAutenticated) navigate('/home')
    }, [isAutenticated])

    const onSubmit = async (values) => {
        try {
            signup(values)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className=''>
            <div className=''>
                {
                    RegisterErrors.length >= 1 ? RegisterErrors.map((item, i) => <div key={i} className='bg-red-500 p-2 text-white'>{item}</div>) : ''
                }
                <h1 className=''>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='text'
                        {...register('username', { required: true })}
                        className=''
                        placeholder='Username'
                        autoComplete='off'
                        defaultValue='' // Campo de valor vacío

                    />
                    {errors.username && <p className=''>username is required</p>}
                    <input
                        type='email'
                        {...register('email', { required: true })}
                        className=''
                        placeholder='Email'
                        autoComplete='off'
                        defaultValue='' // Campo de valor vacío
                    />
                    {errors.email && <p className=''>email is required</p>}
                    <input
                        type='password'
                        {...register('password', { required: true })}
                        className=''
                        placeholder='Password'
                        autoComplete='off'
                        defaultValue='' // Campo de valor vacío
                    />
                    {errors.password && <p className=''>password is required</p>}
                    <input
                        type='text'
                        {...register('type', { required: true })}
                        className=''
                        placeholder='type'
                        autoComplete='off'
                        defaultValue='' // Campo de valor vacío
                    />
                    {errors.password && <p className=''>type is required</p>}


                    <button type='submit' className=''>Register</button>
                </form>
                <p className=''>Already have acount? <Link className='' to={'/login'}>Login</Link> </p>
            </div>
        </div>
    );
}


export default Signup