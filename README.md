# Descripción
Este programa consiste en el juego retro de Snake, donde una serpiente avanza por el mapa mientras aumenta su longitud cuando come. 

Su ambientación está inspirada en polémicas de celebridades y sus parejas o exparejas. Su fin consiste en generar distintos personajes donde cada uno de ellos tenga una ambientación de personajes y mapa diferentes. Esta aplicación está disponible para jugar en dispositivos como ordenadores de mesa, portátiles, tablets y teléfonos móviles.

Carácterísticas del Diseño:
- Está desarrollado con los frameworks React.DOM y TypeScript para JavaScript y HTML.
- Los diseños están creados y desarrollados con CSS de manera manual, no se usaron frameworks para este caso.
- Posee un diseño responsive para distintos tamaños de pantalla. El diseño tiene 3 tipos de tamaño, mayores de 636 px de alto, menores o iguales a 636px , menores o iguales a 515px y menores o iguales a 393px.
- El videojuego está disponible para dispositivos táctiles y teclados. 

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
