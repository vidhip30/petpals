# PetPal P3

Group repository for CSC309 P3

## Setup

Follow these steps to install the project dependencies.

### Frontend

Install nvm.

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Install npm.

```shell
nvm install --lts
nvm use --lts
```

Install the frontend dependencies.

```shell
cd ./frontend
npm ci
```

### Backend

Run the start-up script.

```shell
source startup.sh
```

### Misc

Pre-commit hooks for code formatting.

```shell
pip install pre-commit
pre-commit install
```

## Running

Assuming all dependencies are installed, the backend and frontend servers can be run now.

Backend:

```shell
source run.sh
```

Frontend:

```shell
cd ./frontend
npm start
```

## Docs

To see the API endpoint docs, visit (http://localhost:8000/swagger-ui/)

## Testing

TODO
