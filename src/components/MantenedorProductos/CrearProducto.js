import React, { useState, useEffect,useContext } from 'react';
import { CrudProductosContext } from '../../Context/ContextoMantenedorProductos';
import swal from 'sweetalert';
import { GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';

export function CrearProducto() {
    const [redirctToProductos, setRedirectToProductos] = useState(false);
    const [isPrecioGlobal, setIsPrecioGlobal] = useState(false);
    
    const contextoMantenedorProductos = useContext(CrudProductosContext);

    useEffect(() => {
        const M = window.M;

        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});


        var select = document.querySelectorAll('select');
        var instancesSelect = M.FormSelect.init(select, {
            isMultiple:true
        });

    }, []);

    const clickPrecioGlobal=()=>{
        if (isPrecioGlobal) {
            setIsPrecioGlobal(false);
        } else {
            setIsPrecioGlobal(true);
        }
    }

    const crearProducto = async () => {
        var producto = {};
        producto.nombre = document.getElementById('nombre').value;
        if (isPrecioGlobal) {
            producto.precioParaLlevar = Number( document.getElementById('precio').value);
            producto.precioMesa = Number(document.getElementById('precio').value)
            producto.precioBar = Number(document.getElementById('precio').value);
            producto.precioDelivery = Number(document.getElementById('precio').value);
        }
        else {
            producto.precioParaLlevar = Number(document.getElementById('precioPL').value);
            producto.precioMesa = Number(document.getElementById('precioMesa').value)
            producto.precioBar = Number(document.getElementById('precioBar').value);
            producto.precioDelivery = Number(document.getElementById('precioDelivery').value);
        }
        producto.categoriasID = Number(document.getElementById('categoria').value);

        producto.sucursalesAsociadas = [];

        const cboSucursales = document.getElementById('cboSucursales').options;
        console.log(cboSucursales);
        for (var i = 0; i < cboSucursales.length; i++) {
            if (cboSucursales[i].selected) {
                producto.sucursalesAsociadas.push({
                    sucursalesID: Number( cboSucursales[i].value),
                });
            }
            
        }

        console.log(JSON.stringify(producto));
        var respuesta = await fetch(GetUrlApi()+'api/Productos', {
            method: 'post',
            headers: GetFetchHeaders(),
            body: JSON.stringify(producto)
        });
        if (respuesta.ok) {
            swal({
                title: "Producto creado con exito",
                icon: "success"
            });
        }
        else {
            swal({
                title: "No se pudo crear el producto",
                icon: "error",
                dangerMode: true,
            })
        }
    };

    return (
        <div id="ModalCrearProducto" class="modal bottom-sheet">
            <div class="modal-content">
                <div class="container">
                    <h5>Ingreso de nuevo producto</h5>
                    <div class="row">
                        <div class="col s4">
                            <input placeholder="Nombre" id="nombre" type="text" class="validate" />
                        </div>
                        <div class="col s4">
                            {
                                (isPrecioGlobal) ? (
                                    <React.Fragment>
                                        <div class="row">
                                            <div class="col s12">
                                                <input placeholder="Precio" id="precio" type="number" class="validate" />
                                            </div>
                                        </div>
                                        
                                    </React.Fragment>
                                ) : (
                                        <div class="row">
                                            <div class="col s3">
                                                <input placeholder="ParaLlevar" id="precioPL" type="number" class="validate" />
                                            </div>
                                            <div class="col s3">
                                                <input placeholder="Mesa" id="precioMesa" type="number" class="validate" />
                                            </div>
                                            <div class="col s3">
                                                <input placeholder="Bar" id="precioBar" type="number" class="validate" />
                                            </div>
                                            <div class="col s3">
                                                <input placeholder="Delivery" id="precioDelivery" type="number" class="validate" />
                                            </div>
                                            <div class="col s3">
                                                
                                            </div>

                                        </div>
                                        
                                        )
                            }
                        </div>
                        <div class="col s4">
                            <label>
                                <input onClick={() => { clickPrecioGlobal() }} checked={isPrecioGlobal} type="checkbox" />
                                <span>Precio global</span>
                            </label>
                        </div>

                        

                    </div>
                    <div className="row">
                        
                        
                        <div className="col s3">
                            <label for="autocomplete-input">Categoría</label>
                            <select id="categoria" className="browser-default">
                                <option value="" disabled selected>Seleccione una categoría</option>
                                {
                                    contextoMantenedorProductos.categorias.map((categoria) => {
                                        return (
                                            <option value={categoria.id}>{categoria.descripcion}</option>
                                        );
                                    })
                                }
                            </select>
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
                    </div>

                    <div className="row">
                        <div className="col s4">
                            
                        </div>
                        <div className="col s4">
                            
                        </div>
                        <div className="col s4">
                            
                        </div>
                    </div>

                </div>
            </div>
            <div className="modal-footer">
                <a onClick={() => { crearProducto() }} className="waves-effect waves-light btn-large">Listo <i class="material-icons left">check</i></a>
            </div>
        </div>
    );
}

