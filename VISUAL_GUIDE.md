# 🎨 Guia Visual - SatelliteProg

## 📸 Capturas de Tela (Descrições)

### 1. Tela Principal
```
╔════════════════════════════════════════════════════════════════╗
║  🛰️ SatelliteProg | Programação Visual de Nanossatélites      ║
║  [Abrir] [Salvar] [Limpar]     🔵 5 Blocos | 🟣 4 Conexões     ║
╠═══════════╦════════════════════════════════════╦══════════════╣
║           ║                                    ║              ║
║ 📚 BLOCOS ║      🎨 ÁREA DE MISSÃO             ║ ⚙️ PROPS     ║
║           ║                                    ║              ║
║ 📡 Senso- ║    ┌─────┐      ┌─────┐           ║ Selecione    ║
║    res    ║    │ 📷  │─────▶│ 📤  │           ║ um bloco     ║
║ ▼         ║    └─────┘      └─────┘           ║ para         ║
║  📷 Câme- ║                                    ║ configurar   ║
║     ra    ║    ┌─────┐                        ║              ║
║  🌡️ Temp  ║    │ 🔋  │                        ║              ║
║  🛰️ GPS   ║    └─────┘                        ║              ║
║  🧲 Mag   ║                                    ║              ║
║           ║    MiniMap: [====]                ║              ║
║ ⚙️ Atuad. ║                                    ║              ║
║ ▼         ║                                    ║              ║
║  🚀 Prop  ║                                    ║              ║
║  ...      ║                                    ║              ║
╚═══════════╩════════════════════════════════════╩══════════════╝
                [Gerar Código Python] [▶ Executar]
```

### 2. Bloco Selecionado
```
╔══════════════════════════════════════╗
║ ⚙️ PROPRIEDADES                      ║
╟──────────────────────────────────────╢
║  📷 Ativar Câmera          [❌]      ║
║  Tipo: sensor                         ║
╟──────────────────────────────────────╢
║  📋 Configurações                     ║
║                                       ║
║  Resolução                            ║
║  ┌─────────────────────────────────┐ ║
║  │ 1920x1080                    ▼  │ ║
║  └─────────────────────────────────┘ ║
║                                       ║
║  Exposição (ms)                       ║
║  ┌─────────────────────────────────┐ ║
║  │ 100                              │ ║
║  └─────────────────────────────────┘ ║
║  Min: 1              Max: 1000        ║
║                                       ║
║  Formato                              ║
║  ┌─────────────────────────────────┐ ║
║  │ JPEG                         ▼  │ ║
║  └─────────────────────────────────┘ ║
╟──────────────────────────────────────╢
║  ℹ️ Informações                      ║
║  Entradas: 1                          ║
║  Saídas: 1                            ║
║  ID: node_172900...                   ║
╟──────────────────────────────────────╢
║  💻 Pré-visualização                 ║
║  ┌────────────────────────────────┐  ║
║  │ # Ativar Câmera                │  ║
║  │ camera = Camera(               │  ║
║  │   resolution="1920x1080",      │  ║
║  │   exposure=100,                │  ║
║  │   format="JPEG"                │  ║
║  │ )                              │  ║
║  │ image_data = camera.capture()  │  ║
║  └────────────────────────────────┘  ║
╚══════════════════════════════════════╝
```

### 3. Visualizador de Código
```
╔═══════════════════════════════════════════════════════════════╗
║  💻 Código Python Gerado                           [Fechar]   ║
║  Missão do Nanossatélite                                      ║
╟───────────────────────────────────────────────────────────────╢
║  1  # Código gerado automaticamente para Nanossatélite        ║
║  2  # Gerado em: 16/10/2025 14:30:00                          ║
║  3                                                             ║
║  4  import time                                                ║
║  5  from satellite_libs import *                              ║
║  6                                                             ║
║  7  def main():                                                ║
║  8      print("=== Iniciando Missão ===")                     ║
║  9                                                             ║
║ 10      # Bloco 1: Ativar Câmera                              ║
║ 11      camera = Camera(resolution="1920x1080", ...)          ║
║ 12      image_data = camera.capture()                         ║
║ 13                                                             ║
║ 14      # Bloco 2: Enviar Dados                               ║
║ 15      transmitter = Transmitter(frequency=437.5)            ║
║ 16      transmitter.send(image_data)                          ║
║ 17                                                             ║
║ 18      print("=== Missão Concluída ===")                     ║
║ 19                                                             ║
║ 20  if __name__ == "__main__":                                ║
║ 21      main()                                                 ║
╟───────────────────────────────────────────────────────────────╢
║  2 blocos na missão                                           ║
║                      [📋 Copiar] [⬇️ Download] [▶️ Executar]  ║
╚═══════════════════════════════════════════════════════════════╝
```

### 4. Console de Simulação
```
┌──────────────────────────────────────┐
│ 💻 Console de Simulação      🟢 Exec │
├──────────────────────────────────────┤
│ ℹ️ 🚀 Simulação iniciada...          │
│ ℹ️ === Iniciando Missão ===          │
│ ℹ️ Imagem capturada: 2764800 bytes   │
│ ℹ️ Transmitindo dados em 437.5 MHz   │
│ ✅ === Missão Concluída ===          │
│                                       │
└──────────────────────────────────────┘
```

## 🎨 Paleta de Cores

### Cores Principais
- **Fundo Dark**: `#0a0e27` (Azul escuro espacial)
- **Azul Espacial**: `#1e3a8a`
- **Cyan/Turquesa**: `#06b6d4` (Conexões, destacues)
- **Roxo**: `#5b21b6` (Detalhes secundários)

### Cores por Categoria de Bloco
- 📡 **Sensores**: `#10b981` (Verde)
- ⚙️ **Atuadores**: `#f59e0b` (Laranja)
- 📶 **Comunicação**: `#6366f1` (Azul Índigo)
- 🔀 **Lógica**: `#8b5cf6` (Roxo)
- 🤖 **Autônomos**: `#ec4899` (Rosa)
- 🔋 **Energia**: `#eab308` (Amarelo)

### Estados
- **Hover**: Borda `#06b6d4` + Shadow cyan
- **Selecionado**: Borda `#06b6d4` (2px) + Glow
- **Desabilitado**: Opacidade 50%

## 🎭 Ícones Utilizados

### Blocos de Sensor
- 📷 Câmera
- 🌡️ Temperatura
- 🛰️ GPS
- 🧲 Magnetômetro

### Blocos de Atuador
- 🚀 Propulsor
- ☀️ Painel Solar
- 💡 LED

### Blocos de Comunicação
- 📤 Transmitir
- 📥 Receber

### Blocos de Lógica
- ❓ If/Else
- ⏱️ Aguardar
- 🔁 Loop

### Blocos Autônomos
- 🌍 Manter Órbita
- 📊 Coletar Dados
- 🚨 Emergência

### Blocos de Energia
- 🔋 Bateria
- ⚡ Modo Energia

### Ícones da Interface
- 🛰️ Logo do app
- 📋 Toolbar
- 💾 Salvar
- 📁 Abrir
- 🗑️ Limpar
- 💻 Código
- ▶️ Executar
- 📋 Copiar
- ⬇️ Download

## 📐 Layout Responsivo

### Desktop (> 1280px)
```
┌─────────┬──────────────┬──────────┐
│ Library │    Canvas    │   Props  │
│  280px  │     Flex     │  320px   │
└─────────┴──────────────┴──────────┘
```

### Tablet (768px - 1280px)
```
┌──────────────────┬──────────┐
│     Canvas       │  Props   │
│      Flex        │  280px   │
└──────────────────┴──────────┘
       ↓
  [Drawer Library]
```

### Mobile (< 768px)
```
┌────────────────────┐
│      Canvas        │
│       100%         │
└────────────────────┘
      ↓
 [Bottom Sheet: Lib & Props]
```

## 🎬 Animações

### Transições
- **Hover em blocos**: `transform: translateY(-2px)` em 0.3s
- **Conexões**: `stroke-dasharray` animado
- **Painéis**: `slide-in` lateral
- **Modais**: `fade-in` + `scale(0.95 → 1)`

### Efeitos
- **Estrelas de fundo**: `pulse` com delays aleatórios
- **Botão gerar código**: `glow` pulsante
- **Status de execução**: Ponto verde com `pulse`

## 🖼️ Componentes Visuais

### Bloco (CustomNode)
```
┌─────────────────────────┐
│ ● [Entrada]             │
│   📷 Ativar Câmera      │
│   sensor                │
│   ┌───────────────────┐ │
│   │ 3 propriedades    │ │
│   └───────────────────┘ │
│                  [Saída]● │
└─────────────────────────┘
```

### Card na Biblioteca
```
┌───────────────────────────┐
│ 📷 Ativar Câmera         │
│ 1 entrada • 1 saída       │
│ ─────────────────────────│
│ Configurável:             │
│ resolution, exposure...   │
└───────────────────────────┘
```

### Categoria Expandida
```
▼ 📡 Sensores [4]
  ├─ 📷 Ativar Câmera
  ├─ 🌡️ Ler Temperatura
  ├─ 🛰️ Ler GPS
  └─ 🧲 Medir Magnetismo
```

### Categoria Colapsada
```
▶ 📡 Sensores [4]
```

## 🎯 Elementos Interativos

### Hover States
- Blocos: Elevação + Shadow
- Botões: Brightness +10%
- Conexões: Stroke width +1px
- Cards biblioteca: Border color change

### Click States
- Blocos: Border cyan + Focus ring
- Botões: Scale(0.95) momentâneo
- Handles: Aumenta tamanho

### Drag States
- Bloco arrastado: Opacity 0.7 + Cursor grabbing
- Drop zone: Background highlight
- Conexão em criação: Linha tracejada

## 🌈 Gradientes

### Background Principal
```css
background: linear-gradient(135deg, #0a0e27 0%, #1e3a8a 100%);
```

### Headers e Painéis
```css
background: linear-gradient(to bottom, #1f2937, #111827);
```

### Botões Primários
```css
background: linear-gradient(to right, #06b6d4, #3b82f6);
```

### Overlay de Blocos
```css
background: linear-gradient(135deg, ${color}20 0%, transparent 100%);
```

## 📱 Touch Gestures (Mobile)

- **Tap**: Selecionar bloco
- **Long Press**: Abrir menu de contexto
- **Pinch**: Zoom in/out no canvas
- **Two-finger drag**: Pan no canvas
- **Swipe up**: Abrir biblioteca
- **Swipe down**: Fechar painéis

## 🎨 Design System

### Espaçamentos
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

### Bordas
- **Radius normal**: 8px
- **Radius grande**: 12px
- **Border width**: 1-2px

### Sombras
- **Pequena**: `0 2px 4px rgba(0,0,0,0.1)`
- **Média**: `0 4px 6px rgba(0,0,0,0.1)`
- **Grande**: `0 10px 15px rgba(0,0,0,0.1)`
- **Glow cyan**: `0 0 20px rgba(6,182,212,0.5)`

### Tipografia
- **Família**: Inter, system-ui
- **Tamanhos**:
  - Pequeno: 12px
  - Normal: 14px
  - Médio: 16px
  - Grande: 18px
  - Título: 24px

---

**Este guia serve como referência visual para manutenção e extensão do design**
