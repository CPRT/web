module.exports = function override(config, env) {
  config.resolve.alias["mapbox-gl"] = "maplibre-gl"; // Override mapbox-gl with maplibre library
  return config;
};
