package com.gestion.clientes.controller;

import com.gestion.clientes.exception.ResourseNotFoundException;
import com.gestion.clientes.model.Cliente;
import com.gestion.clientes.model.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")

public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    public Cliente nuevoCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> clientePorId(@PathVariable Long id) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(()-> new ResourseNotFoundException("no se encontro el id "+ id));
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Long id,@RequestBody Cliente clienteActualizar){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(()->  new ResourseNotFoundException("no se encontro tal cliente"));
        cliente.setNombre(clienteActualizar.getNombre());
        cliente.setApellido(clienteActualizar.getApellido());
        cliente.setEmail(clienteActualizar.getEmail());

        Cliente clienteActualizado = clienteRepository.save(cliente);
        return ResponseEntity.ok(clienteActualizado);
    }


    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarCliente(@PathVariable Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(()-> new ResourseNotFoundException("No encontre a tal fulano"));
         clienteRepository.delete(cliente);

         Map<String,Boolean> response = new HashMap<>();
         response.put("se elimino correcta mente el fulano",Boolean.TRUE);
         return ResponseEntity.ok(response);
    }
}
