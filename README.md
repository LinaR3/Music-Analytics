# 🎵 Music Analytics Dashboard (1921-2020)

Un dashboard web interactivo construido con React y Tailwind CSS que visualiza 100 años de datos musicales, basado en un análisis de datos sobre el "Spotify Dataset 1921-2020".

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web *full-stack* que analiza y visualiza la evolución de las características de la música durante el último siglo. El proceso se divide en dos fases:

1.  **Análisis de Datos (Backend/Notebook):** Utilizando el notebook `Database_music_analytics.ipynb`, se ingirió el dataset de Spotify de 170,000+ canciones. Se usaron **Pandas** y **Matplotlib** para limpiar, agrupar y analizar las tendencias en métricas clave como duración, energía, bailabilidad, sonoridad (loudness) y popularidad.
2.  **Visualización (Frontend):** Los hallazgos y datos agregados del notebook de Python se integraron manualmente en este dashboard de **React**. La aplicación presenta estos datos a través de gráficos interactivos, KPIs y un pequeño juego para descubrir la "década musical" del usuario.

## 🚀 Stack Tecnológico

* **Análisis de Datos:** Python, Pandas, Matplotlib (vía Google Colab)
* **Frontend:** React.js, Tailwind CSS
* **Visualización de Datos:** Recharts
* **Iconos:** Lucide React
* **Control de Versiones:** Git

## ✨ Características

* **Dashboard de KPIs:** Métricas clave del dataset completo (total de canciones, % explícito, duración promedio).
* **Gráficos Interactivos:** Visualizaciones de las tendencias de duración, sonoridad, bailabilidad y distribución de notas musicales (Key) a lo largo de las décadas.
* **Modo Oscuro y Claro:** Un interruptor de tema persistente que utiliza variables CSS y `localStorage`.
* **Juego "A Jugar":** Una página interactiva que compara las preferencias del usuario (bailabilidad, duración, energía) con los promedios reales de cada década para encontrar la mejor coincidencia.
* **Diseño Responsivo:** Totalmente adaptable a dispositivos móviles gracias a Tailwind CSS.
* **Tipografía Personalizada:** Utiliza "Red Hat Display" para el cuerpo de texto y "Rubik 80s Fade" para los títulos, cargadas desde Google Fonts.

## 📊 Análisis y Hallazgos

Los datos fueron extraídos del **Spotify Dataset 1921–2020** (creado por Yamac Eren Ay). Algunos de los hallazgos clave visualizados son:

* **La Guerra del Volumen:** Se observa un aumento drástico y constante en la sonoridad (loudness) promedio de la música desde -17dB en 1921 hasta -6.6dB en 2020.
* **Pico de Duración:** Las canciones alcanzaron su duración promedio más larga en la década de 1981-2000 (4.16 min) y han comenzado a acortarse en la era del streaming.
* **Auge de 'C' (Do):** La nota musical 'C' (Do) es la más frecuente en el dataset, apareciendo en más de 21,600 canciones (12.7%).
* **Contenido Explícito:** Aunque la mayoría de la música (91.5%) no es explícita, el contenido explícito (8.5%) muestra una clara tendencia al alza, especialmente después del 2000.

## 🛠️ Cómo Empezar

Para ejecutar este proyecto localmente:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
    cd Music-Analytics
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configura las fuentes:**
    Asegúrate de que tu archivo `tailwind.config.js` esté configurado para usar las fuentes personalizadas:
    ```javascript
    const defaultTheme = require('tailwindcss/defaultTheme');

    module.exports = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            'body': ['"Red Hat Display"', ...defaultTheme.fontFamily.sans],
            'title': ['"Rubik 80s Fade"', ...defaultTheme.fontFamily.sans],
          },
        },
      },
      // ...
    }
    ```
    Y que tu `public/index.html` importe las fuentes:
    ```html
    <link href="[https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500&family=Rubik+80s+Fade&display=swap](https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500&family=Rubik+80s+Fade&display=swap)" rel="stylesheet">
    ```

4.  **Ejecuta la aplicación:**
    ```bash
    npm start
    # o
    yarn start
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 👥 Autores

Este proyecto fue desarrollado por el dúo:

* **Jacobo:** 👾
* **Lina:**  💅🏼