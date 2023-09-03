import React, { useState, useEffect } from 'react'
import ClienteService from '../services/ClienteService';
import { Link } from 'react-router-dom';


const ListaClienteComponent = () => {
    const [clientes, setClientes] = useState([]);
    useEffect(()=>{
        listarClientes();
    },[]);

    const listarClientes = ()=>{
        async function clientsFetchData(){
            const data = await ClienteService.getAllClients();
            setClientes(data);
        }
        clientsFetchData();
    }
    const deleteCliente = (id) =>{
        ClienteService.deleteClienteById(id).then((response)=>{
            listarClientes();
        }).catch(console.error());
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de clientes</h2>
            <Link to="/add-cliente" className='btn btn-primary mb-2'>Agregar cliente</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>EMAIL</th>
                    <th>ACCIONES</th>
                </thead>
                <tbody>
                    {
                        clientes.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.nombre}</td>
                                <td>{client.apellido}</td>
                                <td>{client.email}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/edit-cliente/${client.id}`}>Actualizar</Link>
                                    <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteCliente(client.id)}>Eliminar</button>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ListaClienteComponent;