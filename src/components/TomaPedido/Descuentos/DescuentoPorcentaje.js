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
        debugger
        let nuevaOrden = contextoTomaPedido.orden;
        if (nuevaOrden.porcentajeDescuento > 0) {
            nuevaOrden.total +=nuevaOrden.descuentoTotal;
            nuevaOrden.porcentajeDescuento = 0;
            nuevaOrden.descuentoTotal = 0;
        }
        const montoDescontar = nuevaOrden.total *(monto/100);
        nuevaOrden.descuentoTotal = montoDescontar;
        nuevaOrden.porcentajeDescuento = monto;
        nuevaOrden.total -= montoDescontar;
        debugger
        contextoTomaPedido.setOrden(ClonarObjeto(nuevaOrden));
        cerrarModal();
    };

    const cerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalDescuentos'));
        instanciaTeclado.close();
    };

    return (
        <React.Fragment>
            <br />
            {
                descuentos.map((descuentos) => {
                    return (
                        <div className="row">
                            {
                                descuentos.map((desc) => {

                                    return (
                                        <div className="col s3">
                                            <a onClick={() => { clickDescuentoPorcentaje(desc.monto) }} style={{ 'paddingRight': '50px' }} className="waves-effect waves-light btn-large">
                                                {desc.nombre} {desc.descripcion}
                                            </a>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
        </React.Fragment>
        );
}