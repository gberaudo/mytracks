import {Circle, Fill, Stroke, Style} from 'ol/style.js';

export const controlPoint = new Style({
  image: new Circle({
    radius: 4,
    fill: new Fill({
      color: '#fff'
    }),
    stroke: new Stroke({
      width: 2,
      color: 'rgba(255, 0, 0, 0.5)'
    })
  })
});

export const firstControlPoint = controlPoint;

export const lastControlPoint = controlPoint;

export const trackLine = new Style({
  stroke: new Stroke({
    color: '#f00',
    width: 6
  })
});

export const trackLineModifying = new Style({
  stroke: new Stroke({
    color: '#aaa',
    width: 3,
    lineDash: [0.5, 4]
  })
});


export function styleFromType(type: string, subtype: string): Style {
  switch (type) {
    case 'controlPoint':
      switch (subtype) {
        case 'first':
          return firstControlPoint;
        case 'last':
          return lastControlPoint;
        default:
          return controlPoint;
      }
    case 'segment':
      switch (subtype) {
        case 'modifying':
          return trackLineModifying;
        default:
          return trackLine;
      }
    default:
      return null;
  }
}

export function styleFunction(feature: (ol.Feature|ol.render.Feature), _: number): Style {
  return styleFromType(feature.get('type'), feature.get('subtype'));
}
