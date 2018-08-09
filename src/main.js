import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import EditorState from './states/Editor.js'
import config from './config'

/*
- Sprites nos bones
- Adicionar mais joints
    - Context Menu
*/
Phaser.Game.prototype.showDebugHeader = function(){}

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight-50;

    window.getState = () => {
      return window.game.state.states[window.game.state.current];
    }

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Editor', EditorState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    onDeviceReady: function () {
      this.receivedEvent('deviceready');
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
