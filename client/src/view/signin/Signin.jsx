import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signin, isAutenticated, errors: signinrErrors } = useAuth()


    useEffect(() => {
        if (isAutenticated) navigate('/home')
    }, [isAutenticated])



    const onSubmit = async (values) => {
        signin(values)
    };
    return (
        <div className='' >
            <div className=''>
                {
                    signinrErrors.length >= 1 ? signinrErrors.map((item, i) => <div key={i} className=''>{item}</div>) : ''
                }
                <h1 className=''>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='email'
                        {...register('email', { required: true })}
                        className=''
                        placeholder='Email'
                    />
                    {errors.email && <p className='text-red-500'>email is required</p>}
                    <input
                        type='password'
                        {...register('password', { required: true })}
                        className=''
                        placeholder='Password'
                    />
                    {errors.password && <p className=''>password is required</p>}


                    <button type='submit' className=''>Login</button>
                </form>
                <p className=''>Don´t have acount? <Link className='' to={'/register'}>Sign up</Link> </p>
            </div>

        </div>
    );
}


export default SignIn