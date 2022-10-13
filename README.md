# CPRT Rover Web Interface
Web interface for monitoring rover systems and issuing commands

Install [Docker](https://docs.docker.com/engine/install/) and [Docker-Compose](https://docs.docker.com/compose/install/) before proceeding.

## Development
Run `docker-compose up -d`. This will launch a docker container running the web app and will reflect changes made to the local files. Access the web interface at `http://localhost:3000`.

## Production
For production use, run `docker-compose -f docker-compose.prod.yaml up -f`. The app is still available at `http://localhost:3000` but local changes will not be reflected.