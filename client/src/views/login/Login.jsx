import p from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, isAuthenticated, errors: signinrErrors } = useAuth()


    useEffect(() => {
        if (isAuthenticated) navigate('/home')
    }, [isAuthenticated])

    const onSubmit = async (values) => {
        signin(values) //hace la peticion de login al back
        console.log(values);
    };



    return (
        <div className={p.login}>
            <div className={p.left}>
                <div className={p.header}>
                    <div className={p.imageContainer}>
                        <div className={p.image}>
                            <img src="../../IconOrange.ico" alt="" />
                        </div>
                    </div>
                    <div className={p.titleContainer}>Login</div>
                </div>
                <div className={p.formContainer}>
                    {
                        signinrErrors.length >= 1 ? signinrErrors.map((item, i) => <div key={i} className={p.errorsMessage}>{item}</div>) : ''
                    }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="">
                            <input type="email"  {...register('email', { required: true })} />
                            <p className={p.spanLogin}>Ingresar Email</p>
                        </label>
                        {errors.email && <p className={p.errorStr}>Email requerido</p>}
                        <label htmlFor="">
                            <input type="password"   {...register('password', { required: true })} />
                            <p className={p.spanLogin}>Ingresar Contraseña</p>
                        </label>
                        {errors.password && <p className={p.errorStr}>Contraseña requerida</p>}
                        <button type='submit' className={p.enviar}>Enviar</button>
                    </form>

                </div>
                <div className={p.footer}>
                    <p>No tienes una cuaneta? <Link to={'/register'}>Crear cuenta</Link> </p>

                </div>
            </div>
            <div className={p.right}>
                {/* <h1>imagen</h1> */}
            </div>
        </div>
    );
}

export default Login;
