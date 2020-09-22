import React, {useContext ,useState,useEffect} from 'react';
import {ClonarObjeto,GetUrlApi,GetFetchHeaders} from '../../Globales/FuncionesGlobales';
import swal from 'sweetalert';
import { CrudProductosContext } from '../../../Context/ContextoMantenedorProductos';

export function CrearCategoria(){
    const contextoMantenedorProductos = useContext(CrudProductosContext);
    const [isEnviando, setIsEnviando] = useState(false);

    PostCategoria=async()=>{
        var categoria={};
        categoria.descripcion=document.getElementById('nombreCategoria').value;
        categoria.sucursalesAsociadas=[];
        const cboSucursales = document.getElementById('cboSucursales').options;
        for (var i = 0; i < cboSucursales.length; i++) {
            if (cboSucursales[i].selected) {
                categoria.sucursalesAsociadas.push({
                    sucursalesID: Number( cboSucursales[i].value),
                });
            }
        }


        var respuesta = await fetch(GetUrlApi()+'/api/Categorias', {
            method: 'post',
            headers: GetFetchHeaders(),
            body: JSON.stringify(categoria)
        }).catch(()=>{
            swal({
                title: "No se pudo crear la categoría, verifique su conexion a internet",
                icon: "error",
                dangerMode: true,
            })
        });
        if (respuesta.ok) {
            swal({
                title: "Categoria creada con exito",
                icon: "success"
            });
        }
        else {
            swal({
                title: "No se pudo crear la categoría",
                icon: "error",
                dangerMode: true,
            })
        }
    }

    return (
        <div id="modalCrearCategoria" class="modal bottom-sheet">
            <div class="modal-content">
               <h4>Crear Categoría</h4>
               <div className="row">
                  <div className="col s3">
                    <label>Nombre</label>
                    <input placeholder="Nombre" id="nombreCategoria" type="text"/>
                  </div>
                  
                    <div className="col s3">
                            <label for="autocomplete-input">Sucursales</label>
                            <select id="cboSucursales" multiple className="browser-default">
                                <option value="" disabled selected>Seleccione</option>
                                {
                                    contextoMantenedorProductos.sucursales.map((sucursal) => {
                                        return (
                                            <option value={sucursal.id}>{sucursal.nombre}</option>
                                        );
                                    })
                                }
                            </select>
                    </div>
                    <div className="col s3">

                    </div>
                  
              </div>
            </div>
            <div className="modal-footer">
                <a onClick={()=>{PostCategoria()}} className="waves-effect waves-light btn-large">Listo <i className="material-icons right">send</i></a>
            </div>
        </div>
    );
}

async function PostCategoria(categoria){
    
}