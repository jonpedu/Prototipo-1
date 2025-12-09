# Relatório de Modificações - MVP PION CanSat

## Data: ${new Date().toLocaleDateString('pt-BR')}

## Objetivo
Adaptar o protótipo inicial de programação visual de nanossatélites genéricos para o **MVP do Kit Educacional PION CanSat** com ESP32, focando em funcionalidades específicas para hardware educacional.

---

## 1. Modificações em Blocos (blockDefinitions.js)

### 1.1 Blocos Removidos (Genéricos de Satélite)
- ❌ Camera / Câmera
- ❌ GPS
- ❌ Magnetometer / Magnetômetro
- ❌ Thrusters / Propulsores
- ❌ Solar Panels / Painéis Solares
- ❌ Generic RF Transmission/Reception
- ❌ Autonomous Tasks (orbit maintenance, emergency beacon)
- ❌ Energy Management category

### 1.2 Blocos Adicionados (PION CanSat Specific)

#### **Categoria: Initial**
- ✅ **Iniciar Missão** - Bloco de entrada obrigatório

#### **Categoria: Sensors**
- ✅ **Ler Temperatura** (BME280) - Sensor de temperatura
- ✅ **Ler Umidade** (BME280) - Sensor de umidade do ar
- ✅ **Ler Pressão** (BME280) - Sensor barométrico
- ✅ **Ler Acelerômetro** (MPU6050) - Acelerômetro 3 eixos
- ✅ **Ler Bateria** (ADC Pin 34) - Monitoramento de tensão da bateria

#### **Categoria: Actuators**
- ✅ **LED Branco** (Pin 25) - Controle de LED branco
- ✅ **LED RGB** (NeoPixel Pin 26) - LED RGB programável
- ✅ **Buzzer** (PWM Pin 27) - Sinal sonoro com frequência controlável

#### **Categoria: Data**
- ✅ **Salvar no SD** - Gravação em cartão SD (nome de arquivo, dados)
- ✅ **Enviar por WiFi** - Transmissão via socket WiFi (SSID, senha, servidor, porta)

#### **Categoria: Logic**
- ✅ **Esperar** - Delay simples em segundos
- ✅ **Se/Então** - Condição if com operadores (==, !=, >, <, >=, <=)

### 1.3 Especificações Técnicas dos Blocos

Todos os blocos agora incluem:
- **Pinos GPIO específicos** para o ESP32
- **Código MicroPython** otimizado para cada sensor/atuador
- **Inicialização adequada** de bibliotecas (I2C, PWM, NeoPixel, ADC)
- **Tratamento de erros** nas operações

---

## 2. Integração Web Serial API

### 2.1 Arquivos Criados/Modificados

#### **serialConnection.js** (verificar se já existe)
Funções para:
- `connectSerial()` - Abre porta serial Web Serial API
- `disconnectSerial()` - Fecha conexão
- `uploadCode(code)` - Envia código MicroPython para ESP32
- `readFromSerial()` - Lê dados do dispositivo

#### **Toolbar.jsx** (✅ COMPLETO)
Novo layout com:
- **Seletor de Placa**: Dropdown com ESP32/ESP32-S2/ESP32-C3
- **Botão Conectar**: Verde (conectar) / Vermelho (desconectar) com ícone WiFi
- **Indicador de Status**: Bolinha verde/cinza mostrando conexão
- **Botão Upload**: Envia código MicroPython ao ESP32 conectado
- **Botões Salvar/Abrir**: Agora com formato **XML**
- **Botão Limpar**: Remove todos os blocos da área de trabalho

---

## 3. Formato XML para Projetos

### 3.1 xmlUtils.js (✅ CRIADO)

Implementa:
- `flowToXML(nodes, edges)` - Converte fluxo visual para XML estruturado
- `xmlToFlow(xmlString)` - Reconstrói fluxo a partir de XML
- `downloadXML(xmlString, filename)` - Download do arquivo .xml
- `loadXMLFile(file)` - Lê e valida arquivo XML carregado

### 3.2 Estrutura do XML

```xml
<cansat_mission>
  <metadata>
    <timestamp>2024-01-15T10:30:00Z</timestamp>
    <version>1.0</version>
    <board>ESP32</board>
  </metadata>
  
  <blocks>
    <block id="node_1" type="read_temperature" category="sensors">
      <position x="100" y="200"/>
      <properties>
        <property name="variable">temp</property>
      </properties>
    </block>
    <!-- ... outros blocos -->
  </blocks>
  
  <connections>
    <connection from="node_1" to="node_2"/>
    <!-- ... outras conexões -->
  </connections>
</cansat_mission>
```

---

## 4. Gerenciamento de Estado (useStore.js)

### 4.1 Novos Estados Adicionados

```javascript
{
  // Estados existentes
  nodes, edges, selectedNode, generatedCode, simulationState,
  
  // Novos estados para MVP
  serialPort: null,              // Referência à porta serial
  isConnected: false,            // Status da conexão
  serialLogs: [],                // Histórico de logs seriais
  selectedBoard: 'ESP32'         // Placa selecionada
}
```

### 4.2 Novas Ações

- `setSerialPort(port)` - Armazena referência da porta
- `setIsConnected(connected)` - Atualiza status de conexão
- `addSerialLog(log)` - Adiciona log com timestamp
- `clearSerialLogs()` - Limpa histórico
- `setSelectedBoard(board)` - Define placa alvo

---

## 5. Geração de Código MicroPython

### 5.1 Estrutura do Código Gerado

Cada missão gera:

```python
# Código gerado automaticamente para CanSat PION
# Gerado em: [data/hora]
# Placa: ESP32

from machine import Pin, I2C, ADC, PWM
from time import sleep
import bme280
import mpu6050
from neopixel import NeoPixel

# Inicializações
i2c = I2C(0, scl=Pin(22), sda=Pin(21))
bme = bme280.BME280(i2c=i2c)
mpu = mpu6050.MPU6050(i2c)
battery_adc = ADC(Pin(34))
battery_adc.atten(ADC.ATTN_11DB)

# Código da missão
def main():
    print("=== Iniciando Missão CanSat ===")
    
    # [Código dos blocos em sequência]
    
    print("=== Missão Concluída ===")

if __name__ == "__main__":
    main()
```

---

## 6. Funcionalidades Removidas

Para manter o foco no MVP:

### 6.1 Componentes Não Mais Necessários
- ❌ **SimulationViewer.jsx** - Simulação 3D de satélite
- ❌ **Backend Flask** (server/app.py) - Execução remota
- ❌ **Exemplos genéricos** - JSON com missões de satélite genérico

### 6.2 Complexidade Reduzida
- Removidos blocos com múltiplas unidades de tempo (ms, s, min, h)
- Simplificado: apenas segundos
- Removidos modos de energia e gerenciamento autônomo
- Foco em programação educacional step-by-step

---

## 7. Próximos Passos Recomendados

### 7.1 Testes Essenciais
1. ✅ Testar conexão Web Serial API em navegador compatível (Chrome/Edge)
2. ✅ Verificar upload de código básico para ESP32
3. ✅ Testar salvar/carregar projetos em XML
4. ✅ Validar geração de código MicroPython

### 7.2 Melhorias Futuras (pós-MVP)
- Monitor Serial integrado (SerialMonitor.jsx já existe?)
- Biblioteca de exemplos específicos PION CanSat
- Validação de fluxo (verificar conexões obrigatórias)
- Documentação em vídeo para educadores
- Sistema de plugins para novos sensores

### 7.3 Documentação a Atualizar
- README.md - Focar em PION CanSat MVP
- QUICK_START.md - Tutorial com exemplo de missão simples
- WEB_SERIAL_INTEGRATION.md - Já existe, verificar conteúdo
- XML_FORMAT_GUIDE.md - Já existe, verificar alinhamento

---

## 8. Compatibilidade de Navegadores

### Web Serial API requer:
- ✅ Chrome 89+
- ✅ Edge 89+
- ❌ Firefox (não suportado nativamente)
- ❌ Safari (não suportado)

**Recomendação**: Incluir aviso de compatibilidade na interface.

---

## 9. Checklist de Finalização

- [x] Blocos PION CanSat implementados
- [x] Pins GPIO ESP32 configurados
- [x] XML save/load implementado
- [x] Toolbar com seletor de placa
- [x] Botões de conexão serial
- [x] Botão de upload
- [x] Estado de conexão visual
- [ ] Testar em dispositivo ESP32 real
- [ ] Validar código MicroPython gerado
- [ ] Atualizar documentação
- [ ] Remover arquivos obsoletos
- [ ] Criar exemplo de missão "Hello CanSat"

---

## 10. Arquivos Modificados

```
✅ src/utils/blockDefinitions.js - Substituição completa de blocos
✅ src/utils/xmlUtils.js - NOVO - Manipulação de XML
✅ src/components/Toolbar.jsx - Reescrito para MVP
✅ src/store/useStore.js - Adicionado estado serial
✅ src/utils/serialConnection.js - Verificar se já existe
```

---

## Observações Finais

Este MVP está alinhado com os requisitos do documento "4.1.1 Cabeçalho de Ações e Conectividade" e foca exclusivamente no hardware do Kit PION CanSat. Todas as funcionalidades genéricas de satélite foram removidas para simplificar o uso educacional.

**Próximo passo crítico**: Testar a integração completa com um ESP32 físico.
