import React, { useEffect, useState, useContext } from 'react';
import { GetDescuentos, formatearArregloColumnas, ClonarObjeto } from '../../Globales/FuncionesGlobales';
import { TomaPedidoContext} from '../../../Context/TomaPedidoContext';

export function DescuentoPorcentaje() {
    const [descuentos, setDescuentos] = useState([]);
    const contextoTomaPedido = useContext(TomaPedidoContext);
    const M = window.M;
    useEffect(() => {
        GetDescuentos().then((result) => {
            setDescuentos(formatearArregloColumnas(result, 3));
        });
    }, []);

    const clickDescuentoPorcentaje = (monto) => {
        let nuevaOrden = contextoTomaPedido.orden;
        if (nuevaOrden.porcentajeDescuento > 0) {
            if(nuevaOrden.porcentajeDescuento===monto){
                monto=0;
            }
            nuevaOrden.total +=nuevaOrden.descuentoTotal;
            nuevaOrden.porcentajeDescuento = 0;
            nuevaOrden.descuentoTotal = 0;
            
        }
        nuevaOrden.porcentajeDescuento = monto;
        contextoTomaPedido.setOrden(ClonarObjeto(nuevaOrden));
        cerrarModal();
    };

    const cerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalDescuentos'));
        instanciaTeclado.close();
    };

    return (
        <div>
            <br />
            <br />
            {
                descuentos.map((descuentos) => {
                    return (
                        <div className="row">
                            {
                                descuentos.map((desc,i) => {
                                    const prefix='descPorc';
                                    return (
                                        <div key={prefix+i} className="col s3">
                                            {
                                                (contextoTomaPedido.orden.porcentajeDescuento===desc.monto)?
                                                (
                                                    <a onClick={() => { clickDescuentoPorcentaje(desc.monto) }} style={{ 'paddingRight': '50px','background':'rgb(30 119 68)' }} className="waves-effect waves-light btn-large">
                                                        {desc.nombre} {desc.descripcion}
                                                    </a>
                                                )
                                                :(
                                                    <a onClick={() => { clickDescuentoPorcentaje(desc.monto) }} style={{ 'paddingRight': '50px' ,'background':'rgb(37, 163, 91)'}} className="waves-effect waves-light btn-large">
                                                        {desc.nombre} {desc.descripcion}
                                                    </a>
                                                )
                                            }
                                            
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
        );
}