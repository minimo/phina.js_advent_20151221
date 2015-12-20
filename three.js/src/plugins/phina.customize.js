phina.namespace(function() {

  //ThreeLayerのaddChildを変更
  phina.display.ThreeLayer.prototype.addChild = function(child) {
    //GLBoostObject追加
    if (child.threeObject) {
        this.scene.add(child.threeObject);
    }

    //通常のaddChild
    return this.superClass.prototype.addChild.apply(this, arguments);
  }

  //アセットローダー追加
  phina.asset.AssetLoader.assetLoadFunctions['mqo'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
  phina.asset.AssetLoader.assetLoadFunctions['threeJSON'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
  phina.asset.AssetLoader.assetLoadFunctions['vox'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
  phina.asset.AssetLoader.assetLoadFunctions['mmd'] = function(key, path) {
    var mmd = phina.asset.MMD();
    var flow = mmd.load(path);
    return flow;
  }
});

