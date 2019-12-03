export default function route(page) {
  switch (page) {
    case '':
      return '/warehouses'

    case 'warehouses':
      import('./pages/warehouses')
      return page

    case 'warehouse':
      import('./pages/warehouse')
      return page

    case 'register':
      import('./pages/supplier/register')
      return page
  }
}
