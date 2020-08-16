import React,{useContext,useEffect,useState} from 'react';
import { GetDescuentos, ClonarObjeto,formatearArregloColumnas,GetPrecioPorTipoPedido } from '../../Globales/FuncionesGlobales';
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
        let orden=ClonarObjeto(contextoTomaPedido.orden);
        var productoOrdenEditar=orden.productosPorOrden[productoClickeado.indice];
        productoOrdenEditar.porcentajeDeDescuento=porcentajeDescuento;
        productoOrdenEditar.montoDescuento=GetPrecioPorTipoPedido( productoOrdenEditar.productos,orden.tipoPedidoID)*(productoOrdenEditar.porcentajeDeDescuento/100);
        setProductoClickeado(false);
        contextoTomaPedido.setOrden(orden);
        cerrarModal();
    };

    const clickProducto=(producto,indice)=>{
        debugger
        producto.indice=indice;
        setProductoClickeado(producto);
    };

    const removerDescuento=(producto,indice)=>{
        clickProducto(producto,indice);
        debugger
        let orden=ClonarObjeto(contextoTomaPedido.orden);
        var productoOrdenEditar=orden.productosPorOrden[indice];
        productoOrdenEditar.porcentajeDeDescuento=0;
        productoOrdenEditar.montoDescuento=0;
        contextoTomaPedido.setOrden(orden);
        setProductoClickeado(false);
        cerrarModal();
    };

    useEffect(()=>{
        GetDescuentos().then((response)=>{
            setDescuentos(response);
        });
    },[]);

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
                                    if(producto.productos){
                                        debugger
                                        return (
                                            <div className="col s3">
                                                {
                                                    (producto.porcentajeDeDescuento>0)?(
                                                        <a onClick={()=>{removerDescuento(producto,i)}} style={{'width':'80%','background':'rgb(30 119 68)'}} 
                                                        className="waves-effect waves-light btn-large">
                                                        {producto.productos.nombre}
                                                        <span className="badge blue">
                                                            {'-'+producto.porcentajeDeDescuento+'%'}
                                                        </span>
                                                    </a>
                                                    ):
                                                    (
                                                        <a onClick={()=>{clickProducto(producto,i)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} 
                                                            className="waves-effect waves-light btn-large">
                                                            {producto.productos.nombre}
                                                        </a>
                                                    )
                                                }
                                                
                                            </div>
                                        )
                                    }
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

