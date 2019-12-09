import React from 'react';

//Nuevos const para vistas de prueba

//const Estructuras = React.lazy(() => import('./views/VistasCatalogos/Estructuras/VistaTabla'));
//{ path: '/estructuras', name: 'Estructuras', component: Estructuras}
const Index = React.lazy(() => import('./views/Generales/Index/index'));
const Clientes = React.lazy(() => import('./views/Catalogos/Cliente/VistaTablaCliente/TablaCliente'));
const Articulos = React.lazy(() => import('./views/Catalogos/Articulo/VistaTablaArticulo/TablaArticulo'));
const Configuracion = React.lazy(() => import('./views/Configuracion/VistaConfiguracion'));
const Ventas = React.lazy(() => import('./views/Ventas/ContenedorVentas/ContenedorVentas'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home',component:Index },
  { path:'/Clientes', name:'Catálogo Clientes', component:Clientes},
  { path:'/Articulos', name:'Catálogo Articulos', component:Articulos},
  { path:'/Configuracion', name:'Configuración General', component:Configuracion},
  { path:'/Ventas', name:'Ventas Activas', component:Ventas}
];

export default routes;
