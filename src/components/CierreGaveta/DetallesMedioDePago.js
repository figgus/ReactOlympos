import React, { useState, useEffect ,useContext} from 'react';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado } from '../Globales/FuncionesGlobales';

export function DetallesMedioDePago(){
    const context = useContext(contexto);

    return (
        <div style={{
            'borderBottom': '1px solid #e0e0e0',
            'borderRigth': '1px solid #e0e0e0',
            'borderLeft': '1px solid #e0e0e0',
            'borderTop': '1px solid #e0e0e0',
            }} className="col s6">
            Pagos asociados a: {context.medioDePagoSeleccionado.nombre}
            {
                (context.todosLosPagos.filter(p => p.mediosDePagoID === context.medioDePagoSeleccionado.id).length === 0) ? (
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
                context.todosLosPagos.filter(p => p.mediosDePagoID === context.medioDePagoSeleccionado.id)
                    .map((medioPorOrden,i) => {
                        const prefijo='medioPorOrden';
                        return (<React.Fragment key={prefijo+i}>
                            <tr>
                                <td>{medioPorOrden.numeroDeOrden}</td>
                                <td>{GetPrecioFormateado(medioPorOrden.montoPagado)}</td>
                                <td>{GetPrecioFormateado(medioPorOrden.montoPagadoReal)}</td>
                                <td>{GetPrecioFormateado(medioPorOrden.montoPagado-medioPorOrden.montoPagadoReal)}</td>
                            </tr>
                        </React.Fragment>)
                })
            }
                </tbody>
            </table>
        </div>
    );
}