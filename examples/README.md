# 📦 Exemplos de Projetos - SatelliteProg

Esta pasta contém exemplos de missões pré-configuradas para ajudar você a aprender a usar o SatelliteProg.

## 🚀 Projetos Disponíveis

### 1. Gerenciamento de Bateria
**Arquivo**: `example_mission_battery_management.json`

**Descrição**: Missão que verifica o nível de bateria e decide entre capturar imagens ou entrar em modo economia.

**Blocos utilizados**:
- 🔋 Verificar Bateria
- ❓ Condição (If/Else)
- 📷 Ativar Câmera
- 📤 Enviar Dados
- ⚡ Modo de Energia
- ⏱️ Aguardar

**Fluxo**:
```
[Bateria] → [Se carga > 50%]
                ├─ True → [Câmera] → [Transmitir]
                └─ False → [Modo Economia] → [Aguardar]
```

**Aprenda**:
- Como usar condicionais
- Gerenciamento de energia
- Múltiplas saídas de um bloco

---

### 2. Coleta de Dados Periódica
**Arquivo**: `example_mission_data_collection.json`

**Descrição**: Missão que coleta dados de múltiplos sensores periodicamente.

**Blocos utilizados**:
- 🔁 Loop (5 repetições)
- 📷 Ativar Câmera
- 🌡️ Ler Temperatura
- 🛰️ Ler GPS
- 📤 Enviar Dados
- ⏱️ Aguardar (5 minutos)

**Fluxo**:
```
[Loop 5x] → [Câmera]
         └→ [Temperatura]
                ↓
            [GPS] → [Transmitir] → [Aguardar 5min]
```

**Aprenda**:
- Como usar loops
- Coletar dados de múltiplos sensores
- Temporização entre coletas

---

## 📖 Como Usar os Exemplos

### Método 1: Carregar no SatelliteProg

1. Abra o SatelliteProg em http://localhost:3000
2. Clique em **"Abrir"** na barra superior
3. Selecione um dos arquivos `.json` desta pasta
4. O projeto será carregado automaticamente!

### Método 2: Estudar o JSON

Abra qualquer arquivo `.json` em um editor de texto para ver a estrutura:

```json
{
  "nodes": [
    {
      "id": "node_...",
      "type": "customNode",
      "position": { "x": 100, "y": 100 },
      "data": {
        "label": "Nome do Bloco",
        "icon": "📷",
        "properties": { ... }
      }
    }
  ],
  "edges": [
    {
      "source": "node_1",
      "target": "node_2"
    }
  ]
}
```

## 🎓 Exemplos por Nível

### Iniciante
- ✅ `example_mission_battery_management.json` - Conceitos básicos

### Intermediário
- ✅ `example_mission_data_collection.json` - Loops e múltiplos sensores

### Avançado (Em breve)
- 🔜 Missão de emergência autônoma
- 🔜 Controle de órbita completo
- 🔜 Sequência de fotos panorâmicas

## 🛠️ Criar Seus Próprios Exemplos

1. Crie sua missão no SatelliteProg
2. Clique em **"Salvar"**
3. O arquivo `.json` será baixado
4. Compartilhe com outros usuários!

## 📚 Estrutura dos Arquivos

Cada arquivo de exemplo contém:

```json
{
  "nodes": [],        // Array de blocos
  "edges": [],        // Array de conexões
  "version": "1.0",   // Versão do formato
  "timestamp": "..."  // Data de criação
}
```

### Anatomia de um Node

```json
{
  "id": "node_1729000001_abc123",  // ID único
  "type": "customNode",             // Tipo (sempre customNode)
  "position": {                     // Posição no canvas
    "x": 100,
    "y": 100
  },
  "data": {
    "label": "Ativar Câmera",      // Nome exibido
    "icon": "📷",                   // Emoji
    "color": "#10b981",             // Cor
    "blockType": "sensor",          // Tipo de bloco
    "blockId": "camera",            // ID do bloco
    "categoryKey": "sensors",       // Categoria
    "properties": {                 // Configurações
      "resolution": "1920x1080",
      "exposure": 100,
      "format": "JPEG"
    },
    "inputs": 1,                    // Nº de entradas
    "outputs": 1                    // Nº de saídas
  }
}
```

### Anatomia de um Edge (Conexão)

```json
{
  "id": "edge_1",                   // ID único
  "source": "node_abc123",          // Nó de origem
  "target": "node_def456",          // Nó de destino
  "sourceHandle": null,             // Handle específico (opcional)
  "animated": true,                 // Animação
  "style": {                        // Estilo da linha
    "stroke": "#06b6d4",
    "strokeWidth": 2
  }
}
```

## 🎯 Ideias de Missões

### Para Praticar

1. **Foto Simples**
   - Câmera → Transmitir

2. **Monitoramento Térmico**
   - Loop → Temperatura → Se > 50°C → Emergência

3. **Checagem Periódica**
   - Loop infinito → GPS → Bateria → Transmitir → Aguardar

4. **Modo Noturno**
   - Bateria → Se < 20% → Desligar sensores → Aguardar

5. **Sequência de Ações**
   - Abrir painéis → Aguardar → Orientar → Câmera → Transmitir

## 🔬 Experimentação

### Desafios

**Desafio 1**: Modifique `example_mission_battery_management.json`
- Adicione um terceiro caso: se bateria < 20%, transmita emergência

**Desafio 2**: Estenda `example_mission_data_collection.json`
- Adicione mais sensores (Magnetômetro)
- Aumente para 10 iterações
- Mude intervalo para 10 minutos

**Desafio 3**: Crie uma missão nova
- Use pelo menos 1 bloco de cada categoria
- Deve ter lógica condicional
- Deve ter loop
- Salve e compartilhe!

## 📝 Contribuir com Exemplos

Criou uma missão interessante? Compartilhe!

1. Salve seu projeto
2. Adicione descrição em comentário
3. Faça Pull Request para esta pasta
4. Sua missão ajudará outros usuários!

### Template para Novo Exemplo

```markdown
### X. Nome da Missão
**Arquivo**: `example_mission_nome.json`

**Descrição**: [Descrição do que a missão faz]

**Blocos utilizados**:
- [Lista de blocos]

**Fluxo**:
```
[Diagrama ASCII do fluxo]
```

**Aprenda**:
- [Conceito 1]
- [Conceito 2]
```

## 🐛 Problemas ao Carregar?

### Erro: "Arquivo inválido"
- Verifique se é um arquivo `.json`
- Confirme que não está corrompido
- Tente abrir em editor de texto

### Erro: "Formato não suportado"
- Pode ser de versão diferente
- Verifique campo `version`
- Atualize o SatelliteProg

### Blocos não aparecem
- Recarregue a página
- Limpe cache do navegador
- Verifique console (F12)

## 📊 Estatísticas

**Exemplos disponíveis**: 2  
**Blocos demonstrados**: 11  
**Conceitos cobertos**: 6  
**Nível de dificuldade**: Iniciante a Intermediário

## 🎓 Recursos Adicionais

- [QUICK_START.md](../QUICK_START.md) - Tutorial de uso
- [README.md](../README.md) - Documentação completa
- [FEATURES.md](../FEATURES.md) - Lista de blocos

---

**Divirta-se explorando os exemplos! 🚀**

Se tiver dúvidas, consulte a documentação principal ou abra uma issue.
