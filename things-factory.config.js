import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'warehouses-page',
      page: 'warehouses-page'
    },
    {
      tagname: 'warehouse-page',
      page: 'warehouse-page'
    }
  ],
  bootstrap
}
