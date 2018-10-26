import {Circle, Fill, Stroke, Style} from 'ol/style.js';

export const controlPointStyle = new Style({
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

export const firstControlPointStyle = controlPointStyle;

export const lastControlPointStyle = controlPointStyle;

export const trackLineStyle = new Style({
  stroke: new Stroke({
    color: '#f00',
    width: 6
  })
});

export const trackLineModifyingStyle = new Style({
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
          return firstControlPointStyle;
        case 'last':
          return lastControlPointStyle;
        default:
          return controlPointStyle;
      }
    case 'segment':
      switch (subtype) {
        case 'modifying':
          return trackLineModifyingStyle;
        default:
          return trackLineStyle;
      }
    default:
      return null;
  }
}

export function trackLayerStyleFunction(feature: (ol.Feature | ol.render.Feature), _: number): Style {
  return styleFromType(feature.get('type'), feature.get('subtype'));
}

export const importedLineStyle = new Style({
  stroke: new Stroke({
    color: '#75a0ff',
    width: 6
  })
});

export function importLayerStyleFunction(feature: (ol.Feature | ol.render.Feature), _: number): Style {
  const type = feature.getGeometry().getType();
  switch (type) {
    case 'LineString':
    case 'MultiLineString':
      return importedLineStyle;
    default:
      return null;
  }
}
