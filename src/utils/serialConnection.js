// Web Serial API integration for ESP32/MicroPython communication

let port = null;
let reader = null;
let writer = null;

/**
 * Connect to ESP32 via Web Serial API
 */
export const connectSerial = async () => {
    try {
        // Check if Web Serial API is supported
        if (!('serial' in navigator)) {
            throw new Error('Web Serial API não suportada neste navegador. Use Chrome ou Edge versão 89+.');
        }

        // Request port from user
        port = await navigator.serial.requestPort();

        // Open port with common ESP32 baudrate
        await port.open({ baudRate: 115200 });

        // Setup reader and writer
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();

        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        writer = textEncoder.writable.getWriter();

        console.log('Conectado ao ESP32');
        return port;
    } catch (error) {
        console.error('Erro ao conectar:', error);
        throw new Error(`Falha na conexão: ${error.message}`);
    }
};

/**
 * Disconnect from serial port
 */
export const disconnectSerial = async () => {
    try {
        if (reader) {
            await reader.cancel();
            reader = null;
        }

        if (writer) {
            await writer.close();
            writer = null;
        }

        if (port) {
            await port.close();
            port = null;
        }

        console.log('Desconectado do ESP32');
    } catch (error) {
        console.error('Erro ao desconectar:', error);
        throw error;
    }
};

/**
 * Send raw data to serial port
 */
export const sendToSerial = async (data) => {
    if (!writer) {
        throw new Error('Porta serial não está conectada');
    }

    try {
        await writer.write(data);
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

/**
 * Read from serial port (non-blocking)
 */
export const readFromSerial = async (timeout = 1000) => {
    if (!reader) {
        throw new Error('Porta serial não está conectada');
    }

    try {
        const timer = setTimeout(() => {
            reader.cancel();
        }, timeout);

        const { value, done } = await reader.read();
        clearTimeout(timer);

        if (done) {
            return null;
        }

        return value;
    } catch (error) {
        console.error('Erro ao ler dados:', error);
        throw error;
    }
};

/**
 * Upload MicroPython code to ESP32
 * This sends the code directly to the REPL
 */
export const uploadCode = async (code) => {
    if (!writer) {
        throw new Error('Dispositivo não conectado');
    }

    try {
        // Enter raw REPL mode
        await sendToSerial('\x03\x03'); // Ctrl+C twice to interrupt
        await sleep(100);
        await sendToSerial('\x01'); // Ctrl+A for raw REPL
        await sleep(200);

        // Send code
        await sendToSerial(code);
        await sleep(100);

        // Execute code (Ctrl+D)
        await sendToSerial('\x04');

        console.log('Código enviado ao ESP32');

        // Wait for execution
        await sleep(500);

        // Exit raw REPL (Ctrl+B)
        await sendToSerial('\x02');

        return true;
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        throw new Error(`Falha no upload: ${error.message}`);
    }
};

/**
 * Upload code as a file (main.py)
 * This version saves the code permanently on the ESP32
 */
export const uploadCodeAsFile = async (code, filename = 'main.py') => {
    if (!writer) {
        throw new Error('Dispositivo não conectado');
    }

    try {
        // Interrupt any running code
        await sendToSerial('\x03\x03');
        await sleep(100);

        // Enter paste mode
        await sendToSerial('\x05');
        await sleep(100);

        // Create file writing code
        const fileCode = `
with open('${filename}', 'w') as f:
    f.write('''${code}''')
print('Arquivo ${filename} salvo!')
`;

        // Send file creation code
        await sendToSerial(fileCode);
        await sleep(100);

        // Exit paste mode (Ctrl+D)
        await sendToSerial('\x04');
        await sleep(500);

        console.log(`Código salvo como ${filename} no ESP32`);
        return true;
    } catch (error) {
        console.error('Erro ao salvar arquivo:', error);
        throw new Error(`Falha ao salvar arquivo: ${error.message}`);
    }
};

/**
 * Run a file on ESP32
 */
export const runFile = async (filename = 'main.py') => {
    if (!writer) {
        throw new Error('Dispositivo não conectado');
    }

    try {
        await sendToSerial('\x03\x03');
        await sleep(100);

        const runCommand = `exec(open('${filename}').read())\n`;
        await sendToSerial(runCommand);

        console.log(`Executando ${filename}...`);
        return true;
    } catch (error) {
        console.error('Erro ao executar arquivo:', error);
        throw error;
    }
};

/**
 * Reset ESP32 (soft reset)
 */
export const resetESP32 = async () => {
    if (!writer) {
        throw new Error('Dispositivo não conectado');
    }

    try {
        // Send Ctrl+D for soft reset
        await sendToSerial('\x04');
        console.log('ESP32 reiniciado');
        await sleep(2000); // Wait for reboot
        return true;
    } catch (error) {
        console.error('Erro ao reiniciar:', error);
        throw error;
    }
};

/**
 * Check if device is connected
 */
export const isConnected = () => {
    return port !== null && writer !== null;
};

/**
 * Get list of available ports
 */
export const getAvailablePorts = async () => {
    if (!('serial' in navigator)) {
        throw new Error('Web Serial API não suportada');
    }

    try {
        const ports = await navigator.serial.getPorts();
        return ports;
    } catch (error) {
        console.error('Erro ao listar portas:', error);
        return [];
    }
};

/**
 * Helper function for delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
    connectSerial,
    disconnectSerial,
    sendToSerial,
    readFromSerial,
    uploadCode,
    uploadCodeAsFile,
    runFile,
    resetESP32,
    isConnected,
    getAvailablePorts
};
