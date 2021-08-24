# Aplicación web para la administración de facturas

Este proyecto contiene la aplicacion web para la adminsitracion y pago de facturas

## Comenzando 

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

```
Para configurar el proyecto necesitas:

NodeJS > 12.0
Yarn
```

### Instalación 🔧
Ir a la raiz del proyecto

* Ejecutar el siquiente comando para instalar las dependencias
```
> yarn install
```

* Configurar las variables de entorno

```
REACT_APP_IVA_PERCENT = Porcentaje de iva para el calculo de impuestos
REACT_APP_API_BASE_URL = URL base de la API Gateway para la administracion de facturas (bill-backend)
```

* Ejecutar el siguiente comando para levantar el servicio en el puerto 3000
```
yarn start
```

## Construido con 🛠️

* [React](https://es.reactjs.org/docs/getting-started.html) - El framework web usado
* [Yarn](https://yarnpkg.com/) - Manejador de dependencias

## Autor ✒️

* **Andrés Duque** - [andres-duque](https://github.com/andres-duque)
