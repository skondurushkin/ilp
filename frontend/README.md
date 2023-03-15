# ILP Frontend

Frontend for the Internal Loyality Program (IT1 Hackathon)

## Build with Docker

```
docker build -t ilp-frontend .
```

## Run with Docker

```
docker run --rm --name ilp-frontend -e VITE_ILP_BACKEND_ENDPOINT='http://ilp-backend-endpoint' ilp-frontend
```

The container exposes port 80. To override it use option `-p`, for example, `-p 3000:80`.

There are the following environment variables:

| Variable                    | Required     | Default value           | Description               |
| --------------------------- | ------------ | ----------------------- | ------------------------- |
| `VITE_ILP_BACKEND_ENDPOINT` | **Required** | `http://localhost:8191` | An url to the ILP backend |

## Development

```
yarn install

# run in the dev mode
yarn dev

# production build
yarn build
```
