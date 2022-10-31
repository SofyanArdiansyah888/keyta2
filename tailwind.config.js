/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
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
}
