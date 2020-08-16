import React, { useState, useEffect } from 'react';
import { CrearProducto } from '../MantenedorProductos/CrearProducto'
import { CrudProductosContext } from '../../Context/ContextoMantenedorProductos'
import { GetFamilias, GetCategorias, GetGrupos, GetSucursales, GetFetchHeaders } from '../Globales/FuncionesGlobales'

async function TraerCategorias() {
    var respuesta = await fetch('/api/Categorias', {
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


export function MantenedorProductos() {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [familias, setfamilias] = useState([]);



    const CargarCategorias = async() => {
        setCategorias(await TraerCategorias());
    };
    const CargarProductosPorCategoria =async (categoriaID) => {
        setProductos(await ClickCategoria(categoriaID));
    };
    
    const M = window.M;

    useEffect(() => {
        CargarCategorias();

        GetFamilias().then((resultado) => {
            setfamilias(resultado);
        });

        GetGrupos().then((resultado) => {
            setGrupos(resultado);
        });

        GetCategorias().then((resultado) => {
            setCategorias(resultado);
        });

        GetSucursales().then((response) => {
            setSucursales(response);
        });

        var elems = document.querySelectorAll('.autocomplete');
         M.Autocomplete.init(elems, {
            data: {
                "Apple": null,
                "Microsoft": null,
                "Google": 'https://placehold.it/250x250'
            },
        });

        var elems2 = document.querySelectorAll('select');
         M.FormSelect.init(elems2, {});

        
        var elems3 = document.querySelectorAll('.modal');
        M.Modal.init(elems3, {});


    },[]);

    return (
        <React.Fragment>
            <div class="row">
                <div class="col s2">
                        <div class="collection">
                            {
                                categorias.map((item) => {
                                    return (
                                        <a onClick={() => { CargarProductosPorCategoria(item.id) }} href="javascript:void(0)" class="collection-item">{item.descripcion}</a>
                                        )
                                })
                            }
                        </div>
                </div>
                <div class="col s5">
                    <div class="collection">
                        <a href="#ModalCrearProducto" class="collection-item modal-trigger">Nuevo Producto</a>
                        {
                            productos.map((item) => {
                                return (
                                    <a  href="javascript:void(0)" class="collection-item">{item.nombre}</a>
                                )
                            })
                        }
                    </div>
                </div>
                <div class="col s5"></div>
                
            </div>
            <CrudProductosContext.Provider value={
                {
                    categorias: categorias,
                    grupos: grupos,
                    familias: familias,
                    sucursales: sucursales
                }
            }>
                <CrearProducto />
            </CrudProductosContext.Provider>

        </React.Fragment>);
}

async function ClickCategoria(id) {
    var respuesta = await fetch('/api/Productos/GetProductosPorCategoria?categoriaID='+id, {
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

