import React, { useState, useEffect,useContext } from 'react';
import { Redirect } from 'react-router'
import { BarraDeBotones } from '../TomaPedido/BarraDeBotones';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import { UserContext } from '../../Context/UserContext';
import { GetPrecioPorTipoPedido, GetTipoVenta, ClonarObjeto ,GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';
import { ModalPagar } from './ModalPagar';
import { ModalDescuentos } from './ModalDescuentos';
import { ModalEditar } from './ModalEditar';
import { ListaProductos } from './ListaDeProductos';


async function TraerCategorias() {
    var respuesta = await fetch(GetUrlApi()+'/api/Categorias', {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
    else {
        alert('error al traer las categorias');
    }
    return [];
}

async function ClickCategoria(id, setStateProductos, setStateCarga) {
    setStateCarga(true);
    var respuesta = await fetch(GetUrlApi()+'/api/Productos/GetProductosPorCategoria?categoriaID=' + id, {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        setStateProductos( await respuesta.json());
    }
    else {
        alert('error al traer los productos');
    }
    setStateCarga(false);
    return [];
}

export function TomaPedido() {
    const [redirectRevisar, setredirectRevisar] = useState(false);
    const [cargandoCategorias, setCargandoCategorias] = useState(true);
    const [cargandoProductos, setCargandoProductos] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [tipoVenta, setTipoVenta] = useState({});
    const ContextoUsuario = useContext(UserContext);
    const tipoPedido = Number(localStorage.getItem('tipoPedido'));
    const [orden, setOrden] = useState({
        id: 0,
        productosPorOrden: [],
        total: 0,
        subtotal: 0,
        montoExactoDescuento: 0,
        sucursalesID: ContextoUsuario.usuario.sucursalesID,
        tipoPedidoID: tipoPedido,
        tipoPedido:{},
        descuentoTotal:0,
        usuarios:ContextoUsuario.usuario
    });

    const [cantidad, setCantidad] = useState(1);

    const CargarCategorias = async () => {
        setCategorias(await TraerCategorias());
    };

    const ClickProducto2 = (productoSeleccionado) => {
        let productosPorOrden = [];
        var total = 0;
        //if (orden.porcentajeDescuento > 0) {
        //    total = total + (GetPrecioPorTipoPedido(productoSeleccionado, tipoPedido) - (GetPrecioPorTipoPedido(productoSeleccionado, tipoPedido) * (orden.porcentajeDescuento/100)) * cantidad);
        //} else {
        //    total = total + (GetPrecioPorTipoPedido(productoSeleccionado, tipoPedido) * cantidad);
        //}
        total = total + (GetPrecioPorTipoPedido(productoSeleccionado, tipoPedido) * cantidad);
        orden.productosPorOrden.map((producto) => {
            productosPorOrden.push(producto);
            producto.productosID = producto.productos.id;

            total = total + (GetPrecioPorTipoPedido(producto.productos, tipoPedido) * producto.cantidad);
        });
        productosPorOrden.push({ productos: productoSeleccionado, productosID: productoSeleccionado.id, ordenID: orden.id, cantidad:  cantidad });
        let OrdenFinal = ClonarObjeto(orden);
        OrdenFinal.productosPorOrden = productosPorOrden;
        OrdenFinal.total = total;
        OrdenFinal.subtotal = total;
        setOrden(OrdenFinal);
        setCantidad(1);
    }

    const CrearOrden = async () => {
        if (orden.id > 0) {
            ActualizarOrden();
        }
        else {
            var nuevaOrden = orden;
            const tipoPedidoID = localStorage.getItem('tipoPedido');
            nuevaOrden.tipoPedidoID = Number(tipoPedidoID);
            nuevaOrden.usuariosID = ContextoUsuario.usuario.id;
            var respuesta = await fetch(GetUrlApi()+'/api/Ordenes', {
                method: 'post',
                headers: GetFetchHeaders(),
                body: JSON.stringify(nuevaOrden),
            });
            if (respuesta.ok) {
                const respuestaApi = await respuesta.json();
                let ordenActualizada = orden;
                ordenActualizada.id = respuestaApi.id;
                setOrden(ClonarObjeto(ordenActualizada));
                localStorage.setItem('orden.total', orden.total);
            }
            else {
                alert('error al crear orden');
            }
        }
        
    };

    const ActualizarOrden =async () => {
        var data = orden;
        var respuesta = await fetch(GetUrlApi()+'/api/Ordenes/' + orden.id, {
            method: 'put',
            headers: GetFetchHeaders(),
            body: JSON.stringify(data),
        });
        if (respuesta.ok) {
            localStorage.setItem('orden.total', orden.total);
            return true;
        }
        else {
            return false;
        }
    };

    const getOrden = async (ordenID) => {
       
        var respuesta = await fetch(GetUrlApi()+'/api/Ordenes/' + ordenID, {
            method: 'get',
            headers: GetFetchHeaders()
        });
        if (respuesta.ok) {
            return await respuesta.json();
        }
        
        return orden;
    };

    useEffect(() => {
        CargarCategorias().then(() => {
            setCargandoCategorias(false);
        });
        
        var ordenSeleccionada = Number(localStorage.getItem('ordenSeleccionada'));
        if (Number.isInteger(ordenSeleccionada) && ordenSeleccionada>0) {
            getOrden(ordenSeleccionada).then((respuesta) => {
                setOrden(ClonarObjeto(respuesta));
            });
            
        }
        GetTipoVenta(tipoPedido).then((result) => {
            let nuevaOrden=ClonarObjeto(orden);
            nuevaOrden.tipoPedido=result;
            setOrden(nuevaOrden);
        });
       
    }, []);

    const getTotal=()=>{
        var res=0;
        orden.productosPorOrden.forEach((productoOrden)=>{
            res+= GetPrecioPorTipoPedido(productoOrden.productos, orden.tipoPedidoID)*productoOrden.cantidad;
        });
        return res;
    };

    return (
        <React.Fragment>
            {(redirectRevisar) ? (<Redirect to={'/Login'} />) : (null)}
            <div class="row">
                <div class="col s2">
                    <div class="collection">
                        
                        {
                            (cargandoCategorias) ? (
                                <center>
                                    <div class="preloader-wrapper small active">
                                        <div class="spinner-layer spinner-green-only">
                                            <div class="circle-clipper left">
                                                <div class="circle"></div>
                                            </div><div class="gap-patch">
                                                <div class="circle"></div>
                                            </div><div class="circle-clipper right">
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </center>
                            ): (null)
                        }
                        {
                            categorias.map((item) => {
                                return (
                                    <a onClick={() => { ClickCategoria(item.id, setProductos, setCargandoProductos) }} href="javascript:void(0)" class="collection-item">{item.descripcion}</a>
                                )
                            })
                        }
                    </div>
                </div>
                <div class="col s5">
                    <div class="collection">
                        {
                            (productos.length === 0) ? (<p>No se encontraron productos</p>) : (null)
                        }
                        {
                            (cargandoProductos) ? (
                                <center>
                                    <div className="preloader-wrapper small active">
                                        <div className="spinner-layer spinner-green-only">
                                            <div className="circle-clipper left">
                                                <div className="circle"></div>
                                            </div><div className="gap-patch">
                                                <div className="circle"></div>
                                            </div><div className="circle-clipper right">
                                                <div className="circle">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </center>
                            ) : (null)
                        }
                        {
                            productos.map((item) => {
                                return (
                                    <a onClick={() => { ClickProducto2(item) }} href="javascript:void(0)" class="collection-item">{item.nombre}</a>
                                )
                            })
                        }
                    </div>
                </div>
                <TomaPedidoContext.Provider value={{
                orden: orden,
                setOrden: setOrden,
                CrearOrden: CrearOrden,
                setCantidad: setCantidad,
                setredirectRevisar: setredirectRevisar,
                getTotal:getTotal
            }}>
                <ListaProductos />
                <BarraDeBotones />
                <ModalPagar />
                <ModalDescuentos />
                <ModalEditar />
            </TomaPedidoContext.Provider>
                

            </div>
            

            
            
        </React.Fragment>
        );
}
