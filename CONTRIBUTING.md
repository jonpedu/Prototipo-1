# 🤝 Contribuindo para o SatelliteProg

Obrigado pelo interesse em contribuir! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Adicionando Novos Blocos](#adicionando-novos-blocos)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)

## 🚀 Como Contribuir

### 1. Fork o Repositório

```bash
# Clone seu fork
git clone https://github.com/seu-usuario/satellite-prog.git
cd satellite-prog

# Adicione o repositório original como remote
git remote add upstream https://github.com/original/satellite-prog.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature
git checkout -b feature/minha-feature
```

### 3. Faça suas Alterações

- Mantenha commits pequenos e focados
- Escreva mensagens de commit claras
- Teste suas alterações

### 4. Submeta um Pull Request

```bash
git push origin feature/minha-feature
```

Depois, abra um Pull Request no GitHub.

## 🐛 Reportando Bugs

### Antes de Reportar

- Verifique se o bug já não foi reportado
- Teste na versão mais recente
- Colete informações sobre o ambiente

### Template de Bug Report

```markdown
## Descrição do Bug
[Descrição clara do que aconteceu]

## Como Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## Comportamento Esperado
[O que deveria acontecer]

## Screenshots
[Se aplicável, adicione screenshots]

## Ambiente
- SO: [Windows 11, macOS 13, Ubuntu 22.04]
- Navegador: [Chrome 119, Firefox 120]
- Versão do Node: [18.17.0]
- Versão do Python: [3.11.5]

## Informações Adicionais
[Qualquer contexto adicional]
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
## Descrição da Feature
[Descrição clara da funcionalidade]

## Problema que Resolve
[Qual problema essa feature resolve?]

## Solução Proposta
[Como você implementaria isso?]

## Alternativas Consideradas
[Outras abordagens que você pensou]

## Impacto
- [ ] Interface do usuário
- [ ] Backend
- [ ] Documentação
- [ ] Performance
```

## 🧩 Adicionando Novos Blocos

### 1. Estrutura do Bloco

Edite `src/utils/blockDefinitions.js`:

```javascript
{
  id: 'meu_bloco',                    // ID único
  type: 'sensor',                      // Categoria
  label: 'Meu Sensor',                 // Nome exibido
  icon: '🔧',                          // Emoji
  color: '#10b981',                    // Cor hex
  inputs: 1,                           // Número de entradas
  outputs: 1,                          // Número de saídas
  properties: {                        // Configurações
    parametro1: {
      type: 'number',                  // number, text, select
      label: 'Parâmetro 1',
      min: 0,
      max: 100,
      default: 50
    },
    parametro2: {
      type: 'select',
      label: 'Opção',
      options: ['Op1', 'Op2', 'Op3'],
      default: 'Op1'
    }
  },
  code: (props) => `                   // Função geradora de código
# Meu Bloco
sensor = MeuSensor(
  param1=${props.parametro1},
  param2="${props.parametro2}"
)
resultado = sensor.executar()
print(f"Resultado: {resultado}")
`
}
```

### 2. Adicione à Categoria

```javascript
export const blockCategories = {
  // ... categorias existentes
  minha_categoria: {
    name: 'Minha Categoria',
    color: '#10b981',
    icon: '🔧',
    blocks: [
      // seu bloco aqui
    ]
  }
};
```

### 3. Implemente no Backend (se necessário)

Edite `server/app.py`:

```python
class MeuSensor:
    def __init__(self, param1=50, param2="Op1"):
        self.param1 = param1
        self.param2 = param2
    
    def executar(self):
        # Lógica do sensor
        return f"Executado com {self.param1}, {self.param2}"

# Adicione ao namespace
satellite_libs = {
    # ... classes existentes
    'MeuSensor': MeuSensor,
}
```

### 4. Teste

- Arraste o bloco para o canvas
- Configure propriedades
- Gere o código
- Execute a simulação

## 📝 Padrões de Código

### JavaScript/React

```javascript
// Use functional components
const MeuComponente = ({ prop1, prop2 }) => {
  // Hooks no topo
  const [state, setState] = useState(null);
  
  // Funções auxiliares
  const handleClick = () => {
    // lógica
  };
  
  // Render
  return (
    <div className="classe-tailwind">
      {/* JSX */}
    </div>
  );
};

// Export default
export default MeuComponente;
```

### Nomenclatura

- **Componentes**: PascalCase (`MyComponent.jsx`)
- **Funções**: camelCase (`handleClick`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_VALUE`)
- **Arquivos**: kebab-case (`my-component.jsx`)

### Comentários

```javascript
// Comentários simples para explicações rápidas

/**
 * Comentários JSDoc para funções complexas
 * @param {string} param1 - Descrição
 * @returns {object} - Descrição
 */
```

### Python

```python
# PEP 8 compliant

class MinhaClasse:
    """Docstring da classe."""
    
    def __init__(self, param):
        """Construtor."""
        self.param = param
    
    def metodo(self):
        """Descrição do método."""
        return self.param

# snake_case para funções e variáveis
def minha_funcao(parametro):
    """Docstring da função."""
    resultado = parametro * 2
    return resultado
```

## 🔍 Processo de Pull Request

### Checklist

Antes de submeter, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Comentários adicionados onde necessário
- [ ] Documentação atualizada
- [ ] Testes passam (se aplicável)
- [ ] Sem warnings do linter
- [ ] Branch atualizada com main
- [ ] Commit messages são claros

### Template de PR

```markdown
## Descrição
[Breve descrição das mudanças]

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Código testado localmente
- [ ] Documentação atualizada
- [ ] Sem warnings
- [ ] Screenshots (se UI)

## Screenshots (se aplicável)
[Cole screenshots aqui]

## Notas Adicionais
[Qualquer informação relevante]
```

### Revisão

- Mantenha PRs pequenos e focados
- Responda a comentários prontamente
- Faça as alterações solicitadas
- Seja receptivo a feedback

## 🧪 Testando

### Frontend

```bash
# Instale dependências
npm install

# Inicie dev server
npm run dev

# Build para produção
npm run build

# Preview build
npm run preview
```

### Backend

```bash
# Instale dependências
cd server
python -m pip install -r requirements.txt

# Execute server
python app.py

# Teste endpoint
curl http://localhost:5000/api/health
```

## 📚 Recursos Úteis

### Documentação de Tecnologias

- [React](https://react.dev/)
- [React Flow](https://reactflow.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flask](https://flask.palletsprojects.com/)

### Guias do Projeto

- `README.md` - Visão geral
- `QUICK_START.md` - Tutorial rápido
- `PYTHON_SETUP.md` - Configuração Python
- `FEATURES.md` - Funcionalidades
- `VISUAL_GUIDE.md` - Design

## 🎯 Áreas que Precisam de Ajuda

### Alta Prioridade

- [ ] Testes automatizados (Jest, Cypress)
- [ ] Modo offline completo
- [ ] Internacionalização (i18n)
- [ ] Acessibilidade (a11y)

### Média Prioridade

- [ ] Mais blocos de satélite
- [ ] Simulação 3D
- [ ] Validação de fluxo
- [ ] Tutoriais interativos

### Baixa Prioridade

- [ ] Temas customizáveis
- [ ] Exportar para diferentes formatos
- [ ] Integração com CI/CD
- [ ] Mobile app (React Native)

## 🌟 Reconhecimento

Contribuidores serão reconhecidos:

- No README.md
- Nos release notes
- Na documentação

## 📞 Contato

Dúvidas sobre contribuição?

- Abra uma issue com a label `question`
- Ou entre em contato via [seu contato]

---

**Obrigado por contribuir para o SatelliteProg! 🛰️**
