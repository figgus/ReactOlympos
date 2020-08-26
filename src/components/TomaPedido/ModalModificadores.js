import React,{useEffect,useContext,useState} from 'react';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';

export function ModalModificadores(){
    const contextoOrden = useContext(TomaPedidoContext);
    const M=window.M;
    const [productoSeleccionado, setProductoSeleccionado] = useState({productos:{}});
    debugger
    if(!productoSeleccionado.productos.nombre){
        const indiceProductoSeleccionado=Number(localStorage.getItem('productoSeleccionado'));
        setProductoSeleccionado(contextoOrden.orden.productosPorOrden[indiceProductoSeleccionado]);
    }
    useEffect(()=>{
        //var modal = document.getElementById('modalModificadores');
        //M.Modal.init(modal, {
            //onOpenEnd:()=>{
            //    if(!productoSeleccionado.productos.nombre){
            //        const indiceProductoSeleccionado=Number(localStorage.getItem('productoSeleccionado'));
            //        setProductoSeleccionado(contextoOrden.orden.productosPorOrden[indiceProductoSeleccionado]);
            //    }
            //    
            //},
            //onCloseEnd:()=>{
            //    setProductoSeleccionado({productos:{}});
            //    //var instanciaTeclado = M.Modal.getInstance(document.getElementById('modalModificadores'));
            //    //instanciaTeclado.destroy();
            //}
        //});
    });

    return (
        <div id="modalModificadores" class="modal bottom-sheet">
            <div class="modal-content">
                <div className="row">
                    <div className="col s3">
                        <h4>{productoSeleccionado.productos.nombre}</h4>
                    </div>
                    <div className="col s9">
                        poto
                    </div>
                </div>
                
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
    );
}