/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Tangerine", "sans-serif"],
      },
      backgroundImage: {
        register:
          "url('https://i.pinimg.com/originals/fd/bc/86/fdbc868170617f3d0b2be00c498b06d1.gif')",
        login:
          "url('https://i.pinimg.com/originals/6d/7a/1e/6d7a1ef061b28c99ab415e937df1268d.gif')",
        application:
          "url('https://i.pinimg.com/originals/64/17/ad/6417adc64ecf58851f079828a1ecbab4.gif')",
        spellBook:
          "url('https://clipart.info/images/ccovers/1486144399Old-Open-Book-PNG-ClipArt.png')",
      },
    },
  },
  plugins: [],
};
