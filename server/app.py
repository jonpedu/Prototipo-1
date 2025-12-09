from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import io
import traceback
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Biblioteca simulada de funções do satélite
class Camera:
    def __init__(self, resolution="1280x720", exposure=100, format="JPEG"):
        self.resolution = resolution
        self.exposure = exposure
        self.format = format
    
    def capture(self):
        return f"IMAGE_DATA_{self.resolution}_{self.format}".encode()

class TemperatureSensor:
    def __init__(self, frequency=1, unit="Celsius"):
        self.frequency = frequency
        self.unit = unit
    
    def read(self):
        import random
        return round(random.uniform(-20, 60), 2)

class Magnetometer:
    def __init__(self, sensitivity="Média", axes="XYZ"):
        self.sensitivity = sensitivity
        self.axes = axes
    
    def read(self):
        import random
        return {
            'x': round(random.uniform(-100, 100), 2),
            'y': round(random.uniform(-100, 100), 2),
            'z': round(random.uniform(-100, 100), 2)
        }

class GPS:
    def __init__(self, precision="Alta"):
        self.precision = precision
    
    def get_position(self):
        import random
        class Position:
            lat = round(random.uniform(-90, 90), 6)
            lon = round(random.uniform(-180, 180), 6)
            alt = round(random.uniform(200000, 500000), 2)
        return Position()

class Thruster:
    def __init__(self, direction="+X"):
        self.direction = direction
    
    def fire(self, power, duration):
        print(f"🚀 Propulsor disparado: {self.direction}, Potência: {power}%, Duração: {duration}s")

class SolarPanel:
    def __init__(self):
        pass
    
    def deploy(self, angle, speed):
        print(f"☀️ Painel solar aberto: {angle}°, Velocidade: {speed}")

class StatusLED:
    def __init__(self, color="Verde"):
        self.color = color
        self.pattern = "Contínuo"
    
    def set_pattern(self, pattern):
        self.pattern = pattern
    
    def turn_on(self):
        print(f"💡 LED {self.color} ligado - Padrão: {self.pattern}")

class Transmitter:
    def __init__(self, frequency=437.5, power=20):
        self.frequency = frequency
        self.power = power
    
    def send(self, data, rate="9600 bps"):
        print(f"📤 Transmitindo dados: {len(str(data))} bytes a {rate}")

class Receiver:
    def __init__(self, frequency=437.5):
        self.frequency = frequency
    
    def wait_for_command(self, timeout=30):
        import random
        if random.random() > 0.3:
            return "CMD_STATUS_CHECK"
        return None

class OrbitController:
    def __init__(self, target_altitude=400, tolerance=5):
        self.target_altitude = target_altitude
        self.tolerance = tolerance
    
    def maintain(self):
        print(f"🌍 Controlador de órbita ativo: {self.target_altitude}km ±{self.tolerance}km")

class DataCollector:
    def __init__(self, sensors="Todos"):
        self.sensors = sensors
    
    def collect(self, duration):
        print(f"📊 Coletando dados de {self.sensors} por {duration}s")

class EmergencyBeacon:
    def __init__(self, message="EMERGÊNCIA"):
        self.message = message
    
    def transmit(self, repeat=10):
        print(f"🚨 Transmitindo emergência: '{self.message}' ({repeat}x)")

class Battery:
    def __init__(self):
        pass
    
    def get_charge(self):
        import random
        return round(random.uniform(20, 100), 1)

class PowerManager:
    def __init__(self):
        pass
    
    def set_mode(self, mode):
        print(f"⚡ Modo de energia alterado para: {mode}")

# Criar namespace com todas as classes
satellite_libs = {
    'Camera': Camera,
    'TemperatureSensor': TemperatureSensor,
    'Magnetometer': Magnetometer,
    'GPS': GPS,
    'Thruster': Thruster,
    'SolarPanel': SolarPanel,
    'StatusLED': StatusLED,
    'Transmitter': Transmitter,
    'Receiver': Receiver,
    'OrbitController': OrbitController,
    'DataCollector': DataCollector,
    'EmergencyBeacon': EmergencyBeacon,
    'Battery': Battery,
    'PowerManager': PowerManager,
    'time': __import__('time')
}

@app.route('/api/execute', methods=['POST'])
def execute_code():
    """Executa o código Python gerado"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        if not code:
            return jsonify({'error': 'Nenhum código fornecido'}), 400
        
        # Capturar stdout
        old_stdout = sys.stdout
        sys.stdout = io.StringIO()
        
        # Criar namespace para execução
        namespace = satellite_libs.copy()
        
        # Executar código
        exec(code, namespace)
        
        # Capturar output
        output = sys.stdout.getvalue()
        sys.stdout = old_stdout
        
        return jsonify({
            'success': True,
            'output': output,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        sys.stdout = old_stdout
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc(),
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/validate', methods=['POST'])
def validate_code():
    """Valida o código Python sem executar"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        if not code:
            return jsonify({'error': 'Nenhum código fornecido'}), 400
        
        # Tentar compilar o código
        compile(code, '<string>', 'exec')
        
        return jsonify({
            'valid': True,
            'message': 'Código válido'
        })
        
    except SyntaxError as e:
        return jsonify({
            'valid': False,
            'error': str(e),
            'line': e.lineno,
            'offset': e.offset
        })

@app.route('/api/health', methods=['GET'])
def health():
    """Endpoint de health check"""
    return jsonify({
        'status': 'ok',
        'message': 'Backend do SatelliteProg funcionando',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🛰️ SatelliteProg Backend Server")
    print("=" * 50)
    print("Servidor iniciado em http://localhost:5000")
    print("Endpoints disponíveis:")
    print("  POST /api/execute  - Executar código Python")
    print("  POST /api/validate - Validar código Python")
    print("  GET  /api/health   - Health check")
    print("=" * 50)
    app.run(debug=True, port=5000)
