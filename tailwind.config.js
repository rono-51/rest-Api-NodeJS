module.exports = {
  content: ["./src/views/**/*.hbs"],
  theme: {
    extend: {
      keyframes: {
        levitation: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(40px)' },
        }
      },
      animation: {  
        levitation: 'levitation 3.5s ease-in-out alternate infinite',
      }
    },
  },
  plugins: [],
}