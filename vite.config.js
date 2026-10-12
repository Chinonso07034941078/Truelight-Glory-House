import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import wccRegistration from './server/wccRegistration.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'WCC_')
  if (env.WCC_API_URL) process.env.WCC_API_URL = env.WCC_API_URL
  return {
    plugins: [react(), {
      name: 'wcc-registration-api',
      configureServer(server) {
        server.middlewares.use('/api/wcc-registration', async (req, res) => {
          res.status = code => { res.statusCode = code; return res }
          res.json = body => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
          }
          let body = ''
          for await (const chunk of req) {
            body += chunk
            if (Buffer.byteLength(body) > 65536) {
              return res.status(413).json({ ok: false, error: 'Registration request is too large.' })
            }
          }
          req.body = body
          await wccRegistration(req, res)
        })
      },
    }],
  }
})
