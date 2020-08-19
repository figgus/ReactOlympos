import React, { useState, useEffect ,useContext} from 'react';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado } from '../Globales/FuncionesGlobales';

export function DetallesMedioDePago(){
    const context = useContext(contexto);
    const pagosMediosSeleccionados=context.todosLosPagos.filter(p => p.mediosDePagoID === context.medioDePagoSeleccionado.id);
    const getTotalMontoPagado=()=>{
        var res=0;
        pagosMediosSeleccionados.map((pago)=>{
            res+=pago.montoPagado;
        });
        return res;
    };
    const getTotalMontoTotal=()=>{
        var res=0;
        pagosMediosSeleccionados.map((pago)=>{
            res+=pago.montoPagadoReal;
        });
        return res;
    };
    const getTotalPropinas=()=>{
        return getTotalMontoPagado()-getTotalMontoTotal();
    };
    

    return (
        <div style={{
            'borderBottom': '1px solid #e0e0e0',
            'borderRigth': '1px solid #e0e0e0',
            'borderLeft': '1px solid #e0e0e0',
            'borderTop': '1px solid #e0e0e0',
            }} className="col s6">
            Pagos asociados a: {context.medioDePagoSeleccionado.nombre}
            {
                (pagosMediosSeleccionados.length === 0) ? (
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
                pagosMediosSeleccionados.map((medioPorOrden,i) => {
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
                <tr style={{'backgroundColor':'rgb(201 207 214)'}}>
                    <td ><strong>Totales</strong></td>
                    <td ><strong>{GetPrecioFormateado( getTotalMontoPagado())}</strong></td>
                    <td ><strong>{GetPrecioFormateado(getTotalMontoTotal())}</strong></td>
                    <td ><strong>{GetPrecioFormateado(getTotalPropinas())}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}