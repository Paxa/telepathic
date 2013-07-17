var Game = new Class({
  containerCss: 'body > .screen.game',

  correctCount: 0,
  wrongCount: 0,

  pictures: [
    'durian.jpg',
    'grapes.jpg',
    'green_banana.jpg',
    'guava.jpg',
    'jackfruit.jpg',
    'jeruk.jpg',
    'mangga.jpg',
    'manggis.jpg',
    'rambutan.png',
    'salak.jpg',
    'strawberry.jpg',
    'watermelon.jpg'
  ],

  initialize: function () {
    Game.instance = this;
    this.windowHeight = $(window).size().y;
    this.portrait = $(window).size().y > $(window).size().x;

    this.pictureHeight = this.windowHeight * 0.72 / (this.pictures.length / (this.portrait ? 3 : 4)).ceil() - this.windowHeight * 0.03;
    this.element = $$(this.containerCss).first();

    if (this.portrait) {
      this.element.addClass('portrait');
    }

    var picHolders = this.pictures.map(function(pic) {
      return ['div.picture', {style: "height: " + this.pictureHeight + 'px'}, ['img', {src: 'fruits/' + pic}]];
    }.bind(this));

    picHolders.unshift('div.pictures$pictures');
    var tree = [
      'div$gameWrapper',
        picHolders,
        ['div.buttons$buttons.disabled',
          ['a.correct$correct', 'Yes'],
          ['a.wrong$wrong', 'No'],
          ['span.score$score', ['span$correctCount.correct-count'], ['span$totalCount.total-count'],]
          //['a.skip', 'Skip']
        ]
    ];

    this.tree = DOMinate(tree);
    this.element.append(this.tree.gameWrapper);

    $(this.tree.pictures).children().forEach(function(pic) {
      pic.on('click', function(event) {
        this.chooseImage(pic, event);
      }.bind(this));
    }.bind(this));

    $(this.tree.correct).onClick(this.markCorrect.bind(this));
    $(this.tree.wrong).onClick(this.markWrong.bind(this));
  },

  chooseImage: function(picture, event) {
    if (this.currentPicture) return false;
    this.currentPicture = picture;
    $(picture).addClass('choosen');
    this.enableButtons();
  },

  disselect: function () {
    if (this.currentPicture) this.currentPicture.removeClass('choosen');
    this.currentPicture = null;
  },

  markCorrect: function () {
    this.correctCount += 1;
    this.disselect();
    this.disableButtons();
    this.recalculateScore();
  },

  markWrong: function () {
    this.wrongCount += 1;
    this.disselect();
    this.disableButtons();
    this.recalculateScore();
  },

  recalculateScore: function() {
    this.tree.correctCount.innerHTML = this.correctCount;
    this.tree.totalCount.innerHTML = ' / ' + (this.correctCount + this.wrongCount);
  },

  enableButtons: function() {
    $(this.tree.buttons).removeClass('disabled');
  },

  disableButtons: function() {
    $(this.tree.buttons).addClass('disabled');
  }
});

