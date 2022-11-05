/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT ({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    colors:{
     
      "blue": {
        "50": "#555e76",
        "100": "#4b546c",
        "200": "#414a62",
        "300": "#374058",
        "400": "#2d364e",
        "500": "#232c44",
        "600": "#19223a",
        "700": "#0f1830",
        "800": "#050e26",
        "900": "#00041c"
      }
      
    },
    extend: {
      colors: {
        keytaPrimary:"#232C44",
        keytaSecondary:"#F5B22D",
        orangeLighter:"#FFF7E8",
        keytaTertiary:"#F4EAC6",
        keytaGrayMedium:"#42454D",
        keytaCarnelian:'#E60036',
        keytaGray:"#f9fafb",
        keytaGrayDarker:"#F9F9F9",
        
        keytaDark:"#14151A",
        keytaDarkBlue:"#023E8A",
        keytaBlack:"#151313",
      },
      fontFamily:{
        roboto : ['Roboto'],
        inter : ['Inter'],
        poppins : ['Poppins']
      }
    },
    container:{
      center:true
    }
  },
  plugins: [],
})
