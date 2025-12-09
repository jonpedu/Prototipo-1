# 🚀 Guia de Deploy - SatelliteProg

## 📦 Build para Produção

### Frontend

```powershell
# Build otimizado
npm run build

# Preview do build
npm run preview
```

Isso gera uma pasta `dist/` com os arquivos estáticos otimizados.

## 🌐 Opções de Hospedagem

### 1. Vercel (Recomendado - Grátis)

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

**Configuração automática**: Vercel detecta Vite automaticamente.

### 2. Netlify (Grátis)

1. Conecte seu repositório GitHub
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automático a cada push

### 3. GitHub Pages

```powershell
# 1. Instale gh-pages
npm install --save-dev gh-pages

# 2. Adicione ao package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# 3. Atualize vite.config.js
export default defineConfig({
  base: '/satellite-prog/',  // nome do repo
  // ...
})

# 4. Deploy
npm run deploy
```

### 4. Servidor Próprio (VPS/Dedicated)

```bash
# 1. Build
npm run build

# 2. Copie dist/ para servidor
scp -r dist/* user@server:/var/www/satellite-prog

# 3. Configure Nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/satellite-prog;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. Reinicie Nginx
sudo systemctl restart nginx
```

## 🐍 Deploy do Backend

### Opção 1: Heroku (Simples)

```bash
# 1. Crie Procfile na raiz
web: cd server && python app.py

# 2. requirements.txt já existe em server/

# 3. Deploy
heroku create satellite-prog-api
git push heroku main
```

### Opção 2: Railway (Moderno)

1. Conecte repositório
2. Configure:
   - Root directory: `server`
   - Start command: `python app.py`
3. Deploy automático

### Opção 3: Render (Grátis)

1. Novo Web Service
2. Configure:
   - Build command: `pip install -r requirements.txt`
   - Start command: `python app.py`
   - Environment: Python 3

### Opção 4: VPS (Controle Total)

```bash
# 1. Setup servidor
sudo apt update
sudo apt install python3 python3-pip nginx

# 2. Clone projeto
git clone seu-repo.git
cd seu-repo/server

# 3. Instale dependências
pip3 install -r requirements.txt

# 4. Configure systemd service
sudo nano /etc/systemd/system/satellite-api.service

[Unit]
Description=SatelliteProg API
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/server
ExecStart=/usr/bin/python3 app.py
Restart=always

[Install]
WantedBy=multi-user.target

# 5. Inicie serviço
sudo systemctl start satellite-api
sudo systemctl enable satellite-api

# 6. Configure Nginx como proxy reverso
server {
    listen 80;
    server_name api.seu-dominio.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 Configurações de Produção

### Frontend (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ajuste para seu path
  build: {
    outDir: 'dist',
    sourcemap: false,  // Desabilite em produção
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'reactflow': ['reactflow'],
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://sua-api.com',  // URL do backend em produção
        changeOrigin: true
      }
    }
  }
})
```

### Backend (app.py)

```python
import os

# Configurações de produção
DEBUG = os.getenv('DEBUG', 'False') == 'True'
PORT = int(os.getenv('PORT', 5000))
HOST = os.getenv('HOST', '0.0.0.0')

if __name__ == '__main__':
    app.run(
        debug=DEBUG,
        host=HOST,
        port=PORT
    )
```

### Variáveis de Ambiente

Crie `.env` (não commitar):

```env
# Frontend
VITE_API_URL=https://api.seu-dominio.com

# Backend
FLASK_ENV=production
DEBUG=False
PORT=5000
```

## 🔒 Segurança

### HTTPS/SSL

```bash
# Usando Let's Encrypt (Certbot)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

### CORS em Produção

```python
# app.py
from flask_cors import CORS

# Especifique origens permitidas
CORS(app, origins=[
    'https://seu-dominio.com',
    'https://www.seu-dominio.com'
])
```

### Headers de Segurança

```python
@app.after_request
def set_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response
```

## 📊 Monitoramento

### Frontend

```javascript
// Google Analytics
// Adicione ao index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Backend

```python
# Logging
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

@app.before_request
def log_request():
    logging.info(f'{request.method} {request.path}')
```

## 🚀 CI/CD

### GitHub Actions (.github/workflows/deploy.yml)

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install and Build
      run: |
        npm install
        npm run build
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=dist
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📈 Performance

### Otimizações

1. **Lazy Loading**
```javascript
const CodeViewer = lazy(() => import('./components/CodeViewer'));
```

2. **Image Optimization**
```bash
npm install --save-dev vite-plugin-imagemin
```

3. **Compression**
```bash
# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

## 🔍 SEO (se aplicável)

```html
<!-- index.html -->
<head>
  <title>SatelliteProg - Programação Visual de Nanossatélites</title>
  <meta name="description" content="Interface visual para programar nanossatélites educacionais">
  <meta property="og:title" content="SatelliteProg">
  <meta property="og:description" content="Programação visual de satélites">
  <meta property="og:image" content="/og-image.png">
</head>
```

## 📱 PWA (Opcional)

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SatelliteProg',
        short_name: 'SatProg',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## ✅ Checklist de Deploy

- [ ] Build sem erros
- [ ] Testes passam
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] HTTPS ativado
- [ ] Backup do banco (se aplicável)
- [ ] Monitoramento configurado
- [ ] Domínio apontando corretamente
- [ ] Logs funcionando
- [ ] Cache configurado

## 🆘 Troubleshooting

### Erro: Página em branco

```javascript
// Verifique base no vite.config.js
base: '/seu-path/'  // Se não estiver na raiz
```

### Erro: API não conecta

```javascript
// Verifique proxy/URL da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### Erro: Assets não carregam

```javascript
// Use caminhos absolutos
<img src="/satellite.svg" />
```

---

**Pronto para deploy! 🚀**
