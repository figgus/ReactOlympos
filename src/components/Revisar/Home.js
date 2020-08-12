import React, { useState, useEffect, useContext } from 'react';
import { GetPrecioFormateado, formatearArregloColumnas, GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';
import { ModalFiltroFecha } from '../Revisar/ModalFiltroFecha';
import { RevisarContext } from '../../Context/ContextoRevisar';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

export function Home() {
    const [ordenes, setOrdenes] = useState([]);
    const [redirectToTomaPedido, setRedirectToTomaPedido] = useState(false);
    const getOrdenes =async () => {
        var respuesta = await fetch(GetUrlApi()+'/api/Ordenes', {
            method: 'get',
            headers: GetFetchHeaders(),
        });
        if (respuesta.ok) {
            const resOrdenes = await respuesta.json();
            const ordenesFormateadas = formatearArregloColumnas(resOrdenes,4); 
            setOrdenes(ordenesFormateadas);
        }
        const a=1;
    };

    useEffect(() => {
        localStorage.removeItem('ordenSeleccionada');
        getOrdenes();
    }, []);

    var tipoVentaClickeado = '';
    const clickTomaPedido = (idTipo) => {
        localStorage.setItem('tipoPedido', idTipo);
    };

    const clickOrden = (orden) => {
        tipoVentaClickeado = orden.tipoPedido.nombre;
        localStorage.setItem('ordenSeleccionada', orden.id);
        localStorage.setItem('tipoPedido', orden.tipoPedido.id);
        setRedirectToTomaPedido(true);
    };

    return (
        <div>
            {(redirectToTomaPedido) ? (<Redirect to={'/' + tipoVentaClickeado} />) : (null)}
            <div className="container">
                <br />
                <div className="row">
                    <div className="col s3">
                        <Link onClick={() => { clickTomaPedido('1') }} className="waves-effect waves-light btn-large" to="/ParaLlevar"><i style={{ 'fontSize': '60px' }} className="material-icons">add</i></Link>
                    </div>
                    <div className="col s3">
                        <Link onClick={() => { clickTomaPedido('2') }} className="waves-effect waves-light btn-large" to="/Mesas"><i style={{ 'fontSize': '60px' }} className="material-icons">restaurant</i></Link>
                    </div>
                    <div className="col s3">
                        <Link onClick={() => { clickTomaPedido('3') }} className="waves-effect waves-light btn-large" to="/Bar"><i style={{ 'fontSize': '60px' }} className="material-icons">local_bar</i></Link>
                    </div>
                    <div className="col s3">
                        <Link onClick={() => { clickTomaPedido('4') }} className="waves-effect waves-light btn-large" to="/Delivery"><i style={{ 'fontSize': '60px' }} className="material-icons">airplanemode_active</i></Link>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large"><i style={{ 'fontSize': '60px' }} className="material-icons">add</i></a>
                    </div>
                    <div className="col s3">
                        <a href="#modalFiltroFecha" className="waves-effect waves-light btn-large modal-trigger"><i style={{ 'fontSize': '60px' }} className="material-icons">perm_contact_calendar</i></a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large"><i style={{ 'fontSize': '60px' }} className="material-icons">person</i></a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large"><i style={{ 'fontSize': '60px' }} className="material-icons">attach_money</i></a>
                    </div>
                </div>

                
                
                

            </div>
            <hr/>
            {
                ordenes.map((setDeOrdenes, index) => {
                    return (<div class="row">
                        {
                            setDeOrdenes.map((orden) => {
                                if (orden.id) {
                                    return (
                                        <div className="col s3">
                                            <Link to={String('' + orden.tipoPedido.descripcion).replace(/ /g, '')} onClick={() => { clickOrden(orden) }} style={{ 'cursor': 'pointer', 'color': 'inherit' }}>
                                                <div class="card horizontal">
                                                    <div class="card-stacked">
                                                        <div class="card-content">
                                                            <p style={{ 'fontWeight': 'bold'}}>Orden #{orden.numeroDeOrden}</p>
                                                        </div>
                                                        <div class="card-action">
                                                            <p style={{ 'fontWeight': 'bold' }}>{orden.tipoPedido.descripcion}</p>
                                                            <p style={{ 'fontWeight': 'bold' }}>{GetPrecioFormateado(orden.total)}</p>
                                                            <p style={{ 'fontWeight': 'bold' }}>{new Date(orden.fecha).toLocaleString()}&nbsp;{orden.usuarios.nombre}&nbsp;{orden.usuarios.apellido}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div class="col s3">
                                            <div>
                                                
                                            </div>
                                        </div>
                                    );
                                }
                                
                            })
                        }
                    </div>
                        )
                    
                    
                })
            }
               

            <RevisarContext.Provider value={{
                setOrdenes: setOrdenes,
                formatearArregloColumnas: formatearArregloColumnas
            }}>
                <ModalFiltroFecha />
            </RevisarContext.Provider>
            

            
            
        </div>
        );
}

