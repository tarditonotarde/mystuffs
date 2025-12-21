import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Plugin temporal para resolver figma:asset/ imports
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return '\0' + id; // Prefix con \0 para que Vite lo trate como virtual module
      }
      return null;
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        // Retorna un placeholder data URL de 1x1 pixel transparente
        const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        return `export default "${placeholder}";`;
      }
      return null;
    }
  };
}

export default defineConfig({
  base: '/mystuffs/', // Nombre del repositorio en GitHub
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})