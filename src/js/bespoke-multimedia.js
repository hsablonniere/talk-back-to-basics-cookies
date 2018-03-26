'use strict';

export default function configurePlugin () {

  return function initPlugin (deck) {

    deck.on('activate', ({ slide }) => {
      Array.from(slide.querySelectorAll('video'))
        .forEach((video) => video.play());
    });

    deck.on('deactivate', ({ slide }) => {
      Array.from(slide.querySelectorAll('video'))
        .forEach((video) => {
          video.pause();
          video.currentTime = 0;
        });
    });
  };
}
