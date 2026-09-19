# Weather Dashboard

Inicio el proyecto creando la estructura del proyecto.

## Análisis de la API

Voy a consumir la API de [OpenWeatherMap](https://openweathermap.org/).
Para ello, analicé la respuesta de dos endpoints.

**Clima actual por coordenadas:**
`<https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API_key}>`

```json
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

Al revisar los requisitos de la tarea, noté que se pide una búsqueda realizada por el usuario. Para esto usaré el endpoint de búsqueda por ciudad.

**Búsqueda de ciudad por nombre:**
`<https://api.openweathermap.org/geo/1.0/direct?q=cochabamba&limit=10&appid=$API_KEY>`

```json
[
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
      "en": "Cochabamba"
    },
    "lat": -17.3936114,
    "lon": -66.1568983,
    "country": "BO",
    "state": "Cochabamba"
  }
]
```

## Estructura de Componentes

Podría crear varios componentes viendo esta respuesta de la API, pero primero comencé con un bloque base.

```text
src/
├── components/
│   ├── WeatherDashboard.tsx
│   ├── LocationCard.tsx
│   ├── CurrentWeatherCard.tsx
│   ├── WeatherDetails.tsx
│   └── SunTimesCard.tsx
```

Creé funciones que retornen TSX. Las importé y declaré en el componente App.

Para permitir la búsqueda del usuario, creé los componentes SearchBar y ResultCard.

## Diseño e Interfaz de Usuario

Instalé la librería lucide-react para la iconografía del proyecto.

```bash
npm install lucide-react
```

Para manejar el cambio entre modo claro y oscuro, implementé el uso de Variables CSS en el archivo principal. Modifiqué todos los componentes para que consuman estas variables en lugar de colores estáticos.

Además, apliqué buenas prácticas de CSS:

- Añadí un reset global para el modelo de caja.
- Usé unidades relativas rem en lugar de px absolutos.
- Implementé un Grid responsivo usando media queries para dispositivos móviles.
- Diseñé botones interactivos para la búsqueda y el cambio de tema.
- Extraje el mensaje de inicio a un componente EmptyState.

## Arquitectura de Servicios

Decidí separar la lógica de peticiones HTTP en una capa de servicios independiente.
Creé el archivo `weatherService.ts`, el que se encarga exclusivamente de hacer las peticiones a la API de OpenWeather y manejar los posibles errores de red.

## Tipado y Manejo de Estado

Para asegurar la solidez del código, creé interfaces de TypeScript en `src/types/weather.ts` basándome en las respuestas JSON de la API.

Para conectar la barra de búsqueda con las tarjetas de clima, apliqué el concepto de Lifting State Up. El estado global vive en el componente padre `WeatherDashboard.tsx`:

- Uso de `useState` para manejar los resultados de las ciudades y la data final del clima.
- Uso de `useEffect` para reaccionar cuando el usuario selecciona una ciudad y disparar automáticamente la petición a la API del clima.
- Los componentes hijos ahora son componentes presentacionales que únicamente reciben la información a través de props.

## Refactor a function expression

Ahora, con todo terminado, me dispongo a mejorar el codigo.
Primero, declaré todos los function component como funciones explicitas y luego exporto estas mediante el export default. Esta bien, pero quiero acoplarme al estandar de usar arrow functions y exportar mediante export unicamente, eso me hara exportar usando llaves en lugar de exportaciones explicitas, le llaman named exports, que me parece mejor.

## Folders de cada componente y uso del barrel index

Refactorice cada componente en su respectiva carpeta, agregando un index.tsx para usar barrel.

## Paso adicional: Eslint y Prettier para el formateo del code

Siempre me dio curiosidad como sucede esto y como trabajan con esto los equipos, configuré los archivos necesarios para que prettier y eslint trabajen junntos, y tambien configure algunos command utiles en el package.json

Luego de eso corrí el linter y el format y me formatearon todo, quedo lindo.
