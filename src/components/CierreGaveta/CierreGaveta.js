import React, { useState, useEffect, useContext } from 'react';
import { ModalGavetasDisponibles } from '../CierreGaveta/ModalGavetasDisponibles';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado } from '../Globales/FuncionesGlobales';

export function CierreGaveta() {
    const M = window.M;
    const [aperturaSeleccionada, setAperturaSeleccionada] = useState({});
    const [ordenes, setOrdenes] = useState([]);
    const [mediosDePago, setMediosDePago] = useState([]);
    const [medioDePagoSeleccionado, setMedioDePagoSeleccionado] = useState({});
    const [todosLosPagos, setTodosLosPagos] = useState([]);


    useEffect(() => {
        MostrarGavetasDisponibles();
        GetMediosDePago().then((respuesta) => {
            setMediosDePago(respuesta);
        });

        var calapsables = document.querySelectorAll('.collapsible');
        var instancesColapsable = M.Collapsible.init(calapsables, {});

    }, []);

    const MostrarGavetasDisponibles = () => {
    var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalGavetasDisponibles'));
    instanciaTeclado.open();
    };

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
                <div className="col s4">
                    <a style={{ 'backgroundColor': '#6c757d' }} className="waves-effect waves-light btn-large">Arqueo</a>
                </div>
                <div className="col s4">
                    <a style={{ 'backgroundColor': '#6c757d' }} className="waves-effect waves-light btn-large">Arqueo ciego</a>
                </div>
                <div className="col s4">
                    <a style={{ 'backgroundColor': '#6c757d' }} className="waves-effect waves-light btn-large">Salida rapida</a>
                </div>
                <hr />


            </div>
            <div className="row">
                <div class="col s6">
                    <ul className="collection">
                    {
                        mediosDePago.map((medio) => {
                            return (
                                <li onClick={() => { clickMedioDePago(medio) }} className="collection-item">
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
                <div style={{
                    'borderBottom': '1px solid #e0e0e0',
                    'borderRigth': '1px solid #e0e0e0',
                    'borderLeft': '1px solid #e0e0e0',
                    'borderTop': '1px solid #e0e0e0',
                }} className="col s6">
                    Pagos asociados a: {medioDePagoSeleccionado.nombre}
                    {
                        (todosLosPagos.filter(p => p.mediosDePagoID === medioDePagoSeleccionado.id).length === 0) ? (
                            <p>No hay pagos</p>
                        ): (null)
                    }
                    <table>
                        <thead>
                            <tr>
                                <th># Orden</th>
                                <th>Monto pagado</th>
                                <th>Monto total</th>
                                <th>Propina</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        todosLosPagos.filter(p => p.mediosDePagoID === medioDePagoSeleccionado.id)
                            .map((medioPorOrden,i) => {
                                return (<React.Fragment>
                                    <tr>
                                        <td>{GetPrecioFormateado(medioPorOrden.numeroDeOrden)}</td>
                                        <td>{GetPrecioFormateado(medioPorOrden.montoPagadoReal)}</td>
                                        <td>{GetPrecioFormateado(medioPorOrden.montoPagadoReal)}</td>
                                        <td>0</td>
                                    </tr>
                                </React.Fragment>)
                        })
                    }
                                    </tbody>
                                    </table>
                </div>
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
        {aperturaSeleccionada.id}


        <contexto.Provider value={{
            aperturaSeleccionada: aperturaSeleccionada,
            setAperturaSeleccionada: setAperturaSeleccionada,
            setOrdenes: setOrdenes,
            setTodosLosPagos: setTodosLosPagos,
        }}>
            <ModalGavetasDisponibles />
        </contexto.Provider>
        
        
    </React.Fragment>);
}

