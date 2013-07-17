var App = {
  init: function () {
    this.screens = $$('body > .screen');
  },

  startGame: function() {
    this.showScreen('game');
    new Game;
  },

  showScreen: function(name) {
    var choosen = $$('body > .screen.' + name)[0];
    this.screens.forEach(function(screen) {
      if (screen._ == choosen._) {
        $(screen).setStyle('display', 'block');
      } else {
        $(screen).setStyle('display', 'none');
      }
    });
  }
};

$(document).on('ready', function() {
  App.init();
});