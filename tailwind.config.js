/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    dark: '#0a0e27',
                    blue: '#1e3a8a',
                    purple: '#5b21b6',
                    cyan: '#06b6d4',
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)' },
                }
            }
        },
    },
    plugins: [],
}
