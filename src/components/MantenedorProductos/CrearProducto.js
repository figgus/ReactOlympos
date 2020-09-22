import React, { useState, useEffect,useContext } from 'react';
import { CrudProductosContext } from '../../Context/ContextoMantenedorProductos';
import swal from 'sweetalert';
import { GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';

export function CrearProducto() {
    const [isPrecioGlobal, setIsPrecioGlobal] = useState(false);
    
    const contextoMantenedorProductos = useContext(CrudProductosContext);

    useEffect(() => {
        const M = window.M;

        debugger
        var modal = document.getElementById('ModalCrearProducto');
        debugger
        M.Modal.init(modal, {
            onOpenEnd:()=>{
                debugger
                alert('hola');
                const productoSeleccionado=contextoMantenedorProductos.productoSeleccionado;
                if(productoSeleccionado){
                    document.getElementById('nombre').value=productoSeleccionado.nombre;

                    if(isPrecioGlobal){
                        document.getElementById('precio').value=productoSeleccionado.precioParaLlevar;
                    }
                    else{
                        document.getElementById('precioPL').value=productoSeleccionado.nombre;
                        document.getElementById('precioMesa').value=productoSeleccionado.nombre;
                        document.getElementById('precioBar').value=productoSeleccionado.nombre;
                        document.getElementById('precioDelivery').value=productoSeleccionado.nombre;
                    }
                }
            }
        });
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});


        var select = document.querySelectorAll('select');
        M.FormSelect.init(select, {
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
        for (var i = 0; i < cboSucursales.length; i++) {
            if (cboSucursales[i].selected) {
                producto.sucursalesAsociadas.push({
                    sucursalesID: Number( cboSucursales[i].value),
                });
            }
            
        }

        var respuesta = await fetch(GetUrlApi()+'/api/Productos', {
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
    
    const EditarProducto = async () => {
        var producto = contextoMantenedorProductos.productoSeleccionado;
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
        for (var i = 0; i < cboSucursales.length; i++) {
            if (cboSucursales[i].selected) {
                producto.sucursalesAsociadas.push({
                    sucursalesID: Number( cboSucursales[i].value),
                });
            }
            
        }

        var respuesta = await fetch(GetUrlApi()+'/api/Productos/'+producto.id, {
            method: 'put',
            headers: GetFetchHeaders(),
            body: JSON.stringify(producto)
        });
        if (respuesta.ok) {
            swal({
                title: "Producto editado con exito",
                icon: "success"
            });
        }
        else {
            swal({
                title: "No se pudo editar el producto",
                icon: "error",
                dangerMode: true,
            })
        }
    };

    const ClickListo=()=>{
        if(contextoMantenedorProductos.productoSeleccionado){
            EditarProducto();
        }
        else{
            crearProducto();
        }
        
    };

    return (
        <div id="ModalCrearProducto" className="modal bottom-sheet">
            <div className="modal-content">
                <div className="container">
                    
                    {
                        (contextoMantenedorProductos.productoSeleccionado)?(<h5>Editar: {contextoMantenedorProductos.productoSeleccionado.nombre}</h5>)
                        :(<h5>Ingreso de nuevo producto</h5>)
                    }
                    <div class="row">
                        <div class="col s4">
                            <input placeholder="Nombre" id="nombre" type="text" className="validate" />
                        </div>
                        <div class="col s4">
                            {
                                (isPrecioGlobal) ? (
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col s12">
                                                <input placeholder="Precio" id="precio" type="number" className="validate" />
                                            </div>
                                        </div>
                                        
                                    </React.Fragment>
                                ) : (
                                        <div className="row">
                                            <div class="col s3">
                                                <input placeholder="ParaLlevar" id="precioPL" type="number" className="validate" />
                                            </div>
                                            <div class="col s3">
                                                <input placeholder="Mesa" id="precioMesa" type="number" className="validate" />
                                            </div>
                                            <div class="col s3">
                                                <input placeholder="Bar" id="precioBar" type="number" className="validate" />
                                            </div>
                                            <div class="col s3">
                                                <input placeholder="Delivery" id="precioDelivery" type="number" className="validate" />
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
                        <div className="col s4"></div>
                        <div className="col s4"></div>
                        <div className="col s4"></div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a onClick={() => { ClickListo() }} className="waves-effect waves-light btn-large">Listo <i class="material-icons left">check</i></a>
            </div>
        </div>
    );
}

