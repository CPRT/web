# CPRT Rover Web Interface
Web interface for monitoring rover systems and issuing commands

Install [Docker](https://docs.docker.com/engine/install/) and [Docker-Compose](https://docs.docker.com/compose/install/) before proceeding.

## Development
Run `docker-compose up -d`. This will launch a docker container running the web app and will reflect changes made to the local files. Access the web interface at `http://localhost:3000`.

## Production
For production use, run `docker-compose -f docker-compose.prod.yaml up -f`. The app is still available at `http://localhost:3000` but local changes will not be reflected.

# Map Tiles
## Generating XYZ Tilesets
1. Install [QGIS](https://qgis.org/en/site/)
2. Under the 'XYZ Tiles' tab add a new source for Google Maps Satellite data using the url `http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
3. Locate the area that you wish to capture on the map
4. Open the 'Processing Toolbox' and open the 'Generate XYZ tiles (Directory)' diaglog (under the 'Raster Tools' tab)
5. Set the map extend to the current canvas extent, set the minimum zoom to 12 and the maximum zoom to 18
6. Select the `tiles/` directory as the destination and click 'Run'