# Documentacion

## GIT HUB

**Crear** rama:
```bash
$ git branch [nombre_rama] 
```

**Mostrar** ramas existentes. También nos indica en qué estamos
```bash
$ git branch
```

**Elegir** rama 'nomnbre_rama':
```bash
$ git checkout [nombre_rama]
```

**Muestrar** **logs** de commits:
```bash
$ git log --oneline
```

Para ralizar **merge** de las ramas, primero hay que estar en la rama **MASTER** y luego hacel el merge:
```bash
$ git checkout master
$ git merge [nombre_rama]
$ git push
```

**Eliminar** rama:
```bash
git branch -d [nombre_rama]
```

Configuración del usuario para que no nos lo pida cada  vez que hacemos commit.
```bash
$ git config --global user.name "nombre_usuario"
$ git config --global user.email usuario@mail.com
```
Si al hacer el COMMIT nos dice que ya teniamos un usuario, lo podemos volver a indicarselo:
```bash
$ git config --global user.name "nombre_usuario"
$ git config --global user.email usuario@mail.com
$ git commit --amend --reset-author
```

## List & List Item
Chat:
https://quasar.dev/vue-components/list-and-list-items#Introduction

# Front-end de la herramienta Delicius Garden. (quasar_app)

Front-end de la herramienta Delicius Garden.

## Install the dependencies
```bash
$ npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
$ quasar dev
```

### Lint the files
```bash
$ npm run lint
```

### Build the app for production
```bash
$ quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


## SSR
No cambie los nombres de estos dos archivos. Sin embargo, puede agregar cualquier archivo adicional que pueda necesitar. Solo tenga en cuenta que si desea una configuración común del servidor web Node para producción y desarrollo, debe agregarlo al archivo /src-ssr/extension.js.

Cuando /src-ssr/extension.js es utilizado por el servidor de desarrollo, se supone que la configuración está lista para ser utilizada por un servidor Express. Así que planifique en consecuencia. Si cambia a otro servidor, es posible que desee desacoplar extension.js del servidor de producción (index.js).