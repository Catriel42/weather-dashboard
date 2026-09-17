# Weather Dashboard

Inicio el proyecto con el commit: 936444c40f744ddb130810ff0ec4c74147ff26cc creando la estructura del proyecto

Voy a consumir la API <https://openweathermap.org/>
Para eso analizando la respuesta del endpoint de temperatura actual:

Endpoint y example:
<https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API_key}>

``` json
{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}
```

Podría crear varios componentes viendo esta respuesta de la API, pero primero comenzaré con 5:

´´´ bash
src/
├── components/
│   ├── WeatherDashboard.tsx
│   ├── LocationCard.tsx
│   ├── CurrentWeatherCard.tsx
│   ├── WeatherDetails.tsx
│   └── SunTimesCard.tsx
´´´

Crearé cinco funciones que retornen TSX, por ahora solo etiquetas que retornen texto.
Tambien voy a importarlas y declararlas en el TSX de App

Todos estos cambios pertenecen al commit: 49a8faefc73e8b7bcd80b93b2eb836413bb04656

Me di cuenta que en la tarea piden una busqueda del usuario, usare el endpoint de busqueda por ciudad

Endpoint y example
<https://api.openweathermap.org/geo/1.0/direct?q=cochabamba&limit=10&appid=$API_KEY>

```json
{
    "name": "Cochabamba",
    "lat": -17.401245799999998,
    "lon": -66.16756808852,
    "country": "BO",
    "state": "Cochabamba"
  },
  {
    "name": "Cochabamba",
    "local_names": {
      "ay": "Quchapampa",
      "de": "Cochabamba",
      "fr": "Cochabamba",
      "qu": "Quchapampa",
      "pt": "Cochabamba",
      "ru": "Кочабамба",
      "en": "Cochabamba",
      "it": "Cochabamba"
    },
    "lat": -17.3936114,
    "lon": -66.1568983,
    "country": "BO",
    "state": "Cochabamba"
  },
  {
    "name": "Cochabamba",
    "lat": -9.4948049,
    "lon": -77.8595159,
    "country": "PE",
    "state": "Ancash"
  },
  {
    "name": "Cochabamba",
    "lat": -12.2079507,
    "lon": -74.54280320904041,
    "country": "PE",
    "state": "Huancavelica"
  },
  {
    "name": "Cochabamba",
    "lat": -6.474381,
    "lon": -78.8851926,
    "country": "PE",
    "state": "Cajamarca"
  }
```

Usare esto para que el usuario busque la ciudad y posteriormente renderizar los componentes, lo creo y lo agrego a mi structure

Crearé un search bar y un result card

commiteando estos cambios en: 2e3b0f44c9a6a64f52cd0da4f2abdaae0bb6d30e

Ahora si, voy a comenzar con el disenio del dashboard y sus componentes

Vi que para algunos icons se puede usar lucide-react asi que instalo

``` bash
npm install lucide-react
```

Todos estos cambios visuales pertenecen a los commits: 501783b (estructura UI) y 618cc17 junto con 7f09f5c (mejoras de estilos y variables CSS).

## Mejoras en el Diseño y CSS

Para manejar el cambio entre modo claro y oscuro de manera eficiente, implementé el uso de Variables CSS en el `index.css`. Modifiqué todos los componentes para que consuman estas variables en lugar de colores hardcoded.

Además, apliqué buenas prácticas de CSS:

- Se añadió un reset global (`box-sizing: border-box`).
- Use rem en lugar de px para relative size
- Grid responsivo usando `@media queries` para dispositivos móviles.
- Se le dio estilos dedicados al botón de cambio de tema.

Estos cambios de arquitectura pertenecen al commit: fab7c56

## Creación de Servicios

Decidí separar la lógica de peticiones HTTP en una capa de servicios.
Creé el archivo `weatherService.ts`, el cual se encarga exclusivamente de hacer los `fetch` a la API de OpenWeather, tanto para buscar ciudades como para el clima actual y manejar los posibles errores de forma basic.

### Manejo del Estado

Para conectar la barra de búsqueda con las tarjetas de clima, apliqué el concepto de "Lifting State Up". El estado global vivirá en el componente padre (`WeatherDashboard.tsx`):

- `useState` para manejar el término de búsqueda, los resultados de ciudades y la data final del clima.
- `useEffect` para reaccionar cuando el usuario selecciona una ciudad y disparar la petición a la API del clima.
- Los componentes hijos, que son todas las cards ahora serán componentes presentacionales que solo recibirán la información a través de `props`.

