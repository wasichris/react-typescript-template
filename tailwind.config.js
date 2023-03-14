/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`
const linearValues = (pxList) => {
  const spacing = {}
  const pxToIndex = (px, base = 4) => `${px / base}`
  pxList.forEach((px) => { spacing[pxToIndex(px)] = pxToRem(px) })
  return spacing
}

module.exports = {
  corePlugins: {
    // 禁用 Tailwind 針對項目預設的基礎樣式
    // 因為已經有使用 normalize.css，並且只用 tailwind 做為 utilities 樣式庫
    preflight: false
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    // 覆寫
    screens: {
      md: '768px', // tablets: @media (min-width: 768px)
      lg: '992px', // laptops: @media (min-width: 992px)
      xl: '1280px' // large laptops: @media (min-width: 1280px)
    },
    // 擴充 or 單項覆寫
    extend: {
      fontSize: {
        '11p': pxToRem(11), // '0.6875rem',
        '32p': pxToRem(32), // '2rem',
        '40p': pxToRem(40) // '2.5rem'
      },
      spacing:
      {
        // 擴充沒有提供的 space px 間隔
        // e.g. 3px 透過公式轉換成設定值
        // '0.75': '0.1875rem' /* 3px */
        // 就可以使用 m-0.75, p-0.75 ... 表示 3px 間距
        ...linearValues([
          3,
          5,
          30,
          60,
          99,
          68,
          100,
          368,
          576,
          1440
        ])
      }
    }
  },
  plugins: []
}
