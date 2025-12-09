# 🛰️ PION CanSat Programmer

Interface visual de programação drag-and-drop para o Kit Educacional PION CanSat com ESP32. Programe seu nanossatélite sem escrever código!

## 🚀 Início Rápido

### Executar Automaticamente

```powershell
# Execute o script de inicialização
.\start.ps1
```

O script irá:
- ✅ Verificar Node.js e Python
- ✅ Instalar dependências automaticamente
- ✅ Iniciar frontend (Vite) e backend (Flask)
- ✅ Abrir o navegador em http://localhost:3000

### Executar Manualmente

**Frontend:**
```powershell
npm install
npm run dev
```

**Backend (em outro terminal):**
```powershell
cd server
pip install -r requirements.txt
python app.py
```

Acesse: http://localhost:3000

## 🎯 Características

- **Programação Visual 100%** - Sem necessidade de escrever código
- **13 Blocos Específicos PION CanSat** - Sensores BME280, MPU6050, LEDs, Buzzer, SD Card
- **15 Blocos de Lógica** - Loops, condicionais, variáveis, operações matemáticas
- **Conexão Serial Direta** - Upload de código via Web Serial API (USB)
- **Projetos XML** - Salve e carregue suas missões
- **Geração MicroPython** - Código otimizado para ESP32
- **Simulação Local** - Teste sem hardware

## 📦 Blocos Disponíveis

### 🎬 Inicial
- **🚀 Iniciar Missão** - Ponto de entrada obrigatório

### 📡 Sensores (5 blocos)
- **🌡️ Ler Temperatura** - BME280 (°C)
- **💧 Ler Umidade** - BME280 (%)
- **🌪️ Ler Pressão** - BME280 (hPa)
- **📍 Ler Acelerômetro** - MPU6050 (X, Y, Z)
- **🔋 Ler Bateria** - ADC Pin 34

### 💡 Atuadores (3 blocos)
- **💡 LED Branco** - Pin 25 (On/Off)
- **🎨 LED RGB** - NeoPixel Pin 26 (cores RGB)
- **🔊 Buzzer** - PWM Pin 27 (frequência Hz)

### 💾 Dados (2 blocos)
- **💾 Salvar no SD** - Grava dados em arquivo
- **📡 Enviar WiFi** - Transmite dados via rede

### 🧠 Lógica Completa (15 blocos)

#### Controle de Fluxo
- **⏱️ Aguardar** - Delay em segundos
- **🔄 Loop Infinito** - Repetição contínua (container)
- **🔢 Repetir N vezes** - Loop controlado (container)
- **🔁 Enquanto (While)** - Loop condicional (container)
- **🚪 Sair do Loop** - Break statement

#### Condicionais
- **❓ Se/Então** - If com valor fixo
- **⚖️ Se Comparar** - Comparação entre variáveis

#### Variáveis
- **📝 Criar Variável** - Declaração e atribuição
- **💾 Armazenar** - Copiar valores

#### Matemática
- **➕ Operação** - +, -, *, /, //, %, **
- **📊 Calcular Média** - Média de múltiplos valores
- **🔼 Incrementar** - ++, --, +=, -=

#### Especiais
- **🖨️ Print/Log** - Debug via console
- **🎲 Número Aleatório** - Random entre min/max
- **⏰ Timestamp** - Hora atual

## 📖 Como Usar

### Interface Completa

```
┌─────────────────────────────────────────────────────────────┐
│  🛰️ CanSat Programmer                                       │
│  [ESP32 ▼] [🔌 Conectar] [⬆ Upload] [💾 Salvar] [📁 Abrir] │
├──────────────┬──────────────────────────┬──────────────────┤
│              │                          │                  │
│  📚 BLOCOS   │   🎨 ÁREA DE MISSÃO     │  ⚙️ PROPRIEDADES│
│              │                          │                  │
│  🎬 Inicial  │   Arraste blocos         │  Configure cada  │
│  📡 Sensores │   e conecte aqui         │  bloco aqui      │
│  💡 Atuadores│                          │                  │
│  💾 Dados    │                          │                  │
│  🧠 Lógica   │                          │                  │
│              │                          │                  │
└──────────────┴──────────────────────────┴──────────────────┘
```

### Passo a Passo

**1. Criar Missão**
1. Arraste bloco **"🚀 Iniciar Missão"** (obrigatório)
2. Adicione blocos de sensores, atuadores ou lógica
3. Conecte clicando e arrastando entre os pontos

**2. Configurar Blocos**
- Clique em um bloco
- Ajuste propriedades no painel direito
- Ex: nome de variável, tempo de espera, cores RGB

**3. Conectar ao ESP32**
1. Conecte ESP32 via USB
2. Clique **"🔌 Conectar"**
3. Selecione porta COM (Web Serial API)
4. Status muda para verde ✅

**4. Enviar Código**
1. Clique **"⬆ Upload"**
2. Código MicroPython é gerado e enviado
3. ESP32 executa automaticamente

**5. Salvar Projeto**
- Clique **"💾 Salvar"** → Exporta XML
- Clique **"📁 Abrir"** → Importa XML

## 💡 Exemplos Práticos

### Exemplo 1: Estação Meteorológica
```
🚀 Iniciar Missão
    ↓
🔄 Loop Infinito (intervalo: 10s)
    ↓
🌡️ Ler Temperatura → var: temp
    ↓
💧 Ler Umidade → var: umid
    ↓
💾 Salvar no SD → arquivo: dados.txt
    ↓
⏱️ Aguardar 10s
```

### Exemplo 2: Alerta de Temperatura
```
🚀 Iniciar Missão
    ↓
🔄 Loop Infinito (intervalo: 5s)
    ↓
🌡️ Ler Temperatura → var: temp
    ↓
❓ Se temp > 30
    ↓ Sim          ↓ Não
💡 LED Branco    ⏱️ Aguardar 5s
   (ligar)
```

### Exemplo 3: Contador com Display
```
🚀 Iniciar Missão
    ↓
📝 Criar Variável → contador = 0
    ↓
🔢 Repetir 10 vezes
    ↓
🎨 LED RGB → cor baseada em contador
    ↓
🖨️ Print → "Contador: {contador}"
    ↓
🔼 Incrementar → contador++
    ↓
⏱️ Aguardar 1s
```

## 🔧 Requisitos

### Software
- **Node.js** 18+ → [Download](https://nodejs.org)
- **Python** 3.8+ → [Download](https://python.org)
- **Navegador** Chrome, Edge ou Opera (Web Serial API)

### Hardware
- **PION CanSat Kit** ou **ESP32 DevKit**
- **Sensores** BME280 (I2C), MPU6050 (I2C)
- **Cabo USB** para ESP32
- **Driver** CH340 ou CP2102 (se necessário)

### Dependências Python
```powershell
cd server
pip install Flask Flask-CORS python-dotenv
```

### Dependências Node.js
```powershell
npm install
```

## 🛠️ Solução de Problemas

### Erro: "Conectar" não funciona
- ✅ Use Chrome, Edge ou Opera (Web Serial API)
- ✅ Instale driver CH340/CP2102 para ESP32
- ✅ Verifique conexão USB
- ✅ Feche outros programas usando a porta serial

### Erro: Backend não inicia
```powershell
cd server
pip install -r requirements.txt
python app.py
```

### Erro: Frontend não carrega
```powershell
npm install
npm run dev
```

### Porta 3000 ou 5000 ocupada
```powershell
# Mudar porta Vite: editar vite.config.js
# Mudar porta Flask: editar server/app.py
```

### Upload falha
- Verifique se ESP32 está em modo bootloader
- Pressione botão BOOT ao conectar
- Reinstale driver USB

## 📁 Estrutura do Projeto

```
Prototipo-1/
├── src/
│   ├── App.jsx                   # Aplicação principal
│   ├── components/
│   │   ├── BlockLibrary.jsx      # Biblioteca de blocos lateral
│   │   ├── FlowCanvas.jsx        # Canvas com React Flow
│   │   ├── CustomNode.jsx        # Renderização de blocos
│   │   ├── PropertiesPanel.jsx   # Painel de propriedades
│   │   ├── Toolbar.jsx           # Barra superior
│   │   ├── CodeViewer.jsx        # Visualizador de código
│   │   ├── SerialMonitor.jsx     # Monitor serial
│   │   └── SimulationViewer.jsx  # Simulação
│   ├── store/
│   │   └── useStore.js           # Estado global (Zustand)
│   └── utils/
│       ├── blockDefinitions.js   # 28 blocos definidos
│       ├── serialConnection.js   # Web Serial API
│       └── xmlUtils.js           # Import/Export XML
│
├── server/
│   ├── app.py                    # Backend Flask
│   └── requirements.txt          # Dependências Python
│
├── examples/
│   ├── example_mission_battery_management.json
│   └── example_mission_data_collection.json
│
├── start.ps1                     # Script de inicialização
├── package.json                  # Dependências Node.js
├── vite.config.js                # Config Vite
└── README.md                     # Este arquivo
```

## 📚 Documentação Técnica

- **[LOGIC_BLOCKS_GUIDE.md](LOGIC_BLOCKS_GUIDE.md)** - Guia detalhado dos 15 blocos de lógica com exemplos
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Guia visual da interface com diagramas ASCII
- **[WEB_SERIAL_INTEGRATION.md](WEB_SERIAL_INTEGRATION.md)** - Documentação da integração Web Serial API
- **[XML_FORMAT_GUIDE.md](XML_FORMAT_GUIDE.md)** - Especificação do formato XML para projetos

## 🎓 Uso Educacional

Este projeto foi desenvolvido para:
- ✅ Ensino de lógica de programação sem código
- ✅ Introdução a sistemas embarcados (ESP32)
- ✅ Aprendizado de sensores e atuadores
- ✅ Projetos de CanSat educacionais
- ✅ Competições de robótica/satélites

## 🔒 Segurança

- ✅ Código processado localmente
- ✅ Sem envio de dados externos
- ✅ Conexão serial direta (navegador ↔ ESP32)
- ✅ Validação de blocos antes do upload

## 📄 Licença

Projeto educacional desenvolvido para TCC.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Este é um projeto educacional open-source.

---

**Desenvolvido com ❤️ para educação em tecnologia espacial e sistemas embarcados**
