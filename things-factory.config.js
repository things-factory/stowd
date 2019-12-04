import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'site-home',
      page: 'home'
    },
    {
      tagname: 'warehouses-page',
      page: 'warehouses'
    },
    {
      tagname: 'warehouse-page',
      page: 'warehouse'
    },
    {
      tagname: 'register-page',
      page: 'register'
    }
  ],
  bootstrap
}
