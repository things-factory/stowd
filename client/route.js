export default function route(page) {
  switch (page) {
    case '':
      return '/stowd-main'

    case 'stowd-main':
      import('./pages/main')
      return page
  }
}
