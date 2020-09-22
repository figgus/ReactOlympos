import React, { useState, useEffect } from 'react';
import { CrearProducto } from '../MantenedorProductos/CrearProducto'
import { CrudProductosContext } from '../../Context/ContextoMantenedorProductos'
import { GetFamilias, GetCategorias, GetGrupos, GetSucursales, GetFetchHeaders,TraerProductosPorCategoria } from '../Globales/FuncionesGlobales'
import { CrearCategoria } from '../MantenedorProductos/MantenedorCategoria/CrearCategoria'

async function TraerCategorias() {
    var respuesta = await fetch('/api/Categorias', {
        method: 'get',
        headers: GetFetchHeaders()
    }).catch((err)=>{
        alert('error al traer las categorias');
    });
    if(!respuesta){
        return;
    }
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
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);



    const CargarCategorias = async() => {
        setCategorias(await TraerCategorias());
    };
    const CargarProductosPorCategoria =async (categoriaID) => {
        const res=await TraerProductosPorCategoria(categoriaID);
        setProductos(res);
    };

    const ClickEditarProducto=(producto)=>{
        setProductoSeleccionado(producto);
    };
    
    const ClickCrearProducto=()=>{
        setProductoSeleccionado(null)
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
            <div className="row">
                <div className="col s2">
                        <div className="collection">
                            {
                                categorias.map((item) => {
                                    return (
                                        <a onClick={() => { CargarProductosPorCategoria(item.id) }} href="javascript:void(0)" className="collection-item">{item.descripcion}</a>
                                        )
                                })
                            }
                            <a href="#modalCrearCategoria" className="collection-item modal-trigger">  <i className="material-icons">add_circle</i> Nueva categoria </a>
                        </div>
                </div>
                <div class="col s5">
                    <div class="collection">
                        <a onClick={()=>{ClickCrearProducto()}} href="#ModalCrearProducto" className="collection-item modal-trigger">Nuevo Producto</a>
                        {
                            productos.map((item) => {
                                return (
                                    <a onClick={()=>{ClickEditarProducto(item)}} href="#ModalCrearProducto" className="collection-item modal-trigger">{item.nombre}</a>
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
                    sucursales: sucursales,
                    productoSeleccionado:productoSeleccionado
                }
            }>
                <CrearProducto />
                <CrearCategoria />
            </CrudProductosContext.Provider>

        </React.Fragment>);
}
