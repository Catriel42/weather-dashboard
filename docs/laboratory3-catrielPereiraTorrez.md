# Web Development — Laboratory 3: Weather Dashboard

**Estudiante:** Catriel Pereira Torrez
**Institución:** Jala University
**Materia:** Web Development
**Documento:** Laboratorio Semana 3
**Fecha:** 20 de septiembre, 2026

## Análisis de la API

Inicio el proyecto creando la estructura base de la aplicación.

Voy a consumir la API de [OpenWeatherMap](https://openweathermap.org/). Para ello, analicé la respuesta de dos endpoints principales.

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

Al revisar los requisitos de la tarea, noté que se pide una búsqueda interactiva realizada por el usuario. Para esto usaré el endpoint de geocodificación para buscar por nombre de ciudad.

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

Creé funciones que retornen TSX. Las importé y declaré en el componente App:

```typescript
import './App.css'
import { WeatherDashboard } from './components/WeatherDashboard'

export const App = () => {
  return <WeatherDashboard />
}
```

Para permitir la búsqueda del usuario, creé los componentes SearchBar y ResultCard:

```typescript
export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search />
      <input
        type="text"
        id="search"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}
```

## Diseño e Interfaz de Usuario

Instalé la librería lucide-react para la iconografía del proyecto:

```bash
npm install lucide-react
```

Para manejar el cambio entre modo claro y oscuro, implementé el uso de Variables CSS en el archivo principal. Modifiqué todos los componentes para que consuman estas variables en lugar de colores estáticos:

```css
:root {
  --bg: #f5f5f5;
  --surface: #ffffff;
  --border: #e5e7eb;
  --text: #111827;
  --muted: #6b7280;
}

.dark {
  --bg: #111827;
  --surface: #1f2937;
  --border: #374151;
  --text: #f9fafb;
  --muted: #9ca3af;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
}
```

Además, apliqué buenas prácticas de CSS:

- Añadí un reset global para el modelo de caja.
- Usé unidades relativas rem en lugar de px absolutos.
- Implementé un Grid responsivo usando media queries para dispositivos móviles.
- Diseñé botones interactivos para la búsqueda y el cambio de tema.
- Extraje el mensaje de inicio a un componente EmptyState.

## Arquitectura de Servicios

Decidí separar la lógica de peticiones HTTP en una capa de servicios independiente.
Creé el archivo `weatherService.ts`, el que se encarga exclusivamente de hacer las peticiones a la API de OpenWeather y manejar los posibles errores de red:

```typescript
const API_KEY = '54763932f62e7948dce4e505f2d36571'
const BASE_URL_GEO = 'https://api.openweathermap.org/geo/1.0'
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5'

export const searchCities = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL_GEO}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Problem during fetch:', error)
    return []
  }
}

export const getCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL_WEATHER}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during fetch:', error)
    return null
  }
}
```

## Tipado y Manejo de Estado

Para asegurar la solidez del código, creé interfaces de TypeScript en `src/types/weather.ts` basándome en las respuestas JSON de la API:

```typescript
export interface City {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  name: string
}
```

Para conectar la barra de búsqueda con las tarjetas de clima, apliqué el concepto de Lifting State Up. El estado global vive en el componente padre `WeatherDashboard.tsx`:

- Uso de `useState` para manejar los resultados de las ciudades y la data final del clima.
- Uso de `useEffect` para reaccionar cuando el usuario selecciona una ciudad y disparar automáticamente la petición a la API del clima.
- Los componentes hijos ahora son componentes presentacionales que únicamente reciben la información a través de props.

```typescript
export const WeatherDashboard = () => {
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (!selectedLocation) return

    const fetchWeather = async () => {
      const data = await getCurrentWeather(
        selectedLocation.lat,
        selectedLocation.lon,
      )
      setWeatherData(data)
    }

    fetchWeather()
  }, [selectedLocation])

  const handleSearch = async (query: string) => {
    if (!query.trim()) return
    const results = await searchCities(query)
    setSearchResults(results)
  }

  const handleCitySelect = (city: City) => {
    setSelectedLocation(city)
    setSearchResults([])
  }

  return (
    <main className="weather-dashboard">
      <header className="dashboard-header">
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
          {searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map((city, index) => (
                <ResultCard
                  key={`${city.lat}-${city.lon}-${index}`}
                  city={city}
                  onSelect={handleCitySelect}
                />
              ))}
            </div>
          )}
        </div>
        <ThemeToggle />
      </header>

      {!weatherData ? (
        <EmptyState />
      ) : (
        <section className="weather-grid">
          <CurrentWeatherCard
            temp={weatherData.main.temp}
            condition={weatherData.weather[0].main}
            feelsLike={weatherData.main.feels_like}
          />
          {/* Tarjetas complementarias */}
        </section>
      )}
    </main>
  )
}
```

## Refactor a function expression

Ahora, con todo terminado, me dispongo a mejorar el código.
Primero, declaré todos los function component como funciones explícitas y luego exporto estas mediante el export default. Está bien, pero quiero acoplarme al estándar de usar arrow functions y exportar mediante export únicamente, eso me hará exportar usando llaves en lugar de exportaciones por defecto, le llaman named exports, que me parece mejor:

```typescript
interface CurrentWeatherCardProps {
  temp: number
  condition: string
  feelsLike: number
}

export const CurrentWeatherCard = ({
  temp,
  condition,
  feelsLike,
}: CurrentWeatherCardProps) => {
  return (
    <article className="current-weather-card">
      <div className="current-weather-header">
        <span>Current Weather</span>
        <CloudRain />
      </div>
      <div className="current-weather-main">
        <strong>{Math.round(temp)}°C</strong>
        <span>{condition}</span>
      </div>
      <div className="feels-like">
        <Thermometer size={18} />
        <span>Feels like {Math.round(feelsLike)}°C</span>
      </div>
    </article>
  )
}
```

## Folders de cada componente y uso del barrel index

Refactoricé cada componente en su respectiva carpeta, agregando un `index.tsx` para usar barrel exports:

```typescript
// src/components/CurrentWeatherCard/index.tsx
export * from './CurrentWeatherCard'
```

Esto permite mantener imports limpios y centralizados en el resto de la aplicación:

```typescript
import { CurrentWeatherCard } from '../CurrentWeatherCard'
import { LocationCard } from '../LocationCard'
import { WeatherDetails } from '../WeatherDetails'
```

## Paso adicional: Eslint y Prettier para el formateo del code

Siempre me dio curiosidad cómo sucede esto y cómo trabajan con esto los equipos. Configuré los archivos necesarios para que Prettier y ESLint trabajen juntos, y también configuré comandos útiles en el `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "preview": "vite preview"
}
```

Luego de eso corrí el linter y el format y me formatearon todo, quedó prolijo.

## Infraestructura y Despliegue en AWS (CDK)

Esta parte de aquí es meramente personal y pensé en no agregarla en el reporte de mi lab, pero la agrego de todas formas.

Decidí construir mi propia infraestructura en la nube de AWS, para practicar, utilizando **Infraestructura como Código (IaC)** a través del AWS Cloud Development Kit (CDK).

Creé un subproyecto independiente en la carpeta `infra/`.

- **Amazon S3**: Utilicé un bucket de S3 totalmente privado para almacenar mi aplicación React compilada (`dist/`).
- **Amazon CloudFront**: Configuré una red de distribución global (CDN) frente a S3 usando el moderno estándar de seguridad OAC (Origin Access Control). Esto garantiza que los usuarios descarguen los archivos desde servidores cercanos a ellos en milisegundos.
- **Ruteo de React (SPA)**: Configuré CloudFront para que intercepte los errores 404/403 y devuelva el `index.html` con un código 200. Esto permite que React Router maneje las URLs sin romper la aplicación al recargar la página.
- **Automatización de Despliegues**: Implementé `BucketDeployment`, un constructo que, al ejecutar `cdk deploy`, toma mi carpeta local `dist/`, la comprime, la sube automáticamente al bucket y limpia la memoria caché de CloudFront para que los usuarios reciban la última actualización al instante.

Todo esto está definido mediante TypeScript en el archivo `infra-stack.ts`:

```typescript
import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'

export class WeatherFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const websiteBucket = new s3.Bucket(this, 'WeatherAppBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    const distribution = new cloudfront.Distribution(this, 'WeatherAppDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        { httpStatus: 404, responsePagePath: '/index.html', responseHttpStatus: 200 },
        { httpStatus: 403, responsePagePath: '/index.html', responseHttpStatus: 200 }
      ],
    })

    new s3deploy.BucketDeployment(this, 'DeployWeatherApp', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
    })

    new cdk.CfnOutput(this, 'DomainURL', {
      value: distribution.distributionDomainName,
    })
  }
}
```

Esto me permite replicar, versionar y destruir esta arquitectura exacta en cualquier cuenta de AWS.

Puedes usar la web final desplegada en AWS aquí:  
<https://dnr3v5hngcmwc.cloudfront.net>

Como no tenemos repositorios para la materia, estoy subiendo todo esto a mi github personal:  
<https://github.com/Catriel42/weather-dashboard>
