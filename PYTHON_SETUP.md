# 🐍 Guia de Instalação do Backend Python

## Problema: Python não encontrado

Se você recebeu a mensagem "Python não foi encontrado", siga estas etapas:

### Opção 1: Instalar Python via Microsoft Store (Recomendado)

1. Pressione `Win + S` e busque por "Microsoft Store"
2. Procure por "Python 3.12" ou "Python 3.11"
3. Clique em "Obter" ou "Instalar"
4. Aguarde a instalação
5. Reinicie o terminal

### Opção 2: Instalar Python via python.org

1. Acesse: https://www.python.org/downloads/
2. Baixe a versão mais recente do Python 3
3. **IMPORTANTE**: Durante a instalação, marque a opção "Add Python to PATH"
4. Complete a instalação
5. Reinicie o computador

### Verificar Instalação

Abra um novo terminal PowerShell e execute:

```powershell
python --version
```

Deve mostrar algo como: `Python 3.11.x` ou `Python 3.12.x`

## Instalando Dependências do Backend

Após instalar o Python:

```powershell
cd "c:\Users\Usuário\Desktop\8 PERIODO\TCC\prototipo\server"
python -m pip install -r requirements.txt
```

## Iniciando o Backend

```powershell
cd "c:\Users\Usuário\Desktop\8 PERIODO\TCC\prototipo\server"
python app.py
```

Você deve ver:
```
🛰️ SatelliteProg Backend Server
==================================================
Servidor iniciado em http://localhost:5000
...
```

## Modo Sem Backend (Demonstração)

O frontend funciona perfeitamente sem o backend! Você pode:
- ✅ Arrastar e soltar blocos
- ✅ Conectar blocos
- ✅ Configurar propriedades
- ✅ Gerar código Python
- ✅ Visualizar código
- ✅ Salvar/Carregar projetos

**Apenas a execução do código** requer o backend rodando.

## Testando o Backend

Se o backend estiver rodando, teste em outro terminal:

```powershell
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET
```

Ou abra no navegador:
```
http://localhost:5000/api/health
```

## Solução de Problemas

### Erro: "porta 5000 em uso"

Outra aplicação está usando a porta 5000. Altere em `server/app.py`:

```python
app.run(debug=True, port=5001)  # Mude para 5001
```

E em `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Mude para 5001
    changeOrigin: true
  }
}
```

### Erro: ModuleNotFoundError

Reinstale as dependências:

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### Python está instalado mas não funciona

Verifique o PATH:

```powershell
$env:Path -split ';' | Select-String -Pattern 'Python'
```

Se não aparecer nada, adicione manualmente ao PATH do Windows.
