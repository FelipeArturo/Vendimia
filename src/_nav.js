export default {
  items: [
    {
      name: 'Catálogos',
      icon: 'icon-puzzle',
      children: [ 
        {
          name: 'Estructuras',
          url: '/estructuras',
          icon: 'icon-puzzle',
        },
        {
          name: 'Usuarios',
          url: '/usuarios',
          icon: 'icon-puzzle',
        },
        {
          name: 'Perfies',
          url: '/perfiles',
          icon: 'icon-puzzle',
        },
        {
          name: 'Formulas',
          url: '/formulas',
          icon: 'icon-puzzle',
        },
        {
          name: 'Porteos',
          url: '/porteos',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tipos Medidor',
          url: '/tiposmedidor',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Configuración',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Servidores',
          url: '/configurarservidor',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carga Manual',
          url: '/configurarcargamanual',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carga Automatica',
          url: '/configurarcargaautomatica',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Transferencia',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Manual',
          icon: 'icon-puzzle',
          children:[
            {
              name: 'Carga',
              url: '/transferenciacarga',
              icon: 'icon-puzzle',
            },
            {
              name: 'Carga Catalogo',
              url: '/transferenciacargacatalogo',
              icon: 'icon-puzzle',
            }
          ],
        }
      ],
    },
    {
      name: 'Reportes',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Estadísticos',
          url: '/reporteestadisticos',
          icon: 'icon-puzzle',
        },
        {
          name: 'Transferencia',
          url: '/reportetransferencia',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Validaciones',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Listado',
          url: '/listadovalidaciones',
          icon: 'icon-puzzle',
        }
      ],
    }
  ],
};
