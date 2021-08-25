import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let prodMock = false
  return {
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    },
    plugins: [
      vue(),
      mock(command, prodMock),
    ]
  }
})

const mock = (command, prodMock) => {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: command === 'serve',
    prodEnabled: command !== 'serve' && prodMock,
    injectCode: `
      import { setupProdMockServer } from './mockProdServer'
      setupProdMockServer()
    `,
  })
}
