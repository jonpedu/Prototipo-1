# 🧠 Guia Completo - Blocos de Lógica

## Atualização: 17 de outubro de 2025

---

## 📋 Índice

1. [Controle de Fluxo](#controle-de-fluxo)
2. [Condicionais](#condicionais)
3. [Variáveis](#variáveis)
4. [Operações Matemáticas](#operações-matemáticas)
5. [Funções Especiais](#funções-especiais)
6. [Exemplos Práticos](#exemplos-práticos)

---

## 🔄 Controle de Fluxo

### 1. ⏱️ **Aguardar**
**Função**: Pausa a execução por um tempo determinado

**Propriedades**:
- Tempo (s): 0.1 a 3600 segundos

**Uso Comum**:
```
Ler Sensor → Aguardar 5s → Ler Sensor novamente
```

**Código Gerado**:
```python
sleep(5)
```

---

### 2. 🔄 **Loop Infinito**
**Função**: Repete o código interno indefinidamente (container)

**Propriedades**:
- Intervalo (s): Tempo entre repetições

**Uso Comum**:
- Estações meteorológicas
- Monitoramento contínuo
- Missões de longa duração

**Exemplo Visual**:
```
Loop Infinito (10s)
├─ Ler Temperatura
├─ Ler Umidade
├─ Salvar SD
└─ [Aguarda 10s automaticamente]
```

**Código Gerado**:
```python
while True:
    temperature = bme280.temperature
    humidity = bme280.humidity
    save_to_sd(temperature, humidity)
    sleep(10)
```

---

### 3. 🔢 **Repetir N vezes**
**Função**: Repete o código interno N vezes (container)

**Propriedades**:
- Repetições: 1 a 1000

**Uso Comum**:
- LED piscante (10 vezes)
- Coletar N amostras
- Calibração de sensores

**Exemplo Visual**:
```
Repetir 10 vezes
├─ LED Branco ON
├─ Aguardar 0.5s
├─ LED Branco OFF
└─ Aguardar 0.5s
```

**Código Gerado**:
```python
for loop_i in range(10):
    led.value(1)
    sleep(0.5)
    led.value(0)
    sleep(0.5)
```

---

### 4. 🔁 **Enquanto (While)**
**Função**: Repete enquanto condição for verdadeira (container)

**Propriedades**:
- Variável: Nome da variável
- Operador: >, <, ==, !=, >=, <=
- Valor: Valor de comparação

**Uso Comum**:
- Aguardar sensor estabilizar
- Processar até condição ser atingida
- Loops condicionais

**Exemplo Visual**:
```
Enquanto (temperatura < 50)
├─ Ler Temperatura
├─ LED Amarelo ON
└─ Aguardar 1s
```

**Código Gerado**:
```python
while temperature < 50:
    temperature = bme280.temperature
    led_yellow.value(1)
    sleep(1)
```

---

### 5. 🚪 **Sair do Loop**
**Função**: Interrompe o loop atual (break)

**Uso Comum**:
- Sair de loop quando condição específica é atingida
- Emergências

**Código Gerado**:
```python
break
```

---

## ❓ Condicionais

### 6. ❓ **Se/Então (If)**
**Função**: Executa código diferente baseado em condição

**Propriedades**:
- Variável: Nome da variável
- Operador: >, <, ==, !=, >=, <=
- Valor: Valor de comparação

**Saídas**: 2 (True/False)

**Exemplo Visual**:
```
        Se (temp > 30)
         /          \
    (True)        (False)
    LED Red      LED Green
```

**Código Gerado**:
```python
if temperature > 30:
    led_rgb.fill((255, 0, 0))
else:
    led_rgb.fill((0, 255, 0))
```

---

### 7. ⚖️ **Se (Comparar)**
**Função**: Compara duas variáveis

**Propriedades**:
- Variável 1: Primeira variável
- Operador: >, <, ==, !=, >=, <=
- Variável 2: Segunda variável

**Uso Comum**:
- Comparar leitura atual com anterior
- Detectar mudanças
- Alarmes de variação

**Exemplo**:
```
Se (temp_atual > temp_anterior)
├─ True: Imprimir "Temperatura subindo"
└─ False: Imprimir "Temperatura estável/caindo"
```

**Código Gerado**:
```python
if temp_atual > temp_anterior:
    print("Temperatura subindo")
else:
    print("Temperatura estável/caindo")
```

---

## 📝 Variáveis

### 8. 📝 **Criar Variável**
**Função**: Cria ou atribui valor a uma variável

**Propriedades**:
- Nome: Nome da variável
- Valor: Valor inicial (número ou texto)

**Exemplo**:
```
Criar Variável
├─ Nome: contador
└─ Valor: 0
```

**Código Gerado**:
```python
contador = 0
print(f"contador = {contador}")
```

---

### 9. 💾 **Armazenar em Variável**
**Função**: Copia valor de uma variável/sensor para outra

**Propriedades**:
- Variável: Nome da variável destino
- Origem: Variável origem

**Uso Comum**:
- Salvar leitura anterior
- Backup de valores
- Histórico de dados

**Exemplo**:
```
Armazenar em Variável
├─ Variável: temp_anterior
└─ Origem: temperature
```

**Código Gerado**:
```python
temp_anterior = temperature
```

---

## ➕ Operações Matemáticas

### 10. ➕ **Operação Matemática**
**Função**: Realiza operações matemáticas

**Propriedades**:
- Resultado: Nome da variável resultado
- Valor 1: Primeiro operando
- Operador: +, -, *, /, //, %, **
- Valor 2: Segundo operando

**Operadores**:
- `+` : Adição
- `-` : Subtração
- `*` : Multiplicação
- `/` : Divisão
- `//` : Divisão inteira
- `%` : Resto (módulo)
- `**` : Potenciação

**Exemplo**:
```
Operação Matemática
├─ Resultado: celsius
├─ Valor 1: fahrenheit
├─ Operador: -
└─ Valor 2: 32
```

**Código Gerado**:
```python
celsius = (fahrenheit - 32) * 5/9
print(f"celsius = {celsius}")
```

---

### 11. 📊 **Calcular Média**
**Função**: Calcula média de múltiplos valores

**Propriedades**:
- Resultado: Nome da variável resultado
- Valores: Valores separados por vírgula

**Exemplo**:
```
Calcular Média
├─ Resultado: temp_media
└─ Valores: temp1, temp2, temp3, temp4, temp5
```

**Código Gerado**:
```python
temp_media = (temp1 + temp2 + temp3 + temp4 + temp5) / 5
print(f"Média = {temp_media}")
```

---

### 12. 🔼 **Incrementar/Decrementar**
**Função**: Aumenta ou diminui variável

**Propriedades**:
- Variável: Nome da variável
- Operação: ++, --, += valor, -= valor
- Valor: Valor a adicionar/subtrair (se aplicável)

**Operações**:
- `++` : Incrementa +1
- `--` : Decrementa -1
- `+= valor` : Adiciona valor
- `-= valor` : Subtrai valor

**Exemplo - Contador**:
```
Loop Infinito
├─ Ler Sensor
├─ Incrementar (contador ++)
└─ Imprimir (contador)
```

**Código Gerado**:
```python
contador += 1  # Incrementar
```

---

## 📢 Funções Especiais

### 13. 📢 **Imprimir Mensagem**
**Função**: Imprime texto no console serial

**Propriedades**:
- Mensagem: Texto a imprimir

**Uso Comum**:
- Debugging
- Logs de eventos
- Feedback ao usuário

**Código Gerado**:
```python
print("Missão iniciada com sucesso!")
```

---

### 14. 🖨️ **Imprimir Variável**
**Função**: Imprime valor de variável com rótulo

**Propriedades**:
- Variável: Nome da variável
- Rótulo: Texto descritivo

**Exemplo**:
```
Imprimir Variável
├─ Variável: temperature
└─ Rótulo: Temperatura Atual
```

**Código Gerado**:
```python
print(f"Temperatura Atual: {temperature}")
```

---

### 15. 💬 **Comentário**
**Função**: Adiciona comentário ao código (não executa)

**Propriedades**:
- Texto: Comentário

**Uso Comum**:
- Documentar código
- Explicar lógica
- Notas para equipe

**Código Gerado**:
```python
# Este é um comentário explicativo
```

---

## 🎯 Exemplos Práticos Completos

### **Exemplo 1: Estação Meteorológica Completa**

```
Iniciar Missão
    ↓
Criar Variável (contador = 0)
    ↓
Loop Infinito (10s)
    ├─ Ler Temperatura → temp
    ├─ Ler Umidade → humidity
    ├─ Ler Pressão → pressure
    ├─ Incrementar (contador ++)
    ├─ Imprimir ("Leitura #", contador)
    ├─ Salvar SD
    └─ Enviar WiFi
```

**Código Gerado**:
```python
from machine import Pin, I2C
import bme280
from time import sleep

# Inicializar
i2c = I2C(0, scl=Pin(22), sda=Pin(21))
bme = bme280.BME280(i2c=i2c)

# Criar contador
contador = 0

# Loop principal
while True:
    # Ler sensores
    temp = bme.temperature
    humidity = bme.humidity
    pressure = bme.pressure
    
    # Incrementar contador
    contador += 1
    print(f"Leitura #{contador}")
    
    # Salvar dados
    with open('data.csv', 'a') as f:
        f.write(f'{temp},{humidity},{pressure}\n')
    
    # Aguardar intervalo
    sleep(10)
```

---

### **Exemplo 2: Sistema de Alarme Inteligente**

```
Iniciar Missão
    ↓
Criar Variável (temp_limite = 35)
    ↓
Criar Variável (alarme_ativo = False)
    ↓
Loop Infinito (2s)
    ├─ Ler Temperatura → temp
    ├─ Se (temp > temp_limite)
    │   ├─ True:
    │   │   ├─ Se (alarme_ativo == False)
    │   │   │   ├─ True:
    │   │   │   │   ├─ Imprimir "ALARME ATIVADO!"
    │   │   │   │   ├─ Criar Variável (alarme_ativo = True)
    │   │   │   └─ False: [nada]
    │   │   ├─ Buzzer (1000Hz)
    │   │   └─ LED RGB (vermelho)
    │   └─ False:
    │       ├─ Criar Variável (alarme_ativo = False)
    │       └─ LED RGB (verde)
    └─ Aguardar [automático]
```

---

### **Exemplo 3: LED Piscante com Padrão**

```
Iniciar Missão
    ↓
Repetir 5 vezes
    ├─ LED Branco ON
    ├─ Aguardar 0.5s
    ├─ LED Branco OFF
    └─ Aguardar 0.5s
    ↓
Aguardar 2s
    ↓
Repetir 3 vezes
    ├─ LED RGB (vermelho)
    ├─ Aguardar 0.2s
    ├─ LED RGB (verde)
    ├─ Aguardar 0.2s
    ├─ LED RGB (azul)
    └─ Aguardar 0.2s
```

---

### **Exemplo 4: Cálculo de Média de Temperatura**

```
Iniciar Missão
    ↓
Criar Variável (temp1 = 0)
Criar Variável (temp2 = 0)
Criar Variável (temp3 = 0)
Criar Variável (temp4 = 0)
Criar Variável (temp5 = 0)
    ↓
Ler Temperatura → temp1
Aguardar 1s
Ler Temperatura → temp2
Aguardar 1s
Ler Temperatura → temp3
Aguardar 1s
Ler Temperatura → temp4
Aguardar 1s
Ler Temperatura → temp5
    ↓
Calcular Média (temp1, temp2, temp3, temp4, temp5) → media
    ↓
Imprimir Variável (media, "Temperatura Média")
    ↓
Se (media > 25)
    ├─ True: LED Verde
    └─ False: LED Azul
```

---

### **Exemplo 5: Monitoramento com Histórico**

```
Iniciar Missão
    ↓
Criar Variável (temp_anterior = 0)
Criar Variável (contador_leituras = 0)
    ↓
Loop Infinito (5s)
    ├─ Ler Temperatura → temp_atual
    ├─ Incrementar (contador_leituras ++)
    ├─ Imprimir ("Leitura", contador_leituras)
    ├─ 
    ├─ Se Comparar (temp_atual > temp_anterior)
    │   ├─ True:
    │   │   ├─ Imprimir "🔺 Temperatura SUBIU"
    │   │   ├─ LED RGB (vermelho)
    │   │   └─ Operação (variacao = temp_atual - temp_anterior)
    │   └─ False:
    │       ├─ Imprimir "🔻 Temperatura CAIU/ESTÁVEL"
    │       └─ LED RGB (azul)
    ├─
    ├─ Armazenar (temp_anterior ← temp_atual)
    ├─ Salvar SD
    └─ [Aguarda 5s automático]
```

**Código Gerado**:
```python
temp_anterior = 0
contador_leituras = 0

while True:
    temp_atual = bme280.temperature
    contador_leituras += 1
    print(f"Leitura {contador_leituras}")
    
    if temp_atual > temp_anterior:
        print("🔺 Temperatura SUBIU")
        led_rgb.fill((255, 0, 0))
        variacao = temp_atual - temp_anterior
        print(f"Variação: {variacao}°C")
    else:
        print("🔻 Temperatura CAIU/ESTÁVEL")
        led_rgb.fill((0, 0, 255))
    
    temp_anterior = temp_atual
    
    with open('log.csv', 'a') as f:
        f.write(f'{contador_leituras},{temp_atual}\n')
    
    sleep(5)
```

---

## 📊 Resumo dos Blocos

| Categoria | Blocos | Total |
|-----------|--------|-------|
| **Controle de Fluxo** | Aguardar, Loop Infinito, Repetir N, Enquanto, Sair | 5 |
| **Condicionais** | Se/Então, Se Comparar | 2 |
| **Variáveis** | Criar, Armazenar | 2 |
| **Matemática** | Operação, Média, Incrementar | 3 |
| **Especiais** | Imprimir, Imprimir Variável, Comentário | 3 |
| **TOTAL** | | **15 blocos** |

---

## 🎓 Progressão Educacional Sugerida

### **Nível 1 - Iniciante** (Aulas 1-2)
- Aguardar
- Imprimir Mensagem
- Se/Então simples

### **Nível 2 - Básico** (Aulas 3-4)
- Criar Variável
- Repetir N vezes
- LED piscante

### **Nível 3 - Intermediário** (Aulas 5-6)
- Loop Infinito
- Operação Matemática
- Se Comparar

### **Nível 4 - Avançado** (Aulas 7-8)
- Enquanto (While)
- Calcular Média
- Armazenar/Histórico

### **Nível 5 - Projeto Final**
- Combinar todos os blocos
- Estação meteorológica completa
- Sistema de alarmes inteligente

---

## 💡 Dicas de Uso

1. **Sempre inicie com "Iniciar Missão"**
2. **Use comentários** para documentar sua lógica
3. **Teste incrementalmente** - adicione blocos aos poucos
4. **Imprima variáveis** para debugging
5. **Loops infinitos** precisam de intervalo para não travar
6. **Variáveis** facilitam muito a lógica complexa
7. **Salve frequentemente** seu projeto em XML

---

## 🚀 Novos Recursos Habilitados

Com esses blocos, agora é possível:

✅ Monitoramento contínuo de sensores  
✅ Padrões repetitivos (LED piscando N vezes)  
✅ Cálculos e processamento de dados  
✅ Histórico e comparação de leituras  
✅ Alarmes inteligentes com estados  
✅ Contadores e estatísticas  
✅ Loops condicionais complexos  
✅ Debugging com impressão de variáveis  
✅ Projetos educacionais realistas  

---

**Documentação criada em**: 17 de outubro de 2025  
**Versão**: 2.0 - MVP Completo  
**Blocos de Lógica**: 15 blocos essenciais
