GLBoost.TARGET_WEBGL_VERSION = 1;
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;

phina.define('MainScene', {
  superClass: 'phina.display.CanvasScene',

  init: function(options) {
    this.superInit();

    var layer = this.layer = phina.display.GLBoostLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    var lookat = {
      eye: new GLBoost.Vector4(0.0, 1.5, 10.0, 1),
      center: new GLBoost.Vector3(0.0, 1.5, 0.0),
      up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    };
    var perspective = {
      fovy: 45.0,
      aspect: 1.0,
      zNear: 0.1,
      zFar: 1000.0
    };
    var camera = phina.glboost.Camera(lookat, perspective).addChildTo(layer);

/*
    var obj = phina.asset.AssetManager.get("mqo", "gradriel");
    var mesh = obj.getMesh(layer.canvas);
    layer.scene.add(mesh[0]);
    layer.scene.prepareForRender();
*/
    var mesh = phina.glboost.Mesh('gradriel', layer.canvas);
    mesh.addChildTo(layer);

    this.createObject();
    layer.prepareForRender();

    layer.update = function() {
      var rotateMatrix = GLBoost.Matrix44.rotateY(-0.02);
      var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
      camera.eye = rotatedVector;
    };

    var label = phina.display.Label('phina.jsとGLBoostの\n夢の共演！').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();
  },

  createObject: function() {
    var material = new GLBoost.ClassicMaterial(this.layer.canvas);
    material.shader = new GLBoost.PhongShader(this.layer.canvas);

    var geometry = new GLBoost.Cube(
      new GLBoost.Vector3(20,20,20),
      new GLBoost.Vector4(Math.random()*1,Math.random()*1,Math.random()*1,1),
      this.layer.canvas);

    for (var i = 0; i < 2000; i ++) {
      var object = phina.glboost.Mesh({
        geometry: geometry,
        material: material
      });
      object.translate = new GLBoost.Vector3(Math.randint(0, 800) - 400, Math.randint(0, 800) - 400, Math.randint(0, 800) - 400);
      object.rotate = new GLBoost.Vector3(Math.randfloat(0, 2)*Math.PI, Math.randfloat(0, 2)*Math.PI, Math.randfloat(0, 2)*Math.PI);
      object.scale = new GLBoost.Vector3(Math.randfloat(0.5, 1.5), Math.randfloat(0.5, 1.5), Math.randfloat(0.5, 1.5));
      object.dirty = true;

      if (i%3 == 0) {
        object.tweener.clear()
          .to({scaleX: 3}, 500, "easeOutSine")
          .to({scaleX: 1}, 500, "easeOutElastic")
          .setLoop(true);
      }
      object.addChildTo(this.layer);
    }   
  },
});

phina.main(function() {
  var app = phina.game.GameApp({
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });

  app.run();
});
