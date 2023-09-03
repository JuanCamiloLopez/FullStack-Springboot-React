const urlCliente = 'http://localhost:8080/api/v1/clientes'
class ClienteService {

  async getAllClients() {
    try {
      const response = await fetch(urlCliente);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  async createCliente(cliente) {
    try {
      const response = await fetch(urlCliente, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      if (!response.ok) {
        throw new Error('Error al crear el cliente');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('error al crear el cliente', error);
      throw error;
    }
  }

  async updateCliente(clienteId, cliente) {
    try {
      const response = await fetch(`${urlCliente}/${clienteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar el cliente', error);
      throw error;
    }
  }

  async getClienteById(id) {
    try {
      const response = await fetch(`${urlCliente}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener el cliente');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el cliente', error);
      throw error;
    }
  }

  async deleteClienteById(clienteId) {
    try {
      const response = await fetch(`${urlCliente}/${clienteId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Error al eliminar el cliente', error);
      throw error;
    }
  }
  
}

export default new ClienteService();
