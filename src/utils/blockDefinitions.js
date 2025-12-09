// Definição dos blocos PION CanSat - MVP baseado no hardware real
export const blockCategories = {
    initial: {
        name: 'Início',
        color: '#6366f1',
        icon: '�',
        blocks: [
            {
                id: 'start_mission',
                type: 'initial',
                label: 'Iniciar Missão',
                icon: '�',
                color: '#6366f1',
                inputs: 0,
                outputs: 1,
                properties: {},
                code: () => `# Iniciar Missão PION CanSat
from machine import Pin, I2C, ADC, SPI
from time import sleep
import os

# Inicializar hardware do ESP32
print("=== Missão Iniciada ===")
`
            }
        ]
    },
    sensors: {
        name: 'Sensores',
        color: '#10b981',
        icon: '📡',
        blocks: [
            {
                id: 'read_temperature',
                type: 'sensor',
                label: 'Ler Temperatura',
                icon: '🌡️',
                color: '#10b981',
                inputs: 1,
                outputs: 1,
                properties: {
                    unit: { type: 'select', label: 'Unidade', options: ['Celsius', 'Fahrenheit'], default: 'Celsius' }
                },
                code: (props) => `
# Ler Temperatura (BME280)
temperature = bme280.temperature
${props.unit === 'Fahrenheit' ? 'temperature = temperature * 9/5 + 32' : ''}
print(f"Temperatura: {temperature}°${props.unit[0]}")
`
            },
            {
                id: 'read_humidity',
                type: 'sensor',
                label: 'Ler Umidade',
                icon: '💧',
                color: '#10b981',
                inputs: 1,
                outputs: 1,
                properties: {},
                code: () => `
# Ler Umidade Relativa (BME280)
humidity = bme280.humidity
print(f"Umidade: {humidity}%")
`
            },
            {
                id: 'read_pressure',
                type: 'sensor',
                label: 'Ler Pressão',
                icon: '🌪️',
                color: '#10b981',
                inputs: 1,
                outputs: 1,
                properties: {},
                code: () => `
# Ler Pressão Atmosférica (BME280)
pressure = bme280.pressure
print(f"Pressão: {pressure} hPa")
`
            },
            {
                id: 'read_accelerometer',
                type: 'sensor',
                label: 'Ler Acelerômetro',
                icon: '📊',
                color: '#10b981',
                inputs: 1,
                outputs: 1,
                properties: {
                    range: { type: 'select', label: 'Faixa de Medição', options: ['±2g', '±4g', '±8g', '±16g'], default: '±2g' }
                },
                code: (props) => `
# Ler Acelerômetro (MPU6050)
accel_range = "${props.range}"
accel_x, accel_y, accel_z = mpu6050.acceleration
print(f"Aceleração X: {accel_x}, Y: {accel_y}, Z: {accel_z}")
`
            },
            {
                id: 'read_battery',
                type: 'sensor',
                label: 'Ler Nível da Bateria',
                icon: '�',
                color: '#10b981',
                inputs: 1,
                outputs: 1,
                properties: {},
                code: () => `
# Ler Nível da Bateria
battery_adc = ADC(Pin(34))
battery_voltage = battery_adc.read() * 3.3 / 4095
battery_percent = min(100, max(0, (battery_voltage - 3.0) / 1.2 * 100))
print(f"Bateria: {battery_percent:.1f}%")
`
            }
        ]
    },
    actuators: {
        name: 'Atuadores',
        color: '#f59e0b',
        icon: '⚙️',
        blocks: [
            {
                id: 'white_led',
                type: 'actuator',
                label: 'LED Branco',
                icon: '�',
                color: '#f59e0b',
                inputs: 1,
                outputs: 1,
                properties: {
                    state: { type: 'select', label: 'Estado', options: ['Ligar', 'Desligar'], default: 'Ligar' }
                },
                code: (props) => `
# LED Branco (Placa de Interface)
white_led = Pin(25, Pin.OUT)
white_led.value(${props.state === 'Ligar' ? '1' : '0'})
print(f"LED Branco: ${props.state}")
`
            },
            {
                id: 'rgb_led',
                type: 'actuator',
                label: 'LED RGB',
                icon: '🌈',
                color: '#f59e0b',
                inputs: 1,
                outputs: 1,
                properties: {
                    red: { type: 'number', label: 'Vermelho (0-255)', min: 0, max: 255, default: 255 },
                    green: { type: 'number', label: 'Verde (0-255)', min: 0, max: 255, default: 0 },
                    blue: { type: 'number', label: 'Azul (0-255)', min: 0, max: 255, default: 0 }
                },
                code: (props) => `
# LED RGB (Placa de Interface)
from neopixel import NeoPixel
rgb_led = NeoPixel(Pin(26), 1)
rgb_led[0] = (${props.red}, ${props.green}, ${props.blue})
rgb_led.write()
print(f"LED RGB: R={props.red}, G={props.green}, B={props.blue}")
`
            },
            {
                id: 'buzzer',
                type: 'actuator',
                label: 'Emitir Som (Buzzer)',
                icon: '�',
                color: '#f59e0b',
                inputs: 1,
                outputs: 1,
                properties: {
                    frequency: { type: 'number', label: 'Frequência (Hz)', min: 100, max: 5000, default: 1000 },
                    duration: { type: 'number', label: 'Duração (ms)', min: 10, max: 5000, default: 500 }
                },
                code: (props) => `
# Buzzer (Placa de Interface)
from machine import PWM
buzzer = PWM(Pin(27))
buzzer.freq(${props.frequency})
buzzer.duty(512)
sleep(${props.duration / 1000})
buzzer.duty(0)
print(f"Som emitido: ${props.frequency}Hz por ${props.duration}ms")
`
            }
        ]
    },
    data_communication: {
        name: 'Dados e Comunicação',
        color: '#06b6d4',
        icon: '�',
        blocks: [
            {
                id: 'save_sd',
                type: 'data',
                label: 'Gravar no Cartão SD',
                icon: '�',
                color: '#06b6d4',
                inputs: 1,
                outputs: 1,
                properties: {
                    filename: { type: 'text', label: 'Nome do Arquivo', default: 'data.txt' },
                    mode: { type: 'select', label: 'Modo', options: ['Sobrescrever', 'Adicionar'], default: 'Adicionar' }
                },
                code: (props) => `
# Gravar no Cartão SD
mode = "${props.mode === 'Adicionar' ? 'a' : 'w'}"
with open("/sd/${props.filename}", mode) as f:
    f.write(f"{temperature},{humidity},{pressure}\\n")
print(f"Dados gravados em ${props.filename}")
`
            },
            {
                id: 'send_wifi',
                type: 'data',
                label: 'Enviar Dados via WiFi',
                icon: '�',
                color: '#06b6d4',
                inputs: 1,
                outputs: 1,
                properties: {
                    ssid: { type: 'text', label: 'SSID', default: 'CanSat' },
                    server: { type: 'text', label: 'Servidor', default: '192.168.1.100' },
                    port: { type: 'number', label: 'Porta', min: 1, max: 65535, default: 8080 }
                },
                code: (props) => `
# Enviar Dados via WiFi
import network
import socket
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("${props.ssid}", "password")
while not wlan.isconnected():
    pass
sock = socket.socket()
sock.connect(("${props.server}", ${props.port}))
sock.send(f"temp:{temperature},hum:{humidity}\\n".encode())
sock.close()
print("Dados enviados via WiFi")
`
            }
        ]
    },
    logic: {
        name: 'Lógica',
        color: '#8b5cf6',
        icon: '🔀',
        blocks: [
            // ===== CONTROLE DE FLUXO =====
            {
                id: 'wait',
                type: 'logic',
                label: 'Aguardar',
                icon: '⏱️',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    time: { type: 'number', label: 'Tempo (s)', min: 0.1, max: 3600, default: 1 }
                },
                code: (props) => `
# Aguardar ${props.time} segundos
sleep(${props.time})
`
            },
            {
                id: 'loop_infinite',
                type: 'logic',
                label: 'Loop Infinito',
                icon: '🔄',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                isContainer: true,
                properties: {
                    interval: { type: 'number', label: 'Intervalo (s)', min: 0, max: 3600, default: 1 }
                },
                code: (props) => `
# Loop Infinito - Intervalo: ${props.interval}s
while True:
    # INÍCIO DO LOOP
    {LOOP_CONTENT}
    # Aguardar intervalo
    sleep(${props.interval})
    # FIM DO LOOP
`
            },
            {
                id: 'loop_count',
                type: 'logic',
                label: 'Repetir N vezes',
                icon: '🔢',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                isContainer: true,
                properties: {
                    count: { type: 'number', label: 'Repetições', min: 1, max: 1000, default: 10 }
                },
                code: (props) => `
# Repetir ${props.count} vezes
for loop_i in range(${props.count}):
    # INÍCIO DA REPETIÇÃO (${props.count}x)
    {LOOP_CONTENT}
    # FIM DA REPETIÇÃO
`
            },
            {
                id: 'loop_while',
                type: 'logic',
                label: 'Enquanto (While)',
                icon: '🔁',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                isContainer: true,
                properties: {
                    variable: { type: 'text', label: 'Variável', default: 'temperature' },
                    operator: { type: 'select', label: 'Operador', options: ['>', '<', '==', '!=', '>=', '<='], default: '<' },
                    value: { type: 'number', label: 'Valor', min: -1000, max: 1000, default: 50 }
                },
                code: (props) => `
# Enquanto ${props.variable} ${props.operator} ${props.value}
while ${props.variable} ${props.operator} ${props.value}:
    # INÍCIO DO WHILE
    {LOOP_CONTENT}
    # FIM DO WHILE
`
            },

            // ===== CONDICIONAIS =====
            {
                id: 'if_condition',
                type: 'logic',
                label: 'Se/Então (If)',
                icon: '❓',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 2,
                properties: {
                    variable: { type: 'text', label: 'Variável', default: 'temperature' },
                    operator: { type: 'select', label: 'Operador', options: ['>', '<', '==', '!=', '>=', '<='], default: '>' },
                    value: { type: 'number', label: 'Valor', min: -1000, max: 1000, default: 30 }
                },
                code: (props) => `
# Se ${props.variable} ${props.operator} ${props.value}
if ${props.variable} ${props.operator} ${props.value}:
    # Condição VERDADEIRA
    {TRUE_BRANCH}
else:
    # Condição FALSA
    {FALSE_BRANCH}
`
            },
            {
                id: 'if_compare',
                type: 'logic',
                label: 'Se (Comparar)',
                icon: '⚖️',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 2,
                properties: {
                    variable1: { type: 'text', label: 'Variável 1', default: 'temp_atual' },
                    operator: { type: 'select', label: 'Operador', options: ['>', '<', '==', '!=', '>=', '<='], default: '>' },
                    variable2: { type: 'text', label: 'Variável 2', default: 'temp_anterior' }
                },
                code: (props) => `
# Se ${props.variable1} ${props.operator} ${props.variable2}
if ${props.variable1} ${props.operator} ${props.variable2}:
    # Condição VERDADEIRA
    {TRUE_BRANCH}
else:
    # Condição FALSA
    {FALSE_BRANCH}
`
            },

            // ===== VARIÁVEIS =====
            {
                id: 'set_variable',
                type: 'logic',
                label: 'Criar Variável',
                icon: '📝',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    name: { type: 'text', label: 'Nome', default: 'minha_variavel' },
                    value: { type: 'text', label: 'Valor', default: '0' }
                },
                code: (props) => `
# Criar/Atribuir Variável
${props.name} = ${props.value}
print(f"${props.name} = {${props.name}}")
`
            },
            {
                id: 'assign_from_sensor',
                type: 'logic',
                label: 'Armazenar em Variável',
                icon: '💾',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    variable: { type: 'text', label: 'Variável', default: 'valor_lido' },
                    source: { type: 'text', label: 'Origem', default: 'temperature' }
                },
                code: (props) => `
# Armazenar ${props.source} em ${props.variable}
${props.variable} = ${props.source}
`
            },

            // ===== OPERAÇÕES MATEMÁTICAS =====
            {
                id: 'math_operation',
                type: 'logic',
                label: 'Operação Matemática',
                icon: '➕',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    result: { type: 'text', label: 'Resultado', default: 'resultado' },
                    operand1: { type: 'text', label: 'Valor 1', default: '10' },
                    operator: { type: 'select', label: 'Operador', options: ['+', '-', '*', '/', '//', '%', '**'], default: '+' },
                    operand2: { type: 'text', label: 'Valor 2', default: '5' }
                },
                code: (props) => `
# Operação: ${props.result} = ${props.operand1} ${props.operator} ${props.operand2}
${props.result} = ${props.operand1} ${props.operator} ${props.operand2}
print(f"${props.result} = {${props.result}}")
`
            },
            {
                id: 'math_average',
                type: 'logic',
                label: 'Calcular Média',
                icon: '📊',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    result: { type: 'text', label: 'Resultado', default: 'media' },
                    values: { type: 'text', label: 'Valores (separados por vírgula)', default: 'val1, val2, val3' }
                },
                code: (props) => `
# Calcular Média
${props.result} = (${props.values}) / ${props.values.split(',').length}
print(f"Média = {${props.result}}")
`
            },
            {
                id: 'math_increment',
                type: 'logic',
                label: 'Incrementar/Decrementar',
                icon: '🔼',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    variable: { type: 'text', label: 'Variável', default: 'contador' },
                    operation: { type: 'select', label: 'Operação', options: ['++', '--', '+= valor', '-= valor'], default: '++' },
                    value: { type: 'number', label: 'Valor', min: -1000, max: 1000, default: 1 }
                },
                code: (props) => {
                    if (props.operation === '++') return `${props.variable} += 1  # Incrementar\n`;
                    if (props.operation === '--') return `${props.variable} -= 1  # Decrementar\n`;
                    if (props.operation === '+= valor') return `${props.variable} += ${props.value}  # Adicionar\n`;
                    if (props.operation === '-= valor') return `${props.variable} -= ${props.value}  # Subtrair\n`;
                    return '';
                }
            },

            // ===== FUNÇÕES ESPECIAIS =====
            {
                id: 'print_message',
                type: 'logic',
                label: 'Imprimir Mensagem',
                icon: '📢',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    message: { type: 'text', label: 'Mensagem', default: 'Hello CanSat!' }
                },
                code: (props) => `
# Imprimir Mensagem
print("${props.message}")
`
            },
            {
                id: 'print_variable',
                type: 'logic',
                label: 'Imprimir Variável',
                icon: '🖨️',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    variable: { type: 'text', label: 'Variável', default: 'temperatura' },
                    label: { type: 'text', label: 'Rótulo', default: 'Temperatura' }
                },
                code: (props) => `
# Imprimir: ${props.label}
print(f"${props.label}: {${props.variable}}")
`
            },
            {
                id: 'comment',
                type: 'logic',
                label: 'Comentário',
                icon: '💬',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 1,
                properties: {
                    text: { type: 'text', label: 'Comentário', default: 'Nota importante aqui' }
                },
                code: (props) => `
# ${props.text}
`
            },
            {
                id: 'break_loop',
                type: 'logic',
                label: 'Sair do Loop',
                icon: '🚪',
                color: '#8b5cf6',
                inputs: 1,
                outputs: 0,
                properties: {},
                code: () => `
# Sair do Loop
break
`
            }
        ]
    }
};

// Gera um ID único para os nós
export const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Converte propriedades em valores padrão
export const getDefaultProperties = (block) => {
    const defaults = {};
    if (block.properties) {
        Object.entries(block.properties).forEach(([key, prop]) => {
            defaults[key] = prop.default;
        });
    }
    return defaults;
};
