import c from './CreateProd.module.css'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
// import { useTasks } from '../context/TaskContext' funcion para enviar la peticion

const CreateProd = () => {


    const navigate = useNavigate()
    const params = useParams()

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    // const { createTask, getTask, updateTask } = useTasks()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                // const task = await getTask(params.id)
                // seteo los valores del input 
                setValue('title', task.title)
                setValue('description', task.description)
            }
        }
        loadTask()
    }, [])

    const onSubmit = async (values) => {
        console.log(values);
        // if (params.id) {
        //     updateTask(params.id, values)
        // } else {
        //     createTask(values)
        // }
        // navigate('/task')
    };

    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No se ha seleccionado ningún archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'assistt_file');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkx6y2e2z/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setValue('image', response.data.secure_url); // Aquí actualizamos el valor del campo 'image' con la URL de la imagen
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Error al cargar la imagen. Inténtalo de nuevo.');
        }
    };

    return (
        <div className={c.prod} >
            <div className={c.container}>

                <h1 className={c.title1}>Ingresar Producto</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={c.formulario}>

                    {/* <label htmlFor="name">Nombre</label> */}
                    <input type="name"  {...register('name', { required: false })} className={c.inputs} placeholder='Nombre' autoFocus />
                    {errors.name && <p className='text-red-500'>Name is required</p>}

                    {/* <label htmlFor="image">Imagen</label> */}
                    <input type="file"  {...register('image', { required: false })} className={c.inputs} placeholder='Imagen' autoFocus onChange={handleUploadImage} />
                    {errors.image && <p className='text-red-500'>Image is required</p>}

                    {/* <label htmlFor="description">Description</label> */}
                    <input type="text"  {...register('description', { required: false })} className={c.inputs} placeholder='Description' autoFocus />
                    {errors.description && <p className='text-red-500'>Description is required</p>}

                    {/* <label htmlFor="brand">Marca</label> */}
                    <input type="text"  {...register('brand', { required: false })} className={c.inputs} placeholder='Marca' autoFocus />
                    {errors.brand && <p className='text-red-500'>Marca is required</p>}

                    {/* <label htmlFor="distributor">Distributor</label> */}
                    <input type="text"  {...register('distributor', { required: false })} className={c.inputs} placeholder='Distributor' autoFocus />
                    {errors.distributor && <p className='text-red-500'>Distributor is required</p>}

                    {/* <label htmlFor="stock">stock</label> */}
                    <input type="number"  {...register('stock', { required: false })} className={c.inputs} placeholder='stock' autoFocus />
                    {errors.stock && <p className='text-red-500'>stock is required</p>}

                    {/* <label htmlFor="name">cost</label> */}
                    <input type="step "  {...register('cost', { required: false })} className={c.inputs} placeholder='cost' autoFocus />
                    {errors.cost && <p className='text-red-500'>cost is required</p>}

                    {/* <label htmlFor="off">off</label> */}
                    <input type="step "  {...register('off', { required: false })} className={c.inputs} placeholder='off' autoFocus />
                    {errors.off && <p className='text-red-500'>cost is required</p>}

                    {/* <label htmlFor="category">category</label> */}
                    <input type="text"  {...register('category', { required: false })} className={c.inputs} placeholder='category' autoFocus />
                    {errors.category && <p className='text-red-500'>category is required</p>}

                    {/* <label htmlFor="name">iva</label> */}
                    <input type="step "  {...register('iva', { required: false })} className={c.inputs} placeholder='iva' autoFocus />
                    {errors.iva && <p className='text-red-500'>iva is required</p>}

                    {/* <label htmlFor="iibb">iibb</label> */}
                    <input type="step "  {...register('iibb', { required: false })} className={c.inputs} placeholder='iibb' autoFocus />
                    {errors.iibb && <p className='text-red-500'>iibb is required</p>}

                    {/* <label htmlFor="others">others</label> */}
                    <input type="step "  {...register('others', { required: false })} className={c.inputs} placeholder='others' autoFocus />
                    {errors.others && <p className='text-red-500'>iibb is required</p>}

                    {/* <label htmlFor="gain">gain</label> */}
                    <input type="step "  {...register('gain', { required: false })} className={c.inputs} placeholder='gain' autoFocus />
                    {errors.gain && <p className='text-red-500'>iibb is required</p>}

                    <button type='submit' className='bg-indigo-500 px-10 py-2 rounded-md'>Save</button>
                </form>
            </div>

        </div>
    )
}

export default CreateProd