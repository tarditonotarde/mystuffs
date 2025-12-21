# 🚀 Guía de Deploy a GitHub Pages

## 📋 Requisitos previos

- ✅ Tener Git instalado
- ✅ Tener una cuenta de GitHub
- ✅ Tener Node.js instalado

---

## 🎯 Método 1: Deploy Manual (Recomendado para empezar)

### **Paso 1: Configurar el proyecto**

Ya hemos configurado `vite.config.ts` con:
```typescript
base: '/portfolio/', // Cambia 'portfolio' por el nombre de tu repo
```

⚠️ **IMPORTANTE**: Cambia `'portfolio'` por el nombre exacto de tu repositorio en GitHub.

---

### **Paso 2: Crear repositorio en GitHub**

#### Opción A: Desde GitHub.com (interfaz web)

1. Ve a https://github.com
2. Click en el botón **"+"** (arriba derecha) → **"New repository"**
3. Nombre del repositorio: `portfolio` (o el nombre que prefieras)
4. Descripción: "Claudia Tardito Portfolio"
5. **NO** marques "Initialize this repository with a README"
6. Click **"Create repository"**

#### Opción B: Desde GitHub Desktop (más fácil)

1. Descarga e instala [GitHub Desktop](https://desktop.github.com/)
2. Abre GitHub Desktop
3. File → New Repository
4. Name: `portfolio`
5. Local Path: Navega a la carpeta de tu proyecto
6. Click "Create Repository"
7. Click "Publish repository" (arriba)

---

### **Paso 3: Instalar gh-pages (herramienta de deploy)**

Abre la terminal en la carpeta de tu proyecto y ejecuta:

```bash
npm install --save-dev gh-pages
```

---

### **Paso 4: Conectar tu proyecto local con GitHub**

#### Si usaste GitHub Desktop:
✅ Ya está conectado, salta al Paso 5.

#### Si creaste el repo en GitHub.com:

Abre la terminal en tu proyecto y ejecuta:

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - Portfolio setup"

# Conectar con tu repositorio de GitHub (CAMBIA tu-usuario y portfolio)
git remote add origin https://github.com/tu-usuario/portfolio.git

# Subir el código
git branch -M main
git push -u origin main
```

⚠️ **Reemplaza**:
- `tu-usuario` → tu nombre de usuario de GitHub
- `portfolio` → el nombre de tu repositorio

---

### **Paso 5: Build y Deploy**

```bash
# Hacer build del proyecto
npm run build

# Desplegar a GitHub Pages
npm run deploy
```

El comando `npm run deploy`:
1. ✅ Crea una carpeta `dist` con tu app optimizada
2. ✅ Crea una rama `gh-pages` en tu repositorio
3. ✅ Sube los archivos a esa rama
4. ✅ GitHub Pages los detecta automáticamente

---

### **Paso 6: Activar GitHub Pages**

1. Ve a tu repositorio en GitHub: `https://github.com/tu-usuario/portfolio`
2. Click en **"Settings"** (Configuración)
3. En el menú lateral izquierdo, click en **"Pages"**
4. En **"Source"**, selecciona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **"Save"**

GitHub te mostrará la URL donde está publicado:
```
https://tu-usuario.github.io/portfolio/
```

⏱️ **Espera 2-5 minutos** para que se active por primera vez.

---

## 🔄 Actualizar tu portfolio (después del primer deploy)

Cada vez que hagas cambios:

```bash
# 1. Guardar cambios en Git
git add .
git commit -m "Descripción de los cambios"
git push

# 2. Redesplegar a GitHub Pages
npm run deploy
```

---

## 🎯 Método 2: Deploy Automático con GitHub Actions

Si quieres que se actualice automáticamente cada vez que hagas `git push`:

### **Paso 1: Crear archivo de GitHub Actions**

Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### **Paso 2: Subir el workflow**

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

### **Paso 3: Configurar permisos**

1. Ve a tu repositorio en GitHub
2. Settings → Actions → General
3. Scroll hasta **"Workflow permissions"**
4. Selecciona **"Read and write permissions"**
5. Click **"Save"**

Ahora cada `git push` desplegará automáticamente. 🎉

---

## 🌐 Usar dominio personalizado (opcional)

Si tienes un dominio propio (ej: `claudiatardito.com`):

### **Paso 1: Configurar DNS**

En tu proveedor de dominio (GoDaddy, Namecheap, etc.), agrega estos registros DNS:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: tu-usuario.github.io
```

### **Paso 2: Configurar en GitHub**

1. Ve a tu repositorio → Settings → Pages
2. En **"Custom domain"**, escribe tu dominio: `claudiatardito.com`
3. Click **"Save"**
4. Marca **"Enforce HTTPS"** (después de 24 horas)

### **Paso 3: Actualizar vite.config.ts**

Si usas dominio propio, cambia:

```typescript
base: '/', // En vez de '/portfolio/'
```

---

## 🐛 Solución de problemas

### **Error: "404 - Page not found"**

✅ **Solución**:
1. Verifica que `base` en `vite.config.ts` coincida con el nombre del repo
2. Espera 5 minutos después del deploy
3. Limpia caché del navegador (Ctrl + Shift + R)

### **Error: "Página en blanco"**

✅ **Solución**:
1. Verifica la consola del navegador (F12)
2. Asegúrate de que React Router está configurado con `basename`:

```tsx
// En App.tsx
<BrowserRouter basename="/portfolio">
  <Routes>
    {/* ... */}
  </Routes>
</BrowserRouter>
```

### **Error: "Remote origin already exists"**

```bash
git remote remove origin
git remote add origin https://github.com/tu-usuario/portfolio.git
```

### **Imágenes no cargan**

✅ **Solución**: Asegúrate de usar rutas relativas o URLs absolutas (Google Drive)

---

## 📊 Checklist de Deploy

Antes de hacer deploy, verifica:

- [ ] `vite.config.ts` tiene `base: '/nombre-repo/'` correcto
- [ ] Todas las imágenes de Google Drive usan URLs directas
- [ ] No hay errores en la consola del navegador
- [ ] Funciona localmente (`npm run build` → abrir `dist/index.html`)
- [ ] Git remote está configurado correctamente
- [ ] GitHub Pages está activado en Settings → Pages

---

## 🎉 Tu portfolio estará en:

```
https://tu-usuario.github.io/portfolio/
```

O si usas dominio personalizado:
```
https://tudominio.com
```

---

## 📝 Comandos útiles

```bash
# Ver build local
npm run build
# Luego abre dist/index.html en el navegador

# Deploy a GitHub Pages
npm run deploy

# Ver status de Git
git status

# Ver URL del remote
git remote -v

# Forzar push (solo si es necesario)
git push -f origin main
```

---

## 🔗 Links útiles

- 📚 [Documentación GitHub Pages](https://pages.github.com/)
- 🛠️ [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- 🎨 [GitHub Actions](https://github.com/features/actions)
- 💬 [GitHub Desktop](https://desktop.github.com/)

---

**Última actualización**: December 16, 2024  
**Creado por**: Claudia Tardito
