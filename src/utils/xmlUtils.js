// Utilitários para conversão entre fluxo e XML
import { blockCategories } from './blockDefinitions';

export const flowToXML = (nodes, edges) => {
    const xmlDoc = document.implementation.createDocument(null, 'cansat_mission');
    const root = xmlDoc.documentElement;

    // Metadata
    const metadata = xmlDoc.createElement('metadata');
    const timestamp = xmlDoc.createElement('timestamp');
    timestamp.textContent = new Date().toISOString();
    metadata.appendChild(timestamp);

    const version = xmlDoc.createElement('version');
    version.textContent = '1.0';
    metadata.appendChild(version);

    const board = xmlDoc.createElement('board');
    board.textContent = 'ESP32';
    metadata.appendChild(board);

    root.appendChild(metadata);

    // Nodes
    const nodesElement = xmlDoc.createElement('blocks');
    nodes.forEach(node => {
        const blockElement = xmlDoc.createElement('block');
        blockElement.setAttribute('id', node.id);
        blockElement.setAttribute('type', node.data.blockId);
        blockElement.setAttribute('category', node.data.categoryKey);

        // Position
        const position = xmlDoc.createElement('position');
        position.setAttribute('x', node.position.x);
        position.setAttribute('y', node.position.y);
        blockElement.appendChild(position);

        // Properties
        if (node.data.properties && Object.keys(node.data.properties).length > 0) {
            const propsElement = xmlDoc.createElement('properties');
            Object.entries(node.data.properties).forEach(([key, value]) => {
                const prop = xmlDoc.createElement('property');
                prop.setAttribute('name', key);
                prop.textContent = String(value);
                propsElement.appendChild(prop);
            });
            blockElement.appendChild(propsElement);
        }

        nodesElement.appendChild(blockElement);
    });
    root.appendChild(nodesElement);

    // Edges (Connections)
    const connectionsElement = xmlDoc.createElement('connections');
    edges.forEach(edge => {
        const conn = xmlDoc.createElement('connection');
        conn.setAttribute('from', edge.source);
        conn.setAttribute('to', edge.target);
        if (edge.sourceHandle) {
            conn.setAttribute('from_handle', edge.sourceHandle);
        }
        if (edge.targetHandle) {
            conn.setAttribute('to_handle', edge.targetHandle);
        }
        connectionsElement.appendChild(conn);
    });
    root.appendChild(connectionsElement);

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);

    // Format XML with indentation
    return formatXML(xmlString);
};

export const xmlToFlow = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Check for parsing errors
    if (xmlDoc.querySelector('parsererror')) {
        throw new Error('XML inválido');
    }

    const nodes = [];
    const edges = [];

    // Parse blocks
    const blocks = xmlDoc.querySelectorAll('block');
    blocks.forEach(block => {
        const id = block.getAttribute('id');
        const type = block.getAttribute('type');
        const category = block.getAttribute('category');

        // Get position
        const posElement = block.querySelector('position');
        const position = {
            x: parseFloat(posElement.getAttribute('x')),
            y: parseFloat(posElement.getAttribute('y'))
        };

        // Get properties
        const properties = {};
        const propsElement = block.querySelector('properties');
        if (propsElement) {
            const propElements = propsElement.querySelectorAll('property');
            propElements.forEach(prop => {
                const name = prop.getAttribute('name');
                let value = prop.textContent;

                // Try to parse as number if possible
                if (!isNaN(value) && value !== '') {
                    value = parseFloat(value);
                }

                properties[name] = value;
            });
        }

        // Get block definition to reconstruct node data
        const blockDef = findBlockDefinition(category, type);
        if (blockDef) {
            nodes.push({
                id,
                type: 'customNode',
                position,
                data: {
                    label: blockDef.label,
                    icon: blockDef.icon,
                    color: blockDef.color,
                    blockType: blockDef.type,
                    blockId: type,
                    categoryKey: category,
                    properties: { ...getDefaultProperties(blockDef), ...properties },
                    inputs: blockDef.inputs,
                    outputs: blockDef.outputs
                }
            });
        }
    });

    // Parse connections
    const connections = xmlDoc.querySelectorAll('connection');
    connections.forEach(conn => {
        const edge = {
            id: `edge_${edges.length + 1}`,
            source: conn.getAttribute('from'),
            target: conn.getAttribute('to'),
            animated: true,
            style: { stroke: '#06b6d4', strokeWidth: 2 }
        };

        const fromHandle = conn.getAttribute('from_handle');
        const toHandle = conn.getAttribute('to_handle');

        if (fromHandle) edge.sourceHandle = fromHandle;
        if (toHandle) edge.targetHandle = toHandle;

        edges.push(edge);
    });

    return { nodes, edges };
};

// Helper function to format XML with indentation
const formatXML = (xml) => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;

    xml = xml.replace(reg, '$1\n$2$3');

    return xml.split('\n').map((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
            indent = 1;
        }

        const padding = PADDING.repeat(pad);
        pad += indent;

        return padding + node;
    }).join('\n');
};

// Helper to find block definition
const findBlockDefinition = (categoryKey, blockId) => {
    const category = blockCategories[categoryKey];
    if (!category) return null;
    return category.blocks.find(b => b.id === blockId);
};

// Helper to get default properties
const getDefaultProperties = (block) => {
    const defaults = {};
    if (block.properties) {
        Object.entries(block.properties).forEach(([key, prop]) => {
            defaults[key] = prop.default;
        });
    }
    return defaults;
};

export const downloadXML = (xmlString, filename = 'cansat_mission.xml') => {
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

export const loadXMLFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const xmlString = e.target.result;
                const { nodes, edges } = xmlToFlow(xmlString);
                resolve({ nodes, edges });
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
        reader.readAsText(file);
    });
};
