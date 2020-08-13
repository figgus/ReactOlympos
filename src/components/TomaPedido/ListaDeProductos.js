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
                            <tr>
                                <td><strong>Total:{GetPrecioFormateado(ContextOrden.getTotal())}</strong></td>
                                <td><strong>Subtotal:{GetPrecioFormateado(orden.subtotal)}</strong></td>
                                <td><strong>Descuento:{GetPrecioFormateado(orden.descuentoTotal)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    );
}