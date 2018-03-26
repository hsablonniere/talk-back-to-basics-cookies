'use strict';

export default function configurePlugin () {

  return function initPlugin (deck) {

    const sherlock = document.querySelector('#sherlock-sound');

    deck.on('toggle-slide-deck-state', ({ state, enabled }) => {
      document.body.classList.toggle(`state-${state}`, enabled);
      if (state === 'four') {
        if (enabled) {
          sherlock.play();
        }
        else {
          sherlock.pause();
          sherlock.currentTime = 0;
        }
      }
    });
  };
}
