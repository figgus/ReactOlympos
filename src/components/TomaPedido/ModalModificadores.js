import React,{useEffect,useContext,useState} from 'react';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import {GetMensajesCocina,formatearArregloColumnas,ClonarObjeto, CerrarTodasLasModales} from '../Globales/FuncionesGlobales';

export function ModalModificadores(){
    const contextoOrden = useContext(TomaPedidoContext);
    const [mensajesCocina, setMensajesCocina] = useState([]);
    const [indexSeleccionado, setIndexSeleccionado] = useState(0);
    const M=window.M;
    const clickProducto=(indiceClickeado)=>{
        setIndexSeleccionado(indiceClickeado);
        var chips=document.querySelectorAll('.chip');
        if(chips.length>0){
            chips.forEach((item,i)=>{
                item.style.backgroundColor='';
            });
            chips[indiceClickeado].style.backgroundColor='rgb(238, 70, 50)';
        }

    };
    const agregarMensajeCocina=(indiceProducto,mensaje)=>{
        var orden=contextoOrden.orden;
        orden.productosPorOrden[indiceProducto].mensajesProductos.push(
            {
               // id:0,
                productosPorOrdenID:orden.productosPorOrden[indiceProducto].id,
                mensaje:mensaje
            }
        );
        contextoOrden.setOrden(ClonarObjeto(orden));
    };

    const removerMensajeCocina=(indiceProducto,mensajeParam)=>{
        var orden=contextoOrden.orden;
        
        var indiceRemover=-1;
        mensajesCocina.forEach((mensaje,i)=>{
            if(mensaje.mensaje===mensajeParam){
                indiceRemover=0;
            }
        });
        if(indiceRemover===-1){
            return;
        }
        orden.productosPorOrden[indiceProducto].mensajesProductos.splice(indiceRemover,1);
        contextoOrden.setOrden(ClonarObjeto(orden));
    };
    useEffect(() => {
        var elems = document.getElementById('modalModificadores');
        M.Modal.init(elems, {
            onOpenEnd:()=>{
                setIndexSeleccionado(Number(localStorage.getItem('productoSeleccionado')));
                GetMensajesCocina().then((respuesta)=>{
                    setMensajesCocina(respuesta);
                    var chips=document.querySelectorAll('.chip');
                    //chips.='#e4e4e4';
                    if(chips.length>0){
                        chips.forEach((item,i)=>{
                            item.style.backgroundColor='';
                        });
                        
                        chips[Number(localStorage.getItem('productoSeleccionado'))].style.backgroundColor='rgb(238, 70, 50)';
                    }
                    
                });
            }
        });
        
        
    },[]);

    return (
        <div id="modalModificadores" class="modal bottom-sheet">
            <div class="modal-content">
                <center>
                    <h4>Mensajes a cocina</h4>    
                </center>
                <div className="row">
                    <div className="col s12">
                        {
                            contextoOrden.orden.productosPorOrden.map((item,i)=>{
                                return (
                                    <div onClick={()=>{clickProducto(i)}} className="chip" style={{'cursor':'pointer'}}>
                                      {item.cantidad}x{item.productos.nombre}
                                    </div>)
                            })
                        }
                    </div>
                </div>
                <hr/>
                    {
                        formatearArregloColumnas(mensajesCocina,4).map((fila)=>{
                            return(<div className="row">
                                {
                                    fila.map((item,i)=>{
                                        if(!item.mensaje){
                                            return (
                                                <div className="col s3">
                                                    
                                                </div>
                                            )
                                        }
                                        if(contextoOrden.orden.productosPorOrden[indexSeleccionado].mensajesProductos){
                                            if(contextoOrden.orden.productosPorOrden[indexSeleccionado].mensajesProductos.find(p=>p.mensaje===item.mensaje)){
                                                return (
                                                    <div className="col s3">
                                                        <a onClick={()=>{removerMensajeCocina(indexSeleccionado,item.mensaje)}}
                                                        style={{'width':'60%','backgroundColor':'rgb(30 119 68)'}}
                                                        className="waves-effect waves-light btn-large">{item.mensaje}</a>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div className="col s3">
                                                        <a onClick={()=>{agregarMensajeCocina(indexSeleccionado,item.mensaje)}} 
                                                        style={{'width':'60%','backgroundColor':'rgb(37, 163, 91)'}} 
                                                        className="waves-effect waves-light btn-large">{item.mensaje}</a>
                                                    </div>
                                                )
                                            }
                                        }
                                        else{
                                            return (
                                                <div className="col s3">
                                                    <a onClick={()=>{agregarMensajeCocina(indexSeleccionado,item.mensaje)}} 
                                                    style={{'width':'60%','backgroundColor':'rgb(37, 163, 91)'}} 
                                                    className="waves-effect waves-light btn-large">{item.mensaje}</a>
                                                </div>
                                            )
                                        }
                                        
                                    })
                                }
                            </div>)
                        })
                    }
            </div>
            <div className="modal-footer">
              <a onClick={()=>{CerrarModal()}} href="javascript:void(0)" class="modal-close waves-effect waves-green btn-flat">Listo</a>
            </div>
        </div>
    );
}


 function CerrarModal() {
    const M=window.M;
    var instancia = M.Modal.getInstance(document.getElementById('modalModificadores'));
    instancia.close();
};