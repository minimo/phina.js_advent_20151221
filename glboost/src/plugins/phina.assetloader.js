phina.namespace(function() {
  phina.asset.AssetLoader.assetLoadFunctions['mqo'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
});
