import React,{useEffect,useContext} from 'react';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import { GetPrecioFormateado,GetPrecioPorTipoPedido } from '../Globales/FuncionesGlobales';

export function ListaProductos(){
    const ContextOrden = useContext(TomaPedidoContext);
    const orden=ContextOrden.orden;
    return (
        <div className="col s5">

                    <div class="row">
                        <div class="col s12 m5">
                            <div class="card-panel teal">
                                <span class="white-text">
                                    <div class="row">
                                        <div class="col s3">
                                            Usuario: {orden.usuarios.nombre}
                                        </div>
                                        <div class="col s3">{orden.tipoPedido.descripcion}</div>
                                        <div class="col s3">Orden: {(orden.id === 0) ? (<p>Nueva</p>) : (<p>{orden.id}</p>)}</div>
                                        <div class="col s3">Clientes</div>
                                    </div>
                                    
                                    
                                 </span>
                            </div>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody style={{ 'height': '500px', 'overflowY': 'scroll' }}>
                            {

                                orden.productosPorOrden.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.cantidad}</td>
                                            <td>{item.productos.nombre}</td>
                                            <td>{GetPrecioFormateado((GetPrecioPorTipoPedido(item.productos, orden.tipoPedidoID) * item.cantidad) ) }</td>
                                        </tr>
                                    );
                                })
                            }

                            {
                                (orden.porcentajeDescuento>0)?(
                                    <tr>
                                            <td style={{'color':'#9e9e9e'}} colSpan="3">{orden.porcentajeDescuento}% de descuento {GetPrecioFormateado( ContextOrden.getDescuentosPorPorcentaje())}</td>
                                        </tr>
                                ):(null)
                            }
                            
                            {
                                (orden.montoExactoDescuento>0)?(
                                    <tr>
                                        <td style={{'color':'#9e9e9e'}} colSpan="3">{GetPrecioFormateado(orden.montoExactoDescuento)} de descuento</td>
                                    </tr>
                                ):(null)
                            }
                            <tr>
                                <td><strong>Total:{GetPrecioFormateado(ContextOrden.getTotal())}</strong></td>
                                <td><strong>Subtotal:{GetPrecioFormateado(ContextOrden.getTotal()+ContextOrden.getDescuentoTotal())}</strong></td>
                                <td><strong>Descuento:{GetPrecioFormateado(ContextOrden.getDescuentoTotal())}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    );
}