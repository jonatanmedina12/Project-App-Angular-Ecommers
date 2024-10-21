# Aplicación de Comercio Electrónico
Esta es una aplicación Angular 16 que interactúa con un backend desarrollado en Spring Boot para gestionar una plataforma de comercio electrónico.
# Estructura del Proyecto
El proyecto sigue una estructura modular con los siguientes directorios:
 ```
ecommerce-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login
│   │   │   ├── register
│   │   │   ├── products
│   │   │   ├── inventory
│   │   │   ├── orders
│   │   │   │   ├── active-products
│   │   │   │   ├── top-sales
│   │   │   │   └── frequent-customers
│   │   │   └── search
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── jwt.interceptor.ts
│   │   ├── models/
│   │   │   ├── DetalleOrdenDTO.ts
│   │   │   ├── EstadisticasOrdenDTO.ts
│   │   │   ├── InventarioDTO.ts
│   │   │   ├── LoginRequest.ts
│   │   │   ├── LoginResponse.ts
│   │   │   ├── OrdenDTO.ts
│   │   │   ├── ProductoDTO.ts
│   │   │   └── UsuarioDTO.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── inventory.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── product.service.ts
│   │   │   └── user.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── environments/
│   ├── styles/
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   └── test.ts
├── .gitignore
├── angular.json
├── package.json
└── tsconfig.json
 ```
# Explicación:

- src/app/components: Este directorio contiene los componentes principales de la aplicación, como el login, registro, gestión de productos, inventario, órdenes y reportes.
- src/app/guards: Este directorio contiene el archivo AuthGuard, que es responsable de proteger las rutas restringidas.
- src/app/interceptors: Este directorio contiene el archivo JwtInterceptor, que es responsable de agregar el token JWT a las solicitudes HTTP.
- src/app/models: Este directorio contiene los archivos de interfaz que corresponden a los DTOs proporcionados en el enunciado.
- src/app/services: Este directorio contiene los archivos de servicio que interactúan con los endpoints de la API de Spring Boot.
- src/app: Este directorio contiene los archivos principales de la aplicación Angular, como app.component.*, app.module.ts y app-routing.module.ts.
- src/assets: Este directorio contiene los recursos estáticos de la aplicación, como imágenes y fuentes.
- src/environments: Este directorio contiene los archivos de configuración de entorno.
- src/styles: Este directorio contiene los estilos globales de la aplicación.
- Archivos de configuración: angular.json, package.json, tsconfig.json y otros, que definen la configuración del proyecto Angular.
# Comenzando

Clona el repositorio:
 ```
Copy git clone https://github.com/jonatanmedina12/Project-App-Angular-Ecommers.git
 ```
Navega al directorio del proyecto:
 ```
Copy cd ecommerce-app
 ```
Instala las dependencias:
 ```
Copy npm install
 ```
Crea un archivo .env en el directorio raíz del proyecto y agrega lo siguiente:
 ```
Copy ANGULAR_APP_API_URL=http://localhost:8080/api
 ```
Inicia el servidor de desarrollo:
 ```
Copy ng serve
 ```
La aplicación ahora se está ejecutando en http://localhost:4200.

# Dependencias
El proyecto utiliza las siguientes dependencias principales:

- Angular 16
- Angular Material
- RxJS
- Dotenv

# VIDEO

-https://youtu.be/iZeokLvRZbU

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.