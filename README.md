# Aplicación de Bienes Raíces

Aplicación de bienes raíces, en la cual se puede publicar bienes raíces para vender, y donde los usuarios pueden comunicarse con las personas que publican las propiedades.

## Ejecutar el proyecto

Para ejecutar el proyecto lo primero que se debe de hacer es instalar las dependencias:

```bash
npm install
```

Creamos la base de datos, utilizando `MySQL`

Configuramos las variables de entorno, copiando el archivo `.env.template` al archivo `.env` y configuramos, el puerto en el que queremos que se ejecute el servidor, la información de la base de datos (usuario, password, base de datos, puerto), configuramos nuestro servicio para envió de emails, en este caso para desarrollo se puede usar _Mailtrap_ y para producción se puede usar _GMail_ por ejemplo

Instalamos nodemon como dependencia del proyecto o instalación global:

```bash
npm i -g nodemon
```

Ejecutamos la aplicación con los comandos:

```bash
npm run dev # -> nodemon
npm run start # -> node
```

## Pendiente

- [ ] Menu hamburguesa.
- [ ] Modificar mi perfil
- [ ] Deployment, entre otras cosas.
- [ ] Cuando ingresa como usuario que no tiene propiedades, en la barra superior no muestra el botón de "Salir", sigue mostrando el login, si ya esta se logueo??
- [ ] Cuando ingresa como cliente, lo debería enviar directamente a la pagina principal donde esta el mapa con todas las propiedades y no a la pantalla del vendedor.
- [ ] El vendedor, se puede ir a la pantalla principal y se pierde el control de la navegación
