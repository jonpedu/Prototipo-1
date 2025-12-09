# 🛰️ SatelliteProg - Interface de Programação Visual para Nanossatélites

![SatelliteProg](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Uma interface visual de programação baseada em fluxo de dados para configuração e programação de nanossatélites educacionais. Inspirada em ferramentas como Orange Data Mining e BIPES.

## 🌟 Características

- **🎨 Interface Visual Intuitiva**: Sistema drag-and-drop para criar fluxos de programação
- **📦 Biblioteca Rica de Blocos**: 
  - Sensores (Câmera, Temperatura, GPS, Magnetômetro)
  - Atuadores (Propulsores, Painéis Solares, LEDs)
  - Comunicação (Transmissão/Recepção de dados)
  - Lógica (Condicionais, Loops, Temporizadores)
  - Tarefas Autônomas (Manutenção de órbita, Coleta de dados)
  - Gerenciamento de Energia
- **⚙️ Configuração Dinâmica**: Painel de propriedades para cada bloco
- **🐍 Geração de Código Python**: Conversão automática do fluxo visual para MicroPython
- **💾 Salvar/Carregar Projetos**: Persistência de missões completas
- **🔍 Pré-visualização em Tempo Real**: Visualização do código gerado
- **🚀 Simulação**: Execução do código no backend Python

## 📋 Pré-requisitos

- **Node.js** 18+ e npm
- **Python** 3.8+
- Navegador moderno (Chrome, Firefox, Edge)

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
cd "c:\Users\Usuário\Desktop\8 PERIODO\TCC\prototipo"
```

### 2. Instale as dependências do frontend

```powershell
npm install
```

### 3. Instale as dependências do backend

```powershell
cd server
pip install -r requirements.txt
cd ..
```

### 4. Execute o projeto

#### Opção A: Executar ambos simultaneamente

**Terminal 1 - Frontend:**
```powershell
npm run dev
```

**Terminal 2 - Backend:**
```powershell
npm run server
```

#### Opção B: Executar manualmente

**Frontend:**
```powershell
npm run dev
```
Acesse: http://localhost:3000

**Backend:**
```powershell
cd server
python app.py
```
O backend estará em: http://localhost:5000

## 📖 Como Usar

### 1. Criando uma Missão

1. **Arraste blocos** da biblioteca lateral esquerda para a área central
2. **Conecte os blocos** clicando e arrastando das saídas (direita) para as entradas (esquerda)
3. **Configure propriedades** clicando em cada bloco e ajustando no painel direito
4. **Organize** o fluxo de forma lógica

### 2. Gerando Código

1. Clique no botão **"Gerar Código Python"** no canto inferior direito
2. Visualize o código MicroPython gerado
3. **Copie** ou **baixe** o código para uso posterior

### 3. Executando Simulação

1. Clique em **"Executar Simulação"**
2. Observe os logs no console de simulação
3. Veja os resultados da execução

### 4. Salvando Projetos

1. Clique em **"Salvar"** na barra superior
2. O arquivo `.json` será baixado com toda a configuração da missão
3. Use **"Abrir"** para carregar projetos salvos

## 🏗️ Estrutura do Projeto

```
prototipo/
├── src/
│   ├── components/
│   │   ├── App.jsx                 # Componente principal
│   │   ├── BlockLibrary.jsx        # Biblioteca de blocos
│   │   ├── FlowCanvas.jsx          # Área de desenho do fluxo
│   │   ├── CustomNode.jsx          # Componente de nó customizado
│   │   ├── PropertiesPanel.jsx     # Painel de propriedades
│   │   ├── CodeViewer.jsx          # Visualizador de código
│   │   ├── SimulationViewer.jsx    # Console de simulação
│   │   └── Toolbar.jsx             # Barra de ferramentas
│   ├── store/
│   │   └── useStore.js             # Gerenciamento de estado (Zustand)
│   ├── utils/
│   │   └── blockDefinitions.js     # Definições dos blocos
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Estilos globais
├── server/
│   ├── app.py                      # Backend Flask
│   └── requirements.txt            # Dependências Python
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Blocos Disponíveis

### 📡 Sensores
- **Câmera**: Captura de imagens com configuração de resolução e exposição
- **Temperatura**: Leitura de temperatura em diferentes unidades
- **Magnetômetro**: Medição de campo magnético
- **GPS**: Obtenção de coordenadas e altitude

### ⚙️ Atuadores
- **Propulsor**: Controle de propulsão com direção e potência
- **Painel Solar**: Abertura e orientação de painéis
- **LED de Status**: Indicadores visuais configuráveis

### 📶 Comunicação
- **Transmitir Dados**: Envio de telemetria para estação terrestre
- **Receber Comando**: Aguardar comandos da Terra

### 🔀 Lógica
- **Condição (If/Else)**: Execução condicional
- **Aguardar**: Temporizadores
- **Loop**: Repetições fixas ou infinitas

### 🤖 Tarefas Autônomas
- **Manter Órbita**: Controle automático de altitude
- **Coletar Dados**: Aquisição automatizada de sensores
- **Emergência**: Beacon de emergência

### 🔋 Energia
- **Verificar Bateria**: Monitoramento de carga
- **Modo de Energia**: Ajuste de consumo

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 18 - Framework UI
- **React Flow** - Biblioteca de diagramação visual
- **Zustand** - Gerenciamento de estado
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **Lucide React** - Ícones
- **React Syntax Highlighter** - Highlight de código

### Backend
- **Python** 3.8+
- **Flask** - Framework web
- **Flask-CORS** - Cross-Origin Resource Sharing

## 🎨 Personalização

### Adicionando Novos Blocos

Edite `src/utils/blockDefinitions.js`:

```javascript
{
  id: 'meu_bloco',
  type: 'sensor',
  label: 'Meu Sensor',
  icon: '🔧',
  color: '#10b981',
  inputs: 1,
  outputs: 1,
  properties: {
    parametro: { 
      type: 'number', 
      label: 'Parâmetro', 
      min: 0, 
      max: 100, 
      default: 50 
    }
  },
  code: (props) => `
# Código gerado
sensor = MeuSensor(parametro=${props.parametro})
`
}
```

## 🐛 Resolução de Problemas

### Frontend não inicia
```powershell
# Limpe o cache e reinstale
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Backend não conecta
- Verifique se a porta 5000 está livre
- Confirme que as dependências Python estão instaladas
- Verifique o firewall

### Blocos não aparecem
- Verifique o console do navegador (F12)
- Confirme que `blockDefinitions.js` está correto

## 📝 Exemplos de Missões

### Missão 1: Captura de Imagem e Transmissão
1. Ativar Câmera (resolução 1920x1080)
2. Aguardar (5 segundos)
3. Transmitir Dados (437.5 MHz)

### Missão 2: Monitoramento de Temperatura
1. Loop (10 vezes)
2. Ler Temperatura
3. Se temperatura > 50°C
   - Transmitir Emergência
4. Aguardar (60 segundos)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- Desenvolvido como parte do TCC - 8º Período

## 🙏 Agradecimentos

- Inspirado em [Orange Data Mining](https://orangedatamining.com/)
- Inspirado em [BIPES](https://bipes.net.br/)
- Comunidade React Flow
- Projeto educacional de nanossatélites

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**
