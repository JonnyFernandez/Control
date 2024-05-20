import style from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';


const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth()

    useEffect(() => {
        if (isAuthenticated) navigate('/home')
    }, [isAuthenticated])


    const onSubmit = async (values) => {
        signup(values) //hace la peticion de login al back
        console.log(values);
    };
    return (
        <div className={style.Register}>
            <div className={style.left}>
                <div className={style.header}>
                    <div className={style.imageContainer}>
                        <div className={style.image}>
                            <img src="../../IconOrange.ico" alt="" />
                        </div>
                    </div>
                    <div className={style.titleContainer}>Register</div>
                </div>
                <div className={style.formContainer}>
                    {
                        RegisterErrors.length >= 1 ? RegisterErrors.map((item, i) => <div key={i} className={style.errorsMessage}>{item}</div>) : ''
                    }

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="">
                            <input type="name"  {...register('username', { required: true })} />
                            <span>Ingresar Nombre</span>
                        </label>
                        {errors.username && <p className={style.errorStr}>Nombre requerido</p>}
                        <label htmlFor="">
                            <input type="email"  {...register('email', { required: true })} />
                            <span>Ingresar Email</span>
                        </label>
                        {errors.email && <p className={style.errorStr}>Email requerido</p>}

                        <label htmlFor="">
                            <input type="password"  {...register('password', { required: true })} />
                            <span>Ingresar Contraseña</span>
                        </label>
                        {errors.password && <p className={style.errorStr}>Contraseña requerida</p>}
                        <button type='submit' className={style.enviar}>Enviar</button>
                    </form>

                </div>
                <div className={style.footer}>
                    <p> <Link to={'/login'}>Ya tengo una cuenta</Link> </p>

                </div>
            </div>
            <div className={style.right}>
                {/* <h1>imagen</h1> */}
            </div>
        </div>
    );
}

export default Register;
