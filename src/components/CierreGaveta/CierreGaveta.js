import React, { useState, useEffect } from 'react';
import { ModalGavetasDisponibles } from '../CierreGaveta/ModalGavetasDisponibles';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado } from '../Globales/FuncionesGlobales';
import { DetallesMedioDePago } from '../CierreGaveta/DetallesMedioDePago';

export function CierreGaveta() {
    const [aperturaSeleccionada, setAperturaSeleccionada] = useState({});
    const [ordenes, setOrdenes] = useState([]);
    const [mediosDePago, setMediosDePago] = useState([]);
    const [medioDePagoSeleccionado, setMedioDePagoSeleccionado] = useState({});
    const [todosLosPagos, setTodosLosPagos] = useState([]);

    useEffect(() => {
        const M = window.M;
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalGavetasDisponibles'));
        instanciaTeclado.open();

        GetMediosDePago().then((respuesta) => {
            setMediosDePago(respuesta);
        });

         document.querySelectorAll('.collapsible');

         M.Tabs.init(document.querySelector('.tabs'), {});

    }, []);

    const totalRecaudado = () => {
        var res = 0;
        ordenes.forEach((orden) => {
            res += orden.total;
        });
        return res;
    };

    const clickMedioDePago = (medioDePago) => {
        setMedioDePagoSeleccionado(medioDePago);
    };

    return (<React.Fragment>

        <br/>
        <br/>
        
        <div className="container">
            <div class="row">
              <div class="col s12">
                <ul class="tabs">
                  <li class="tab col s3 active"><a className="active" href="#test1">Arqueo</a></li>
                  <li class="tab col s3"><a  href="#test2">Cierre Ciego</a></li>
                  <li class="tab col s3"><a href="#test3">Salida rapida</a></li>
                  <li class="tab col s3"><a href="#test4">Salir</a></li>
                </ul>
              </div>
              
            </div>
            <div class="row">
                <div id="test1" class="col s12">
                <div className="row">
                <div class="col s6">
                    <ul className="collection">
                    {
                        mediosDePago.map((medio,i) => {
                            const prefijo='medios'+i;
                            return (
                                <li key={prefijo} onClick={() => { clickMedioDePago(medio) }} className="collection-item">
                                    <div className="row">
                                        <div style={{ 'cursor': 'pointer' }} className="col s8">
                                            <h3>{medio.nombre}</h3>
                                        </div>
                                        <div className="col s4">
                                            <input id="first_name" type="text" className="validate" />
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }

                    </ul>
                </div>
                <contexto.Provider value={{
                    aperturaSeleccionada: aperturaSeleccionada,
                    setAperturaSeleccionada: setAperturaSeleccionada,
                    setOrdenes: setOrdenes,
                    setTodosLosPagos: setTodosLosPagos,
                    medioDePagoSeleccionado:medioDePagoSeleccionado,
                    todosLosPagos:todosLosPagos
                }}>
                    <ModalGavetasDisponibles />
                    <DetallesMedioDePago />
                </contexto.Provider>
            </div>
            <div className="row">
                <div class="col s6">
                    <p>Total recaudado: {GetPrecioFormateado( totalRecaudado())}</p>
                    <a style={{ 'backgroundColor': '#6c757d' }} className="waves-effect waves-light btn-large">Precalcular</a>
                </div>
                <div class="col s6">
                    <a style={{ 'backgroundColor': '#218838' }} className="waves-effect waves-light btn-large">Listo</a>
                </div>
            </div>
                </div>
                <div id="test2" class="col s12">Test 2</div>
                <div id="test3" class="col s12">Test 3</div>
                <div id="test4" class="col s12">Test 4</div>
            </div>
            
            
            
            
        </div>
        
        {aperturaSeleccionada.id}


        
        
        
    </React.Fragment>);
}

