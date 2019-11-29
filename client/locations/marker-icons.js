const ICON_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 19.8 19.8" style="enable-background:new 0 0 19.8 19.8;" xml:space="preserve">
<g fill="{{fillcolor}}">
<rect x="4.7" y="12.3" width="10.4" height="0.5"/>
<rect x="4.7" y="13.8" width="10.4" height="0.5"/>
<rect x="4.7" y="15.4" width="10.4" height="0.5"/>
<polygon points="4.7,17.4 9.7,19.4 15.1,17.4 15.1,16.9 4.7,16.9 "/>
<path d="M9.9,0.4L0,6.5L0,8h1.1v9.5h2.2v-6.7h13.2v6.7h2.2V8h1.1l0-1.4L9.9,0.4z M5.2,9.5H3.3V8.6h1.8V9.5z M7.4,9.5H5.6V8.6h1.8 V9.5z M9.7,9.5H7.9V8.6h1.8V9.5z M12,9.5h-1.8V8.6H12V9.5z M14.2,9.5h-1.8V8.6h1.8V9.5z M16.5,9.5h-1.8V8.6h1.8V9.5z"/>
</g>
</svg>
`
const FOCUS_ICON_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<g fill="{{fillcolor}}">
<polygon points="8.9,9.6 12.5,11.5 16.1,9.7 12.5,7.8 "/>
<polygon points="8.4,14 12.1,15.8 12.1,12.2 8.4,10.3 "/>
<polygon points="13,15.8 16.6,14 16.6,10.4 13,12.2 "/>
<path d="M20.2,4.3c-0.5-0.7-1-1.4-1.6-1.9l-6-2.3l-6,2.3C5.8,3,5.3,3.7,4.8,4.5C3.9,6.1,3.3,7.9,3.3,9.8c0,5.5,4,9.3,9.2,14.2 c5.2-4.9,9.2-8.7,9.2-14.2C21.7,7.8,21.2,5.9,20.2,4.3z M17.5,14.5l-5,2.5l-5-2.5V9.4l5-2.5l5,2.5V14.5z M19.3,8l-6.7-3.3L5.8,8.1 L5.4,7.4l6.1-3.1l1-0.5l1,0.5l6.1,3L19.3,8z"/>
</g>
</svg>
`

export const ICONS = ['black', 'red', 'blue', 'yellow', 'orange', 'tomato'].map(
  color => 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(ICON_TEMPLATE.replace('{{fillcolor}}', color))
)

export const FOCUS_ICON =
  'data:image/svg+xml;charset=UTF-8;base64,' + btoa(FOCUS_ICON_TEMPLATE.replace('{{fillcolor}}', 'brown'))
