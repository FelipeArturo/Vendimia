import React from 'react';

//Nuevos const para vistas de prueba

//const Estructuras = React.lazy(() => import('./views/VistasCatalogos/Estructuras/VistaTabla'));
//{ path: '/estructuras', name: 'Estructuras', component: Estructuras}
const Index = React.lazy(() => import('./views/Generales/Index/index'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home',component:Index }
];

export default routes;
