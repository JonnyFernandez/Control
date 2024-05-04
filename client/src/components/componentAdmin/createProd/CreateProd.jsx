import { useState } from 'react'
import r from './CreateProd.module.css'
import Validation from '../../../utils/validateProd'
import axios from 'axios'
import Swal from 'sweetalert2';
import { postProd } from '../../../api/prod';


const CreateProd = () => {



    const [inputs, setInputs] = useState({ name: '', image: '', description: '', stock: '', cost: '', off: '', category: '', iva: '', iibb: '', others: '', gain: '' })
    const [errors, setErrors] = useState({})
    const [showInputs, setShowInputs] = useState(true)

    const toggleMore = () => setShowInputs(prev => !prev)





    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'assistt_file');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkx6y2e2z/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data.secure_url);
            // Actualiza el estado 'image' con la URL de la imagen procesada
            setInputs({ ...inputs, image: response.data.secure_url });

            // Limpia el input de carga de imagen
            event.target.value = '';
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            // Muestra un mensaje de error al usuario
            alert('Error al cargar la imagen. Inténtalo de nuevo.');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
        setErrors(Validation({ ...inputs, [name]: value }));
    };

    const handleSelect = (event) => {
        let value = event.target.value
        setInputs({ ...inputs, category: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(errors).some(value => value)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Información incompleta.',
            });
            return;
        }

        await postProd(inputs);


        setInputs({ name: '', image: '', description: '', stock: '', cost: '', off: '', category: '', iva: '', iibb: '', others: '', gain: '' });
        setErrors({});


        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto agregado exitosamente.',
        });
    };

    return (

        <div className={r.prod}>
            <div className={r.header}>
                <h4 className={r.title}>Agregar Productos</h4>
            </div>

            <div className={r.body}>

                <div className={r.bodyLeft}>

                    {
                        inputs.image
                            ? (<div><img src={inputs.image} className={r.image1} alt="image" /></div>)
                            : (<div> <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12" />
                            </svg> </div>)
                    }


                </div>
                <div className={r.bodyRight}>

                    <form className={r.form} onSubmit={handleSubmit}>

                        {showInputs && <div className={r.divs}>
                            <label className={r.labels}>Imagen </label>
                            <input className={`${r.inputs} ${r.inputs_file}`} type="file"
                                name="image"
                                onChange={handleUploadImage} />
                        </div>
                        }

                        {showInputs && <div className={r.divs}>
                            <label htmlFor="" className={r.labels}>Nombre</label>
                            <input
                                className={`${r.inputs} ${r.inputs_file}`}
                                type="text"
                                name='name'
                                onChange={handleChange}
                                value={inputs.name}
                                placeholder={'Agregar Nombre'}
                            />
                            <p className={r.error}>{errors.name}</p>
                        </div>}



                        {showInputs && <div className={r.divs}>
                            <label htmlFor="" className={r.labels}>Descripción</label>
                            <input className={`${r.inputs} ${r.inputs_file}`}
                                type="text"
                                name='description'
                                onChange={handleChange}
                                value={inputs.description}
                                placeholder='Ingresar Descripcion'
                            />
                            <p className={r.error}>{errors.description}</p>
                        </div>}

                        {showInputs && <div className={r.divs}>
                            <label htmlFor="" className={r.labels}>Categoria</label>
                            <select name="" id="" onChange={handleSelect} className={r.select}>
                                <option value="">Categoria</option>
                                <option value="quimica">Quimica</option>
                                <option value="libreria">Libreria</option>
                                <option value="jugueteria">Jugueteria</option>
                                <option value="limpieza">Limpieza</option>
                                <option value="sueltos">Sueltos</option>
                                <option value="piscina">Piscina</option>
                                <option value="bazar">Bazar</option>
                                <option value="plasticos">plasticos</option>
                                <option value="perfumeria">Perfumeria</option>
                                <option value="indumentaria">Perfumeria</option>
                                <option value="otros">Otros</option>
                            </select>
                            <p className={r.error}>{errors.category}</p>
                        </div>}

                        {showInputs && <div className={r.divs}>
                            <label htmlFor="" className={r.labels}>Stock</label>
                            <input className={`${r.inputs} ${r.inputs_file}`}
                                type="number"
                                name='stock'
                                min={0}
                                onChange={handleChange}
                                value={inputs.stock}
                                placeholder='Ingresar Stock/ numero entero'
                            />
                            <p className={r.error}>{errors.stock}</p>
                        </div>}

                        {showInputs && <div className={r.divs}>
                            <label htmlFor="" className={r.labels}>Costo Base</label>
                            <input className={`${r.inputs} ${r.inputs_file}`}
                                type="number"
                                name='cost'
                                onChange={handleChange}
                                value={inputs.cost}
                                min={0}
                                placeholder='Ingresar Precio/numero entero'
                            />
                            <p className={r.error}>{errors.cost}</p>
                        </div>}

                        {/*                                      impuestos y ganancias                   */}
                        {
                            !showInputs && <div className={r.divs}>
                                <label htmlFor="" className={r.labels}>Iva</label>
                                <input className={`${r.inputs} ${r.inputs_file}`}
                                    type="number"
                                    name='iva'
                                    onChange={handleChange}
                                    value={inputs.iva}
                                    placeholder='Ingresar IVA'
                                />
                                <p className={r.error}>{errors.iva}</p>
                            </div>
                        }
                        {
                            !showInputs && <div className={r.divs}>
                                <label htmlFor="" className={r.labels}>IIBB</label>
                                <input className={`${r.inputs} ${r.inputs_file}`}
                                    type="number"
                                    name='iibb'
                                    onChange={handleChange}
                                    value={inputs.iibb}
                                    placeholder='Ingresar IIBB'
                                />
                                <p className={r.error}>{errors.iibb}</p>
                            </div>
                        }
                        {
                            !showInputs && <div className={r.divs}>
                                <label htmlFor="" className={r.labels}>Otros</label>
                                <input className={`${r.inputs} ${r.inputs_file}`}
                                    type="number"
                                    name='others'
                                    onChange={handleChange}
                                    value={inputs.others}
                                    placeholder='Otros impuestos'
                                />
                                <p className={r.error}>{errors.others}</p>
                            </div>
                        }
                        {
                            !showInputs && <div className={r.divs}>
                                <label htmlFor="" className={r.labels}>Ganancia</label>
                                <input className={`${r.inputs} ${r.inputs_file}`}
                                    type="number"
                                    name='gain'
                                    onChange={handleChange}
                                    value={inputs.gain}
                                    placeholder='Ingresar Ganancia'
                                />
                                <p className={r.error}>{errors.gain}</p>
                            </div>
                        }
                        {
                            !showInputs && <div className={r.divs}>
                                <label htmlFor="" className={r.labels}>Descuento</label>
                                <input className={`${r.inputs} ${r.inputs_file}`}
                                    type="number"
                                    name='off'
                                    onChange={handleChange}
                                    value={inputs.off}
                                    placeholder='Ingresar Ganancia'
                                />
                                <p className={r.error}>{errors.off}</p>
                            </div>
                        }

                        <button className={`${r.btnVerde}`} type='submit'>Agregar</button>

                    </form>
                    {showInputs && <button className={`${r.btnAzul}`} onClick={toggleMore}>Impuestos y Ganancia</button>}
                    {!showInputs && <button className={`${r.btnAzul}`} onClick={toggleMore}>Volver a Informacion</button>}
                </div>
            </div>
        </div>
    )
}

export default CreateProd