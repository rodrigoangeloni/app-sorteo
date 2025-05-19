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

## 🛠️ Tecnologías Utilizadas

*   **React:** Biblioteca para construir interfaces de usuario.
*   **TypeScript:** Superset de JavaScript que añade tipado estático.
*   **Vite:** Herramienta de frontend moderna y rápida.
*   **Tailwind CSS:** Framework CSS de utilidad primero para un diseño rápido.
*   **React Router DOM:** Para la gestión de rutas en la aplicación.
*   **Lucide Icons:** Iconos SVG ligeros y personalizables.
*   **Canvas Confetti:** Para celebrar la selección de ganadores. 🎉

## 📁 Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar el mantenimiento y la escalabilidad:

```
app-sorteo/
├── public/               # Archivos estáticos
├── src/
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
├── .eslintrc.cjs         # Configuración de ESLint
├── .gitignore            # Archivos ignorados por Git
├── index.html            # Plantilla HTML principal
├── package.json          # Dependencias y scripts del proyecto
├── postcss.config.js     # Configuración de PostCSS (para Tailwind)
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración principal de TypeScript
├── tsconfig.node.json    # Configuración de TypeScript para Node
└── vite.config.ts        # Configuración de Vite
```

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### Pre-requisitos

*   Node.js (versión 18.x o superior recomendada)
*   npm (generalmente viene con Node.js) o yarn

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

1.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    o si usas yarn:
    ```bash
    yarn dev
    ```
2.  Abre tu navegador y ve a `http://localhost:5173` (o la URL que indique Vite en tu terminal).

## 📜 Scripts Disponibles

En el archivo `package.json`, encontrarás varios scripts útiles:

*   `npm run dev`: Inicia la aplicación en modo desarrollo con hot-reloading.
*   `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
*   `npm run preview`: Sirve la build de producción localmente para previsualizarla.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar esta aplicación, por favor:
1.  Haz un Fork del proyecto.
2.  Crea una nueva rama (`git checkout -b feature/AmazingFeature`).
3.  Realiza tus cambios y haz commit (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---

¡Gracias por usar la App Sorteos! Esperamos que te sea de gran utilidad. 😊
