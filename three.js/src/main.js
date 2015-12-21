var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;

phina.define('MainScene', {
  superClass: 'phina.display.CanvasScene',

  init: function(options) {
    this.superInit();

    //Three.js用レイヤー
    var layer = this.layer = phina.display.ThreeLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);
    layer.renderer.setClearColor(0x000000);
    layer.scene.remove(layer.light);

    //カメラ位置の変更
    layer.camera.position.x = 0;
    layer.camera.position.y = 10;
    layer.camera.position.z = 15;

    //アンビエントライト（環境光）の追加
    var ambientLight = phina.three.AmbientLight(0xFFFFFF).addChildTo(layer);
    var camera = phina.three.Camera().addChildTo(layer);

    //３Dメッシュをレイヤーに追加
    var mesh = phina.three.Mesh('gradriel').addChildTo(layer);
    mesh.update = function() {
        //ぐるぐる
        this.rotation.y+=0.02;
    }

    //Tweenerが使える
    mesh.tweener.clear()
      .to({scaleY: 0.9}, 500, "easeOutSine")
      .to({scaleY: 1}, 500, "easeOutElastic")
      .setLoop(true);

    // 2Dスプライトも併用可能
    var hiyoko = phina.display.Sprite("hiyoko", 32, 32)
      .setScale(3)
      .setFrameIndex(0)
      .addChildTo(this)
      .on("enterframe", function() {
        this.x += this.vx * 10;
        this.y += this.vy * 10;
        if (this.x < 0 || SCREEN_WIDTH < this.x) this.vx *= -1;
        if (this.y < 0 || SCREEN_HEIGHT < this.y) this.vy *= -1;
        this.frameIndex = (this.frameIndex + 1) % 4;
        this.rotation += 2;
      });
    hiyoko.vx = 1;
    hiyoko.vy = 1;


    var label = phina.display.Label('phina.jsとThree.js\n連携テスト').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();
  },
});

phina.main(function() {
  var app = phina.game.GameApp({
    assets: {
      image: {
        'hiyoko': 'assets/hiyoco_nomal_full.png',
      },
      mqo: {
        'gradriel': 'https://rawgit.com/minimo/phina.js_advent_20151221/master/three.js/assets/gradriel_pose.mqo',
      },
      mmd: {
        'miku': {
            pmd: 'assets/pmd/miku_v2.pmd',
            vmd: 'assets/vmd/wavefile_v2.vmd',
        },
      },
    },
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });

  app.run();
});
