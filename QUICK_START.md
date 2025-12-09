# 🚀 Guia Rápido de Uso - SatelliteProg

## ✅ Status Atual

**Frontend**: ✅ Rodando em http://localhost:3000  
**Backend**: ⚠️ Requer instalação do Python (opcional para demonstração)

## 🎯 Primeiros Passos

### 1. Abra o navegador

Acesse: **http://localhost:3000**

### 2. Explore a Interface

A interface possui 3 painéis principais:

```
┌─────────────────────────────────────────────────────────┐
│  📋 TOOLBAR (Topo)                                      │
│  Salvar | Abrir | Limpar                                │
├──────────────┬──────────────────────┬───────────────────┤
│              │                      │                   │
│  📚 BLOCOS   │   🎨 ÁREA DE MISSÃO │  ⚙️ PROPRIEDADES │
│              │                      │                   │
│  Sensores    │   Arraste blocos     │  Configure cada   │
│  Atuadores   │   e conecte aqui     │  bloco aqui       │
│  Comunicação │                      │                   │
│  Lógica      │                      │                   │
│  Autônomos   │                      │                   │
│  Energia     │                      │                   │
│              │                      │                   │
└──────────────┴──────────────────────┴───────────────────┘
```

## 📝 Tutorial: Sua Primeira Missão

### Missão: Capturar Foto e Transmitir

**Passo 1:** Arraste o bloco "Ativar Câmera" 📷
- Localize na categoria **Sensores**
- Arraste para o centro da tela

**Passo 2:** Configure a câmera
- Clique no bloco que acabou de adicionar
- No painel direito, ajuste:
  - Resolução: `1920x1080`
  - Exposição: `100 ms`
  - Formato: `JPEG`

**Passo 3:** Adicione um bloco de transmissão
- Arraste "Enviar Dados" 📤 da categoria **Comunicação**
- Posicione à direita da câmera

**Passo 4:** Conecte os blocos
- Clique na bolinha **direita** (saída) da câmera
- Arraste até a bolinha **esquerda** (entrada) do transmissor
- Uma linha azul animada aparecerá

**Passo 5:** Gere o código
- Clique em **"Gerar Código Python"** (botão azul inferior direito)
- Veja o código MicroPython gerado!

**Passo 6:** Salve seu projeto
- Clique em **"Salvar"** na barra superior
- Um arquivo `.json` será baixado

## 🎨 Tipos de Blocos

### 📡 Sensores (Verde)
- **Câmera** 📷: Captura imagens
- **Temperatura** 🌡️: Mede temperatura
- **GPS** 🛰️: Obtém posição
- **Magnetômetro** 🧲: Campo magnético

### ⚙️ Atuadores (Laranja)
- **Propulsor** 🚀: Move o satélite
- **Painel Solar** ☀️: Abre painéis
- **LED** 💡: Indicador visual

### 📶 Comunicação (Azul)
- **Transmitir** 📤: Envia dados
- **Receber** 📥: Aguarda comandos

### 🔀 Lógica (Roxo)
- **Se/Então** ❓: Condições
- **Aguardar** ⏱️: Delays
- **Loop** 🔁: Repetições

### 🤖 Autônomos (Rosa)
- **Manter Órbita** 🌍
- **Coletar Dados** 📊
- **Emergência** 🚨

### 🔋 Energia (Amarelo)
- **Verificar Bateria** 🔋
- **Modo Energia** ⚡

## 💡 Dicas

### Conectando Blocos
- ✅ **Certo**: Saída (direita) → Entrada (esquerda)
- ❌ **Errado**: Entrada → Entrada ou Saída → Saída

### Blocos com Múltiplas Saídas
Alguns blocos (como **Se/Então**) têm 2 saídas:
- Saída 1 (topo direito): Condição verdadeira
- Saída 2 (meio direito): Condição falsa

### Organizando a Missão
- Organize da **esquerda para direita**
- Agrupe blocos relacionados
- Use o **MiniMap** (canto inferior direito) para navegar

### Salvando e Carregando
- **Salvar**: Exporta tudo (blocos, conexões, configurações)
- **Abrir**: Carrega um projeto salvo
- **Limpar**: Remove tudo (cuidado!)

## 🎯 Exemplos de Missões

### Exemplo 1: Monitoramento Térmico
```
[Temperatura] → [Se > 50°C] → [Transmitir Emergência]
                     ↓ (senão)
                [LED Verde]
```

### Exemplo 2: Órbita Autônoma
```
[Verificar Bateria] → [GPS] → [Manter Órbita] → [Aguardar 60s] → [Loop]
```

### Exemplo 3: Coleta de Dados Periódica
```
[Loop 10x] → [Câmera] → [Temperatura] → [GPS] → [Transmitir] → [Aguardar 5min]
```

## 🐛 Resolução de Problemas

### Não consigo conectar blocos
- Certifique-se de arrastar da **saída** (direita) para a **entrada** (esquerda)
- Verifique se ambos os blocos têm entradas/saídas disponíveis

### Bloco não aparece propriedades
- Clique diretamente no bloco
- Aguarde alguns segundos
- Se persistir, recarregue a página

### Código não é gerado
- Certifique-se de ter pelo menos 1 bloco na área
- Clique novamente no botão "Gerar Código"

### Simulação dá erro
- **Normal!** A simulação requer o backend Python rodando
- Sem o backend, você ainda pode:
  - Gerar código ✅
  - Visualizar código ✅
  - Copiar/Baixar código ✅
  - Salvar projeto ✅

## 📦 Carregar Projeto Exemplo

1. Clique em **"Abrir"** na barra superior
2. Navegue até: `examples/example_mission_battery_management.json`
3. Veja uma missão completa de gerenciamento de bateria!

## ⌨️ Atalhos de Teclado

- **Del**: Deletar bloco selecionado
- **Ctrl + S**: Salvar projeto (em breve)
- **Ctrl + Z**: Desfazer (React Flow nativo)
- **Mouse Wheel**: Zoom in/out
- **Click + Drag (fundo)**: Mover canvas

## 🎓 Próximos Passos

1. ✅ Crie sua primeira missão simples
2. ✅ Experimente diferentes blocos
3. ✅ Combine blocos de lógica com sensores
4. ✅ Salve e compartilhe suas missões
5. 📚 Leia `PYTHON_SETUP.md` para executar código de verdade
6. 🚀 Crie missões complexas com loops e condições

## 📞 Ajuda

- **Documentação Completa**: Veja `README.md`
- **Setup Python**: Veja `PYTHON_SETUP.md`
- **Exemplos**: Pasta `examples/`

---

**Divirta-se programando seu nanossatélite! 🛰️✨**
