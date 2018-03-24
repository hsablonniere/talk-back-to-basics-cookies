'use strict';

export default function configurePlugin () {

  return function initPlugin (deck) {

    const metas = {};
    Array.from(document.querySelectorAll('head meta[name]')).forEach((meta) => {
      metas[meta.getAttribute('name')] = meta.getAttribute('content');
    });

    const steps = deck.slides.map((slide, slideIdx) => {
      return {
        cursor: String(slideIdx),
        states: [],
        notes: '',
      };
    });

    const details = {
      title: document.title || '',
      metas,
      steps,
    };

    window.addEventListener('message', ({ source, data: { command, commandArgs } }) => {
      if (command === 'get-slide-deck-details') {
        return source.postMessage({ event: 'slide-deck-details', eventData: { details } }, '*');
      }
      if (command === 'go-to-step') {
        const { cursor } = commandArgs;
        return deck.slide(Number(cursor));
      }
      console.debug(`unknown protocol command ${command} with args`, commandArgs);
    });
  };
}
