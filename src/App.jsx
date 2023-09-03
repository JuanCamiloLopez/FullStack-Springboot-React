import React from 'react';
import ListaClienteComponent from './components/ListaClienteComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddClienteComponent from './components/AddClienteComponent';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListaClienteComponent />}></Route>
            <Route path='/clientes' element={<ListaClienteComponent />}></Route>
            <Route path='/add-cliente' element={<AddClienteComponent />}></Route>
            <Route path='/edit-cliente/:id' element={<AddClienteComponent/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
