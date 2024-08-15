/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
     
    extend: {
      boxShadow: {
       'boxShadow1':'0 5px 15px rgba(0, 0, 0, 0.8)'
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      },
      fontFamily: {
        'roboto':[ '"Roboto", sans-serif' ]
      }
    },
    colors: {
      slate: {
        50: '#f9fafb',
        100: '#f4f5f7',
        200: '#e5e7eb',
        300: '#d2d6dc',
        400: '#9fa6b2',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#252f3f',
        900: '#161e2e',
      },
      'main': '#0e1133',
      'pgcolor': '#505056',
      'three': '#e00256',
      'black': '#212121',
      'white': '#ffffff',
      'gray': '#808080e2',
      'color1': '#2eacfc',
      'color2': '#EA4c89', 
      'color3': '#3578ff', 
      'color4': '#f67741', 
      'color5': '#6A88f7', 
      'color6':' #3ab094',
      'color7': '#f1f2f7',
      'pricingcard':"#eef1f6",
      'color8':'#74c0fc',
      'color9':'#effaf3',
      'red':'#f8452d',
      'shopbgcolor':'#007bff',
      'bgnavclr':'#446bb9',
      'inputbgclr':'#f5f5f7',
      'logoClr':'#f68712'
 
    }
  },
  plugins: [],
}