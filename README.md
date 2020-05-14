# Documentacion

## List & List Item
Chat:
https://quasar.dev/vue-components/list-and-list-items#Introduction

# Front-end de la herramienta Delicius Garden. (quasar_app)

Front-end de la herramienta Delicius Garden.

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


## SSR
No cambie los nombres de estos dos archivos. Sin embargo, puede agregar cualquier archivo adicional que pueda necesitar. Solo tenga en cuenta que si desea una configuración común del servidor web Node para producción y desarrollo, debe agregarlo al archivo /src-ssr/extension.js.

Cuando /src-ssr/extension.js es utilizado por el servidor de desarrollo, se supone que la configuración está lista para ser utilizada por un servidor Express. Así que planifique en consecuencia. Si cambia a otro servidor, es posible que desee desacoplar extension.js del servidor de producción (index.js).

## GIT HUB
Crear rama nueva:
```bash
// Crea la rama 'nombre_rama'
git branch [nombre_rama] 

// Muestra las ramas existentes y en la que estamos
git branch

// Elige la rama 'nomnbre_rama'
git checkout [nombre_rama]

// Muestra los logs de commits
git log --oneline
```