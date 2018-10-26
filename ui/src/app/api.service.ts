import { Injectable } from '@angular/core';
import { GeoJsonObject, GeoJsonTypes, FeatureCollection } from 'geojson';

export interface Track {
  id: number;
  name: string;
  geojson: GeoJsonObject;
  profile: string;
}

export interface TrackListItem {
  id: number;
  name: string;
}

const rochersNayeGeojson = {
  'type': <GeoJsonTypes> 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776899.1715242193,
          5849819.331360028
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'subtype': 'first',
        'snapped': true,
        'index': 0
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          778072.256318199,
          5850872.638866147
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 1
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          777449.31244772,
          5850786.541067244
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 2
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776979.2102380998,
          5850298.723288643
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 3
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776769.0390394821,
          5850102.796141601
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 4
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776570.4450679069,
          5849818.200749545
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 5
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776664.3987181364,
          5849902.996938655
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 6
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776786.7388385182,
          5849953.713525935
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 7
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          776894.6074250969,
          5849824.015319283
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'subtype': 'last',
        'snapped': true,
        'index': 8
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            776899.1715242193,
            5849819.331360028
          ],
          [
            776916.6486842739,
            5849801.241609747
          ],
          [
            776956.5010619779,
            5849829.345344923
          ],
          [
            777013.3853217735,
            5849850.342447002
          ],
          [
            777035.649219932,
            5849856.157037974
          ],
          [
            777104.11070677,
            5849849.050316196
          ],
          [
            777120.697310898,
            5849856.318554442
          ],
          [
            777135.280164192,
            5849874.085384312
          ],
          [
            777134.3896082656,
            5849886.522186552
          ],
          [
            777097.0975788499,
            5849996.515968688
          ],
          [
            777103.2201508436,
            5850008.145347575
          ],
          [
            777144.5196819277,
            5850019.936261303
          ],
          [
            777153.3139217006,
            5850031.565671132
          ],
          [
            777154.5384360992,
            5850092.943366441
          ],
          [
            777198.1756764902,
            5850123.955417341
          ],
          [
            777278.7709878247,
            5850226.683616337
          ],
          [
            777375.5076253238,
            5850300.661583938
          ],
          [
            777448.9784892475,
            5850371.248128287
          ],
          [
            777478.255515326,
            5850366.402352
          ],
          [
            777536.6982479926,
            5850390.954312676
          ],
          [
            777600.5956357078,
            5850369.471343334
          ],
          [
            777622.080297431,
            5850372.378809804
          ],
          [
            777641.2272498474,
            5850396.76926076
          ],
          [
            777640.6706523935,
            5850417.121609318
          ],
          [
            777663.3798285153,
            5850474.463796796
          ],
          [
            777699.7813020047,
            5850522.276159832
          ],
          [
            777755.3297279106,
            5850541.336566154
          ],
          [
            777852.6229628638,
            5850660.22274392
          ],
          [
            777987.5421857054,
            5850800.594496602
          ],
          [
            778099.5295934434,
            5850858.908391487
          ],
          [
            778077.5996537571,
            5850862.623694283
          ],
          [
            778090.2900757075,
            5850878.777202917
          ],
          [
            778072.256318199,
            5850872.638866147
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 0
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            778072.256318199,
            5850872.638866147
          ],
          [
            778090.2900757075,
            5850878.777202917
          ],
          [
            778090.9579926522,
            5850874.092682366
          ],
          [
            778077.5996537571,
            5850862.623694283
          ],
          [
            778098.8616764985,
            5850863.915973883
          ],
          [
            778099.5295934434,
            5850858.908391487
          ],
          [
            778077.8222927387,
            5850847.1163538825
          ],
          [
            778027.9511608632,
            5850833.062850245
          ],
          [
            777993.7760771897,
            5850817.394027815
          ],
          [
            777972.9593324113,
            5850818.201698392
          ],
          [
            777920.7504912294,
            5850802.694436255
          ],
          [
            777882.3452669056,
            5850802.371368582
          ],
          [
            777874.9981805134,
            5850797.525354946
          ],
          [
            777865.6473432867,
            5850801.725233278
          ],
          [
            777840.2664993859,
            5850799.948361433
          ],
          [
            777801.7499555714,
            5850787.187201438
          ],
          [
            777773.0295269466,
            5850788.96407071
          ],
          [
            777732.2865933164,
            5850779.595127686
          ],
          [
            777717.2584620593,
            5850785.571866047
          ],
          [
            777680.1890716251,
            5850782.341196157
          ],
          [
            777636.5518312341,
            5850789.2871378865
          ],
          [
            777572.5431240279,
            5850777.010593438
          ],
          [
            777507.0872634415,
            5850786.218000165
          ],
          [
            777466.1216908296,
            5850799.786827646
          ],
          [
            777455.657658695,
            5850798.171489943
          ],
          [
            777449.31244772,
            5850786.541067244
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 1
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            777449.31244772,
            5850786.541067244
          ],
          [
            777434.7295944259,
            5850766.995530382
          ],
          [
            777398.6620794089,
            5850744.703979335
          ],
          [
            777385.0811015321,
            5850722.089420012
          ],
          [
            777349.4588644783,
            5850701.574834324
          ],
          [
            777326.8610078472,
            5850677.183538744
          ],
          [
            777274.0955692113,
            5850635.670032162
          ],
          [
            777252.165629525,
            5850607.886783031
          ],
          [
            777225.0036737714,
            5850589.795412135
          ],
          [
            777212.2019323303,
            5850573.319374572
          ],
          [
            777192.943660423,
            5850559.104778706
          ],
          [
            777155.0950335531,
            5850513.553614773
          ],
          [
            777140.7348192409,
            5850505.80024865
          ],
          [
            777113.795502469,
            5850472.363935454
          ],
          [
            777090.1957704206,
            5850423.582682189
          ],
          [
            776979.3215575907,
            5850298.723288643
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 2
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            776979.2102380998,
            5850298.723288643
          ],
          [
            776950.8237679475,
            5850247.520142569
          ],
          [
            776853.7531719757,
            5850038.995579907
          ],
          [
            776824.6987848788,
            5850000.39242661
          ],
          [
            776788.519950371,
            5849972.611182546
          ],
          [
            776771.7107072611,
            5850109.903068236
          ],
          [
            776769.0390394821,
            5850102.796141601
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 3
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            776769.0390394821,
            5850102.796141601
          ],
          [
            776726.8489524715,
            5850009.760540301
          ],
          [
            776699.4643577364,
            5849999.100273781
          ],
          [
            776580.68646106,
            5849852.119127171
          ],
          [
            776570.4450679069,
            5849818.200749545
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 4
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            776570.4450679069,
            5849818.200749545
          ],
          [
            776597.4957041697,
            5849824.338351055
          ],
          [
            776637.3480818737,
            5849858.095235817
          ],
          [
            776664.3987181364,
            5849902.996938655
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 5
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            776664.3987181364,
            5849902.996938655
          ],
          [
            776662.7289257747,
            5849939.984484613
          ],
          [
            776697.460606902,
            5849945.3145804675
          ],
          [
            776717.2754762633,
            5849956.620855084
          ],
          [
            776788.519950371,
            5849972.611182546
          ],
          [
            776786.7388385182,
            5849953.713525935
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 6
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            776786.7388385182,
            5849953.713525935
          ],
          [
            776781.5068224509,
            5849847.758185579
          ],
          [
            776815.9045451061,
            5849869.078364994
          ],
          [
            776853.9758109575,
            5849874.569934716
          ],
          [
            776860.9889388774,
            5849858.741301858
          ],
          [
            776894.6074250969,
            5849824.015319283
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 7
      }
    }
  ]
};

const renensGeojson = {
  'type': <GeoJsonTypes> 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733484.5701148428,
          5867144.57349804
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'subtype': 'first',
        'snapped': true,
        'index': 0
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733686.6149906325,
          5866845.50884536
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 1
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733621.270449537,
          5866820.101765479
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 2
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733532.8827738471,
          5867030.481074203
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 3
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733426.6839796304,
          5866989.861292242
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 4
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733353.101796216,
          5867147.972018489
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 5
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733451.7308650587,
          5867219.017580295
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'snapped': true,
        'index': 6
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          733484.6814343336,
          5867144.411663766
        ]
      },
      'properties': {
        'type': 'controlPoint',
        'subtype': 'last',
        'snapped': true,
        'index': 7
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733484.5701148428,
            5867144.57349804
          ],
          [
            733539.8959017671,
            5867033.394053834
          ],
          [
            733566.7238990483,
            5867000.542172891
          ],
          [
            733594.7764107281,
            5866929.49837744
          ],
          [
            733606.4649572615,
            5866933.705966636
          ],
          [
            733634.1835104689,
            5866915.095491211
          ],
          [
            733676.2622779888,
            5866867.355756225
          ],
          [
            733686.6149906325,
            5866845.50884536
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 0
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733686.6149906325,
            5866845.50884536
          ],
          [
            733689.2866584116,
            5866840.330326304
          ],
          [
            733623.1628808804,
            5866815.570574238
          ],
          [
            733621.270449537,
            5866820.101765479
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 1
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733621.270449537,
            5866820.101765479
          ],
          [
            733532.8827738471,
            5867030.481074203
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 2
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733532.8827738471,
            5867030.481074203
          ],
          [
            733426.6839796304,
            5866989.861292242
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 3
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733426.6839796304,
            5866989.861292242
          ],
          [
            733416.1086280049,
            5866985.653676158
          ],
          [
            733408.0936246678,
            5867004.911627805
          ],
          [
            733387.6108383618,
            5867031.613899503
          ],
          [
            733346.1999877867,
            5867133.568774167
          ],
          [
            733344.0849174617,
            5867142.14598424
          ],
          [
            733353.101796216,
            5867147.972018489
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 4
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733353.101796216,
            5867147.972018489
          ],
          [
            733451.7308650587,
            5867219.017580295
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 5
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            733451.7308650587,
            5867219.017580295
          ],
          [
            733454.291213347,
            5867220.959608273
          ],
          [
            733484.6814343336,
            5867144.411663766
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'index': 6
      }
    }
  ]
};

const tracksStub: Map<number, Track> = new Map([
  [1, {
    id: 1,
    name: 'Tour des rochers de Naye',
    profile: 'walking',
    geojson: rochersNayeGeojson
  }],
  [2, {
    id: 2,
    name: 'Renens Run 1200 2km',
    profile: 'walking',
    geojson: renensGeojson
  }],
]);

const trackListStub: Array<TrackListItem> = [{
  id: 1,
  name: tracksStub.get(1).name
}, {
  id: 2,
  name: tracksStub.get(2).name
}];

let trackCount = trackListStub.length;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  listTracks(): Promise<Array<TrackListItem>> {
    return Promise.resolve(trackListStub);
  }

  getTrack(id: number): Promise<Track> {
    const track = tracksStub.get(id);
    return track ? Promise.resolve(track) : Promise.reject();
  }

  addTrack(track: Track): Promise<void> {
    console.assert(!track.id);
    trackCount++;
    track.id = trackCount;
    tracksStub.set(trackCount, track);
    trackListStub.push({
      id: trackCount,
      name: track.name
    });
    return Promise.resolve();
  }

  saveTrack(track: Track): Promise<void> {
    if (track.id) {
      trackListStub.find(item => item.id === track.id).name = track.name;
      return Promise.resolve();
    } else {
      return this.addTrack(track);
    }
  }

  deleteTrack(track): Promise<void> {
    console.assert(track.id);
    const idx = trackListStub.findIndex(track);
    delete trackListStub[idx];
    tracksStub.delete(track.id);
    return Promise.resolve();
  }
}
