import React,{useContext,useEffect,useState} from 'react';
import { GetDescuentos, ClonarObjeto,formatearArregloColumnas } from '../../Globales/FuncionesGlobales';
import { TomaPedidoContext} from '../../../Context/TomaPedidoContext';

export function DescuentoProducto() {
    const contextoTomaPedido = useContext(TomaPedidoContext);
    const M=window.M;

    const cerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalDescuentos'));
        instanciaTeclado.close();
    };

    const productosFormateados=formatearArregloColumnas(contextoTomaPedido.orden.productosPorOrden,4);
    return (
        <div className="container">
            <br/>
            <br/>
            {
                productosFormateados.map((item,i)=>{
                    return (
                        <div className="row">
                            {
                                item.map((producto)=>{
                                    return (
                                        <div className="col s3">
                                            <a style={{'width':'80%','background':'rgb(37, 163, 91)'}} 
                                            className="waves-effect waves-light btn-large">{producto.productos.nombre}</a>
                                        </div>
                                        
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            
        
        </div>);
}