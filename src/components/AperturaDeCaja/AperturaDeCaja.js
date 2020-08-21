import React, { useState, useEffect, useContext } from 'react';
import { GetGavetas, ClonarObjeto, GetFetchHeaders,GetUrlApi,GetAperturaActual } from '../Globales/FuncionesGlobales';
import { UserContext } from '../../Context/UserContext';

export function AperturaDeCaja() {
    
    const [gavetas, setGavetas] = useState([]);
    const ContextoUsuario = useContext(UserContext);
    const sucursalID = ContextoUsuario.usuario.sucursal.id;
    const usuariosID = ContextoUsuario.usuario.id;
    const [aperturaActual, setAperturaActual] = useState(null);

    useEffect(() => {
        GetAperturaActual(ContextoUsuario.usuario.estacionesID).then((response)=>{
            setAperturaActual(response);
        });
        const M = window.M;
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});

        GetGavetas(sucursalID).then((result) => {
            if(!result){
                result=[]
            }
            setGavetas(ClonarObjeto(result));
        });
    }, []);

    const CrearApertura = async() => {
        var apertura = {};
        apertura.gavetasID = Number(document.getElementById('cboGaveta').value);
        apertura.fondoDeCaja = Number( document.getElementById('txtFondoDeCaja').value);
        apertura.sucursalesID = Number(sucursalID);
        apertura.UsuariosID = Number(usuariosID);

        var respuesta = await fetch(GetUrlApi()+'/api/AperturaDeGavetas', {
            method: 'post',
            headers: GetFetchHeaders(),
            body: JSON.stringify(apertura),
        });
        if (respuesta.ok) {
            alert('apertura creada');
        }
    };

    return (<div className="container">
        <div style={{ 'paddingTop': '50px' }} className="row">
            <div class="col s4"></div>
            <div class="col s4"><center> <h4>Apertura de gaveta</h4></center></div>
            <div class="col s4"></div>
        </div>

        <div class="row">
            <div class="col s4"></div>
            <div class="col s4">
                <label>Gaveta</label>
                <select id="cboGaveta" className="browser-default">
                    <option value="" disabled selected>Seleccione una gaveta</option>
                    {
                        gavetas.map((gaveta) => {
                            return (
                                <option value={gaveta.id}>{gaveta.nombre}</option>
                                )
                        })
                    }
                </select>
                

                <label style={{ 'paddingTop': '50px' }}>Fondo de caja</label>
                <input id="txtFondoDeCaja" type="number" class="validate" />
                <center>
                    <a onClick={() => { CrearApertura() }} className={(!aperturaActual)?("waves-effect waves-light btn-large "):("waves-effect waves-light btn-large disabled")}>Listo</a>
                </center>
                {
                    (!aperturaActual)?(null)
                    :(
                        <div class="nav-wrapper">
                <div class="col s12">
                  <label>Esta gaveta ya esta abierta</label>
                </div>
                </div>
                    )
                }
            </div>
            <div class="col s4"></div>
        </div>

        
    </div>);
}