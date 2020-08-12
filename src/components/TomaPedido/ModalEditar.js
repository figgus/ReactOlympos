import React, { useState, useEffect, useContext } from 'react';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';


export function ModalEditar(){
    const contextoOrden = useContext(TomaPedidoContext);
    const tamañoFuente='20px';
    return (
        <div style={{'overflow':'scroll'}} id="modalEditar" class="modal bottom-sheet">
            <div class="modal-content">
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{'font-size': tamañoFuente}}>Cantidad</th>
                                <th style={{'font-size': tamañoFuente}}>Nombre</th>
                                <th style={{'font-size': tamañoFuente}}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody style={{ 'height': '500px', 'overflowY': 'scroll' }}>
                            {

                                contextoOrden.orden.productosPorOrden.map((item) => {
                                    return (
                                        <tr>
                                            <td><i style={{'font-size': '40px','cursor':'pointer'}} className="material-icons Large">add_circle</i><label style={{'font-size': '40px'}}>{item.cantidad}</label><i style={{'font-size': '40px','cursor':'pointer'}} className="material-icons Large">remove_circle</i> </td>
                                            <td><p style={{'font-size': tamañoFuente}}> {item.productos.nombre}</p></td>
                                            <td><i style={{'font-size': '40px','cursor':'pointer'}} className="material-icons Large">delete</i></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Listo</a>
        </div>
  </div>
    );
}