# 🎯 Guia Rápido - PION CanSat Programmer

## Interface Completa

```
┌─────────────────────────────────────────────────────────────────────┐
│  🛰️ CanSat Programmer - PION Educational Kit                        │
│                                                                       │
│  [🖥️ ESP32 ▼] [●] Conectado  [12 Blocos] [8 Conexões]             │
│                                                                       │
│  [🔌 Conectar] [⬆️ Upload] [📁 Abrir] [💾 Salvar] [🗑️ Limpar]      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📚 Biblioteca de Blocos

### 🎬 Inicial
```
┌──────────────────┐
│ 🚀 Iniciar       │  → Ponto de entrada da missão
│    Missão        │
└──────────────────┘
```

### 📡 Sensores
```
┌──────────────────┐
│ 🌡️ Ler           │  → BME280: Temperatura em °C
│    Temperatura   │     Armazena em variável
└──────────────────┘

┌──────────────────┐
│ 💧 Ler           │  → BME280: Umidade %
│    Umidade       │     
└──────────────────┘

┌──────────────────┐
│ 🌪️ Ler           │  → BME280: Pressão hPa
│    Pressão       │     
└──────────────────┘

┌──────────────────┐
│ 📍 Ler           │  → MPU6050: Aceleração X,Y,Z
│    Acelerômetro  │     
└──────────────────┘

┌──────────────────┐
│ 🔋 Ler           │  → ADC Pin 34: Tensão bateria
│    Bateria       │     
└──────────────────┘
```

### 💡 Atuadores
```
┌──────────────────┐
│ 💡 LED           │  → GPIO 25: Liga/desliga
│    Branco        │     Estado: ON/OFF
└──────────────────┘

┌──────────────────┐
│ 🎨 LED           │  → GPIO 26: NeoPixel RGB
│    RGB           │     Cor: R, G, B (0-255)
└──────────────────┘

┌──────────────────┐
│ 🔊 Buzzer        │  → GPIO 27: Som PWM
│                  │     Frequência (Hz)
└──────────────────┘
```

### 💾 Dados
```
┌──────────────────┐
│ 💾 Salvar        │  → Grava em SD card
│    no SD         │     Arquivo, dados
└──────────────────┘

┌──────────────────┐
│ 📡 Enviar        │  → Socket WiFi
│    por WiFi      │     SSID, senha, IP, porta
└──────────────────┘
```

### 🧠 Lógica
```
┌──────────────────┐
│ ⏱️ Esperar       │  → Delay em segundos
│                  │     
└──────────────────┘

┌──────────────────┐
│ ❓ Se/Então      │  → Condicional if
│                  │     var [==, !=, >, <] valor
└──────────────────┘
```

---

## 🔌 Conexão ESP32

### Passo a Passo:

1. **Conectar Hardware**
   ```
   ESP32 ───USB───> Computador
   ```

2. **Abrir Aplicação**
   ```
   Chrome/Edge → http://localhost:5173
   ```

3. **Selecionar Placa**
   ```
   [🖥️ ESP32 ▼]  ← Clicar aqui
   ```

4. **Conectar**
   ```
   [🔌 Conectar]  ← Clicar aqui
   ```

5. **Escolher Porta**
   ```
   ┌─────────────────────┐
   │ Selecione a porta:  │
   │ ○ COM3              │
   │ ● COM4 (USB Serial) │ ← Selecionar ESP32
   │ ○ COM5              │
   │                     │
   │  [Conectar] [Cancel]│
   └─────────────────────┘
   ```

6. **Verificar Status**
   ```
   [●] Conectado  ← Verde = OK
   ```

---

## 🎨 Criando uma Missão

### Exemplo: Termômetro com LED

```
Fluxo Visual:

┌──────────────┐
│ 🚀 Iniciar   │
│    Missão    │
└───────┬──────┘
        │
        ▼
┌──────────────┐
│ 🌡️ Ler       │  temp
│    Temperatura│
└───────┬──────┘
        │
        ▼
┌──────────────┐
│ ❓ Se/Então  │  temp > 25
│              │
└───┬───────┬──┘
    │ SIM   │ NÃO
    ▼       ▼
┌────────┐ ┌────────┐
│LED ON  │ │LED OFF │
└────────┘ └────────┘
```

### Código Gerado:

```python
from machine import Pin, I2C
import bme280

i2c = I2C(0, scl=Pin(22), sda=Pin(21))
bme = bme280.BME280(i2c=i2c)
led = Pin(25, Pin.OUT)

def main():
    temp = bme.temperature
    if temp > 25:
        led.value(1)
    else:
        led.value(0)

main()
```

---

## 💾 Salvando Projetos

### Formato XML:

```xml
<cansat_mission>
  <metadata>
    <timestamp>2024-01-15T10:30:00Z</timestamp>
    <board>ESP32</board>
  </metadata>
  
  <blocks>
    <block id="1" type="start_mission">
      <position x="100" y="100"/>
    </block>
    
    <block id="2" type="read_temperature">
      <position x="100" y="200"/>
      <properties>
        <property name="variable">temp</property>
      </properties>
    </block>
  </blocks>
  
  <connections>
    <connection from="1" to="2"/>
  </connections>
</cansat_mission>
```

### Comandos:
- **Salvar**: `[💾 Salvar]` → `cansat_mission_[timestamp].xml`
- **Abrir**: `[📁 Abrir]` → Selecionar arquivo `.xml`

---

## ⬆️ Upload para ESP32

### Processo:

1. **Criar Missão**
   ```
   Arrastar blocos → Conectar → Configurar
   ```

2. **Gerar Código**
   ```
   Clicar aba "Código" → Verificar MicroPython
   ```

3. **Upload**
   ```
   [⬆️ Upload] ← Clicar
   ```

4. **Progresso**
   ```
   Enviando código...  ⏳
   ↓
   Código carregado! ✅
   ```

5. **Execução**
   ```
   ESP32 executa automaticamente
   ```

---

## 🛠️ Configuração de Blocos

### Exemplo: LED RGB

```
1. Clicar no bloco LED RGB no canvas

2. Painel de Propriedades aparece:

┌───────────────────────────┐
│ Propriedades: LED RGB     │
├───────────────────────────┤
│ Vermelho (R): [255]       │
│ Verde (G):    [0]         │
│ Azul (B):     [0]         │
│                           │
│ [Aplicar]                 │
└───────────────────────────┘

3. Resultado: LED RGB vermelho
```

---

## 🧪 Missões de Exemplo

### 1. Pisca LED
```
Iniciar → LED ON → Esperar 1s → LED OFF → Esperar 1s
```

### 2. Termômetro Serial
```
Iniciar → Ler Temp → Salvar SD → Esperar 5s → (loop)
```

### 3. Alarme de Temperatura
```
Iniciar → Ler Temp → Se > 30 → Buzzer ON → LED RGB (vermelho)
                              ↓
                            Senão → LED RGB (verde)
```

### 4. Dados WiFi
```
Iniciar → Ler Temp → Ler Umidade → Enviar WiFi
```

---

## 🎓 Dicas Educacionais

### Para Professores:

1. **Começar Simples**
   - Missão 1: Apenas ligar LED
   - Missão 2: Piscar LED
   - Missão 3: Ler sensor

2. **Progressão**
   - Semana 1: Atuadores (LEDs, Buzzer)
   - Semana 2: Sensores (Temp, Umidade)
   - Semana 3: Lógica (If, loops)
   - Semana 4: Dados (SD, WiFi)

3. **Desafios**
   - Criar termômetro visual (LED muda cor por temperatura)
   - Sistema de alerta (buzzer + LED quando pressão baixa)
   - Estação meteorológica (WiFi + múltiplos sensores)

### Para Alunos:

1. **Testar cada bloco individualmente**
2. **Salvar projetos frequentemente**
3. **Verificar código gerado para aprender MicroPython**
4. **Documentar os experimentos**

---

## 📊 Hardware PION CanSat

### Pinagem Padrão:

```
ESP32 DEVKIT V1
┌─────────────────┐
│                 │
│  GPIO 21 ─────┐ │ → I2C SDA (BME280, MPU6050)
│  GPIO 22 ─────┤ │ → I2C SCL
│  GPIO 25 ─────┤ │ → LED Branco
│  GPIO 26 ─────┤ │ → NeoPixel RGB
│  GPIO 27 ─────┤ │ → Buzzer
│  GPIO 34 ─────┘ │ → ADC Bateria
│                 │
│  3V3  ──────────│ → Alimentação sensores
│  GND  ──────────│ → Terra
└─────────────────┘
```

### Sensores I2C:

```
BME280 (Endereço 0x76)
- Temperatura: -40°C a +85°C
- Umidade: 0% a 100%
- Pressão: 300 a 1100 hPa

MPU6050 (Endereço 0x68)
- Aceleração: ±2g a ±16g
- Giroscópio: ±250°/s a ±2000°/s
```

---

## ⚠️ Avisos Importantes

1. **Navegador**: Usar Chrome ou Edge 89+
2. **Conexão**: Apenas uma porta serial por vez
3. **Memória**: Código grande pode não caber no ESP32
4. **Alimentação**: Sensores requerem 3.3V (não 5V!)
5. **I2C**: Verificar endereços com scanner I2C

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Não conecta | Verificar cabo USB e driver |
| Upload falha | Apertar BOOT durante upload |
| Sensor não responde | Verificar conexões I2C |
| Código não executa | Verificar sintaxe Python |
| LED não acende | Verificar pin correto (25) |
| Buzzer sem som | Verificar frequência > 0 |

---

## 🎉 Pronto para Começar!

1. Conectar ESP32
2. Abrir Chrome
3. Acessar aplicação
4. Criar primeira missão
5. Upload e testar!

**Boa sorte com seu CanSat! 🚀**
