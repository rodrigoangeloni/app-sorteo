# 🎉 App Sorteos - Gestión de Sorteos en Redes Sociales 🎉

¡Bienvenido/a a la App Sorteos! Esta aplicación te permite crear y gestionar sorteos de forma sencilla y eficiente.

## ✨ Características Principales

*   📝 **Creación de Sorteos:** Define el nombre, descripción y premio de tus sorteos.
*   👥 **Gestión de Participantes:** Carga participantes desde archivos CSV o pégalos directamente. Filtra y busca participantes fácilmente.
*   ⚙️ **Configuración de Reglas:** Establece el número de ganadores y suplentes.
*   🏆 **Selección de Ganadores:** Realiza el sorteo y obtén los ganadores de forma aleatoria y transparente. ¡Con confeti! 🎊
*   💾 **Persistencia de Datos:** Los sorteos se guardan en el almacenamiento local de tu navegador.
*   🇪🇸 **Interfaz en Español:** Toda la aplicación está traducida al español.
*   📱 **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla gracias a Tailwind CSS.
*   🐳 **Soporte Docker:** Configuración para construir y ejecutar la aplicación en un contenedor Docker con Nginx.

## 🛠️ Tecnologías Utilizadas

*   **React:** Biblioteca para construir interfaces de usuario.
*   **TypeScript:** Superset de JavaScript que añade tipado estático.
*   **Vite:** Herramienta de frontend moderna y rápida.
*   **Tailwind CSS:** Framework CSS de utilidad primero para un diseño rápido.
*   **React Router DOM:** Para la gestión de rutas en la aplicación.
*   **Lucide Icons:** Iconos SVG ligeros y personalizables.
*   **Canvas Confetti:** Para celebrar la selección de ganadores. 🎉
*   **Docker:** Para la contenerización de la aplicación.
*   **Nginx:** Para servir la aplicación en producción dentro del contenedor Docker.

## 📁 Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar el mantenimiento y la escalabilidad:

```
app-sorteo/
├── public/               # Archivos estáticos
├── src/                  # Código fuente de la aplicación React
│   ├── assets/           # Imágenes, fuentes, etc. (si las hubiera)
│   ├── components/       # Componentes reutilizables de la UI
│   │   ├── common/       # Componentes comunes (Header, Footer)
│   │   ├── giveaway/     # Componentes específicos de la gestión de sorteos
│   │   ├── help/         # Componentes para la sección de ayuda
│   │   ├── home/         # Componentes para la página de inicio
│   │   └── ui/           # Componentes genéricos de UI (Button, Card, Input)
│   ├── context/          # Contexto de React (GiveawayContext)
│   ├── pages/            # Componentes que representan las páginas de la aplicación
│   ├── services/         # Lógica de servicios (ej. mockData)
│   ├── types/            # Definiciones de tipos de TypeScript
│   ├── App.tsx           # Componente principal de la aplicación y rutas
│   ├── main.tsx          # Punto de entrada de la aplicación
│   └── index.css         # Estilos globales (principalmente Tailwind)
├── .dockerignore         # Archivos ignorados por Docker al construir la imagen
├── .eslintrc.cjs         # Configuración de ESLint (Reemplazado por eslint.config.js en versiones recientes)
├── .gitignore            # Archivos ignorados por Git
├── Dockerfile            # Instrucciones para construir la imagen Docker
├── eslint.config.js      # Nueva configuración de ESLint (si aplica)
├── index.html            # Plantilla HTML principal
├── nginx.conf            # Configuración de Nginx para servir la SPA en Docker
├── package.json          # Dependencias y scripts del proyecto
├── postcss.config.js     # Configuración de PostCSS (para Tailwind)
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración principal de TypeScript
├── tsconfig.app.json     # Configuración de TypeScript específica para la aplicación
├── tsconfig.node.json    # Configuración de TypeScript para el entorno Node.js (ej. Vite config)
└── vite.config.ts        # Configuración de Vite
```

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### Pre-requisitos

*   Node.js (versión 18.x o superior recomendada)
*   npm (generalmente viene con Node.js) o yarn
*   Docker (si deseas ejecutar la aplicación en un contenedor)

### Instalación

1.  **Clona el repositorio (si aún no lo has hecho):**
    ```bash
    git clone <URL_DEL_REPOSITORIO_EN_GITHUB>
    cd app-sorteo
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```
    o si usas yarn:
    ```bash
    yarn install
    ```

### Ejecutar la Aplicación

#### Opción 1: Desarrollo Local con Vite

1.  **Inicia el servidor de desarrollo:**
    ```powershell
    npm run dev
    ```
    o si usas yarn:
    ```powershell
    yarn dev
    ```
2.  Abre tu navegador y ve a `http://localhost:5173` (o la URL que indique Vite en tu terminal).

#### Opción 2: Ejecutar con Docker

1.  **Asegúrate de tener Docker instalado y en ejecución.**
2.  **Construye la imagen de Docker:**
    Desde la raíz del proyecto (`\app-sorteo`), ejecuta:
    ```powershell
    docker build -t app-sorteo-react .
    ```
3.  **Ejecuta el contenedor Docker:**
    ```powershell
    docker run -d -p 8080:80 --name mi-app-sorteo app-sorteo-react
    ```
4.  Abre tu navegador y ve a `http://localhost:8080`.

## 📜 Scripts Disponibles

En el archivo `package.json`, encontrarás varios scripts útiles:

*   `npm run dev`: Inicia la aplicación en modo desarrollo con hot-reloading.
*   `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
*   `npm run preview`: Sirve la build de producción localmente para previsualizarla.

## 🐳 Comandos Útiles de Docker

*   **Ver contenedores en ejecución:** `docker ps`
*   **Ver todos los contenedores:** `docker ps -a`
*   **Ver logs de un contenedor:** `docker logs mi-app-sorteo` (o `docker logs -f mi-app-sorteo` para seguir en tiempo real)
*   **Detener un contenedor:** `docker stop mi-app-sorteo`
*   **Iniciar un contenedor detenido:** `docker start mi-app-sorteo`
*   **Eliminar un contenedor (debe estar detenido):** `docker rm mi-app-sorteo`
*   **Ver imágenes Docker locales:** `docker images`
*   **Eliminar una imagen Docker:** `docker rmi app-sorteo-react` (asegúrate que ningún contenedor la use)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar esta aplicación, por favor:
1.  Haz un Fork del proyecto.
2.  Crea una nueva rama (`git checkout -b feature/AmazingFeature`).
3.  Realiza tus cambios y haz commit (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---

¡Gracias por usar la App Sorteos! Esperamos que te sea de gran utilidad. 😊
