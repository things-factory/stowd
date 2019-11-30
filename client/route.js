export default function route(page) {
  switch (page) {
    case '':
      return '/warehouses-page'

    case 'warehouses-page':
      import('./pages/warehouses')
      return page

    case 'warehouse-page':
      import('./pages/warehouse')
      return page
  }
}
