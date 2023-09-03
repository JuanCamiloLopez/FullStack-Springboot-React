import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddClienteComponent = () => {
    
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const title = () => id ? <h2 className='text-center'>Actualizar cliente</h2> : <h2 className='text-center'>Agregar cliente</h2>;

    //Este metodo me permite actualizar o crear un cliente 
    const saveCliente = (e) => {
        e.preventDefault();
        const cliente = { nombre, apellido, email };
        if (id) {
            ClienteService.updateCliente(id, cliente).then((response) => {
                console.log(response.data);
                navigate('/clientes');
            }).catch(error => { console.log(error) });
        } else {
            ClienteService.createCliente(cliente).then((response) => {
                console.log(response.data);
                navigate('/clientes');
            }).catch(error => { console.log(error) });
        }
    }

    const deleteCliente = (id) => {
        ClienteService.deleteClienteById(id).then((response) => {
            listarClientes();
        }).catch((error) => console.log(error))
    }


    return (
        <div>
            <div className='container '>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {title()}
                        <div className='card-body'>
                            <form action="">
                                <div className='form-group mb-2'>
                                    <label className="form-label">Nombre</label>
                                    <input type="text"
                                        placeholder='Digite su nombre'
                                        name='nombre'
                                        className='form-control'
                                        value={nombre}
                                        onChange={(e) => { setNombre(e.target.value) }} />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className="form-label">Apellido</label>
                                    <input type="text"
                                        placeholder='Digite su apellido'
                                        name='apellido'
                                        className='form-control'
                                        value={apellido}
                                        onChange={(e) => { setApellido(e.target.value) }} />
                                </div>
                                <div className='form-group mb-4'>
                                    <label className="form-label">Email</label>
                                    <input type="text"
                                        placeholder='Digite su email'
                                        name='email'
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <button className='btn btn-success mb-2' onClick={(e) => saveCliente(e)}>Guardar</button>
                                <br />
                                <Link to='/clientes' className='btn btn-danger mb-2 '>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClienteComponent;
