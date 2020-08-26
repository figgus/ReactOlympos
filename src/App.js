import React, { useState} from 'react';
import { Route } from 'react-router';
import { Home } from './components/Revisar/Home';
import { NavBar } from './components/NavBar';
import { TomaPedido } from './components/TomaPedido/TomaPedido';
import { EntradaCajero } from './components/EntradaCajero/EntradaCajero';
import { Administracion } from './components/Administracion/Administracion';
import { MantenedorProductos } from './components/MantenedorProductos/MantenedorProductos';
import { Login } from './components/Login/Login';
import { UserContext } from './Context/UserContext';
import { Redirect } from 'react-router'
import { TecladoNumerico } from './components/Teclado/Teclado';
import { AperturaDeCaja } from './components/AperturaDeCaja/AperturaDeCaja';
import { CierreGaveta } from './components/CierreGaveta/CierreGaveta';
import {WrapperCierreGaveta} from '../src/components/CierreGaveta/WrapperCierreGaveta';
import {KDS} from '../src/components/KDS';

export default function App () {
    const [usuario, setUsuario] = useState({ nombre: 'Ninguno',sucursal:{}});
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(() => () => { });
    return (
        
        <div>
            <UserContext.Provider value={{ usuario, setUsuario, funcionSeleccionada, setFuncionSeleccionada }}>
                <NavBar />
                <Route exact path='/Login' component={Login} />
                {
                    (usuario.nombre === 'Ninguno') ? (
                        <React.Fragment>
                            <Redirect to={'/Login'} />
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <TecladoNumerico />
                                <Route exact path='/Revisar' component={Home} />
                                <Route exact path='/TomaPedido' component={TomaPedido} />
                                <Route exact path='/ParaLlevar' component={TomaPedido} />
                                <Route exact path='/Mesas' component={TomaPedido} />
                                <Route exact path='/Bar' component={TomaPedido} />
                                <Route exact path='/Delivery' component={TomaPedido} />
                                <Route exact path='/Entrada' component={EntradaCajero} />
                                <Route exact path='/Administracion' component={Administracion} />
                                <Route exact path='/Productos' component={MantenedorProductos} />
                                <Route exact path='/Apertura' component={AperturaDeCaja} />
                                <Route exact path='/Cierre' component={WrapperCierreGaveta} />
                                <Route exact path='/KitchenDisplay' component={KDS} />
                            </React.Fragment>
                            )
                }
            </UserContext.Provider>
            
        </div>
    );
  
}
