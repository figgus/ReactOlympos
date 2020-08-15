import React,{useContext,useEffect,useState} from 'react';
import { GetDescuentos, ClonarObjeto,formatearArregloColumnas } from '../../Globales/FuncionesGlobales';
import { TomaPedidoContext} from '../../../Context/TomaPedidoContext';

export function DescuentoProducto() {
    const contextoTomaPedido = useContext(TomaPedidoContext);
    const M=window.M;
    const [productoClickeado, setProductoClickeado] = useState(null);
    const [descuentos, setDescuentos] = useState([]);
    const cerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalDescuentos'));
        instanciaTeclado.close();
    };
    const productosFormateados=formatearArregloColumnas(contextoTomaPedido.orden.productosPorOrden,4);

    const clickDescuento=(porcentajeDescuento)=>{
        debugger
        let orden=ClonarObjeto(contextoTomaPedido.orden);
        var productoOrdenEditar=orden.productosPorOrden[productoClickeado.indice];
        productoOrdenEditar.porcentajeDeDescuento=porcentajeDescuento;
        contextoTomaPedido.setOrden(orden);
    };

    const clickProducto=(producto,indice)=>{
        producto.indice=indice;
        setProductoClickeado(producto);
    };

    useEffect(()=>{
        GetDescuentos().then((response)=>{
            setDescuentos(response);
        });
    });

    return (
        <div className="container">
            <br/>
            <br/>
            
            {
                (productoClickeado)?(
                    <React.Fragment>
                        <center><h4>{productoClickeado.productos.nombre}</h4></center>
                        <br/>
                        <div className="row">
                            
                            {
                                descuentos.map((descuento)=>{
                                    return (
                                        <div className="col s3">
                                                <a onClick={()=>{clickDescuento(descuento.monto)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} 
                                                className="waves-effect waves-light btn-large">{descuento.monto}%</a>
                                        </div>
                                    );
                                })
                            }

                        </div>
                        <div className="row">
                            <div className="col s3"></div>
                            <div className="col s3">
                                <a onClick={()=>{setProductoClickeado(null)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} 
                                className="waves-effect waves-light btn-large">Volver</a>
                            </div>
                            <div className="col s3"></div>
                        </div>
                    </React.Fragment>
                ):(
            <div>
            {
                productosFormateados.map((item,i)=>{
                    return (
                        <div className="row">
                            {
                                item.map((producto,i)=>{
                                    return (
                                        <div className="col s3">
                                            <a onClick={()=>{clickProducto(producto,i)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} 
                                            className="waves-effect waves-light btn-large">{producto.productos.nombre}</a>
                                        </div>
                                        
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            </div>
                )
            }
        
        </div>);
}

