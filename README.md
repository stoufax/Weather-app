# Weather App

## Project Setup

#### Environment Variables

All client-side variables need to be prefixed with `REACT_APP_`. So e.g. `API_BASE_URL` becomes `REACT_APP_API_BASE_URL`.

| Variable       | Required | Description                        | Examples                                                                   |
| -------------- | -------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `API_BASE_URL` | x        | Base URL of the openweathermap api | `http://api.openweathermap.org/data/2.5/forecast?q=[city],de&APPID=[APPID] |

## Avaiable commands

- `yarn start`: start the app in dev mode
- `yarn build`: build production version
- `yarn test`: run tests
