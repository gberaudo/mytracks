import { Injectable } from '@angular/core';
import { GeoJsonObject, GeoJsonTypes } from 'geojson';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

export interface LoginResponse {
  key: string;
  user_id: number;
};

let httpOptions = {
  headers: <HttpHeaders> null
};

const noMock = true;//location.search.includes('nomock');

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

const marathonLausanne10Kms = {
  'type': <GeoJsonTypes> 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          737185.7205447375,
          5862931.095484056
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
          739418.2329325966,
          5861895.2665283745
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
          743391.6708369718,
          5861508.883762778
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
          744397.2197973074,
          5861368.017585186
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
          744450.9871113605,
          5861175.239975712
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
          743734.3122296334,
          5861463.437596649
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
          739437.7138434855,
          5861877.151929769
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
          738654.8038647365,
          5861924.541092522
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
            737185.7205447375,
            5862931.095484056
          ],
          [
            737311.0662913708,
            5862869.951659725
          ],
          [
            737828.1453261055,
            5862764.002389006
          ],
          [
            738318.3963635591,
            5862585.58993772
          ],
          [
            738476.3587209948,
            5862483.202559592
          ],
          [
            738597.0290490147,
            5862390.682921231
          ],
          [
            738622.7438513879,
            5862375.155245171
          ],
          [
            738638.8851775529,
            5862378.5519219665
          ],
          [
            738810.651151847,
            5862284.577681442
          ],
          [
            739001.6753980481,
            5862141.111199962
          ],
          [
            739119.5627387983,
            5862088.545149613
          ],
          [
            739210.0654848133,
            5861989.560086416
          ],
          [
            739254.5932811305,
            5861953.977492875
          ],
          [
            739418.2329325966,
            5861895.2665283745
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
            739418.2329325966,
            5861895.2665283745
          ],
          [
            739440.5099760857,
            5861894.921721842
          ],
          [
            740693.0637411611,
            5861875.5345567055
          ],
          [
            741285.8400296354,
            5861941.68535766
          ],
          [
            741521.0581136815,
            5861913.542902293
          ],
          [
            741906.3348713171,
            5862003.631424505
          ],
          [
            741977.0227479709,
            5862001.690548946
          ],
          [
            742068.9726473661,
            5861985.0313846925
          ],
          [
            742307.8642746084,
            5861876.828455132
          ],
          [
            742499.7790767361,
            5861827.498712438
          ],
          [
            742754.4780716711,
            5861674.17393502
          ],
          [
            743028.1013800409,
            5861615.950036475
          ],
          [
            743391.6708369718,
            5861508.883762778
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
            743391.6708369718,
            5861508.883762778
          ],
          [
            743468.8152440914,
            5861502.091082444
          ],
          [
            743696.6862417454,
            5861498.533013892
          ],
          [
            743737.8744533388,
            5861502.899734588
          ],
          [
            743871.9031202539,
            5861549.154761091
          ],
          [
            743927.4515461597,
            5861558.53518076
          ],
          [
            743971.6453840047,
            5861558.049986391
          ],
          [
            744059.5877817315,
            5861535.407612415
          ],
          [
            744210.0917332838,
            5861481.713072936
          ],
          [
            744232.689589915,
            5861451.7930652015
          ],
          [
            744295.5851022131,
            5861431.576901393
          ],
          [
            744372.5068703513,
            5861388.880516185
          ],
          [
            744397.2197973074,
            5861368.017585186
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
            744397.2197973074,
            5861368.017585186
          ],
          [
            744436.2929385758,
            5861278.582480708
          ],
          [
            744442.3041910786,
            5861214.700820185
          ],
          [
            744453.7700986303,
            5861179.444811366
          ],
          [
            744460.2266290963,
            5861175.401700124
          ],
          [
            744450.9871113605,
            5861175.239975712
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
            744450.9871113605,
            5861175.239975712
          ],
          [
            744406.2366760616,
            5861177.342393291
          ],
          [
            744274.8796769256,
            5861197.557972548
          ],
          [
            744172.7997038681,
            5861230.226446885
          ],
          [
            744114.5796101833,
            5861269.525811994
          ],
          [
            744006.8223430953,
            5861307.854991609
          ],
          [
            743865.0013118248,
            5861403.112621553
          ],
          [
            743853.5354042731,
            5861384.675580374
          ],
          [
            743734.3122296334,
            5861463.437596649
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'subtype': '',
        'index': 4
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            743734.3122296334,
            5861463.437596649
          ],
          [
            743730.9726449096,
            5861485.109404575
          ],
          [
            743757.132725246,
            5861472.817924872
          ],
          [
            743498.5375481333,
            5861479.448852577
          ],
          [
            743028.1013800409,
            5861615.950036475
          ],
          [
            742793.6625324303,
            5861661.073524231
          ],
          [
            742720.8595854514,
            5861688.244768358
          ],
          [
            742509.6865114167,
            5861823.293566848
          ],
          [
            742307.8642746084,
            5861876.828455132
          ],
          [
            742068.9726473661,
            5861985.0313846925
          ],
          [
            741977.0227479709,
            5862001.690548946
          ],
          [
            741906.3348713171,
            5862003.631424505
          ],
          [
            741521.0581136815,
            5861913.542902293
          ],
          [
            741292.8531575555,
            5861941.847096175
          ],
          [
            740693.0637411611,
            5861875.5345567055
          ],
          [
            739477.1209432263,
            5861900.927348091
          ],
          [
            739437.7138434855,
            5861877.151929769
          ]
        ]
      },
      'properties': {
        'type': 'segment',
        'snapped': true,
        'subtype': '',
        'index': 5
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [
            739437.7138434855,
            5861877.151929769
          ],
          [
            739410.3292487503,
            5861796.607112875
          ],
          [
            739379.4937498006,
            5861728.516588211
          ],
          [
            739345.318666127,
            5861700.374815165
          ],
          [
            739322.6094900052,
            5861691.802913684
          ],
          [
            739282.311834338,
            5861687.436099162
          ],
          [
            738654.8038647365,
            5861924.541092522
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
  [3, {
    id: 3,
    name: 'Marathon Lausanne 10kms',
    profile: 'walking',
    geojson: marathonLausanne10Kms
  }],
]);

const trackListStub: Array<TrackListItem> = [{
  id: 1,
  name: tracksStub.get(1).name
}, {
  id: 2,
  name: tracksStub.get(2).name
}, {
  id: 3,
  name: tracksStub.get(3).name
}];

let trackCount = trackListStub.length;
const api = 'http://localhost:8000';
let apiUser: string;
const userId = 1;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listTracks(): Promise<Array<TrackListItem>> {
    if (noMock) {
      if (httpOptions.headers) {
        return this.http.get<Array<TrackListItem>>(`${apiUser}/tracks`, httpOptions).toPromise();
      } else {
        return Promise.resolve([]);
      }
    }
    return Promise.resolve(trackListStub);
  }

  getTrack(id: number): Promise<Track> {
    if (noMock) {
      return this.http.get<Track>(`${apiUser}/tracks/${id}`, httpOptions).toPromise();
    }
    const track = tracksStub.get(id);
    return track ? Promise.resolve(track) : Promise.reject();
  }

  addTrack(track: Track): Promise<Track> {
    console.assert(!track.id);
    if (noMock) {
      return this.http.post<Track>(`${apiUser}/tracks`, track, httpOptions).toPromise();
    }
    trackCount++;
    track.id = trackCount;
    tracksStub.set(trackCount, track);
    trackListStub.push({
      id: trackCount,
      name: track.name
    });
    return Promise.resolve(track);
  }

  saveTrack(track: Track): Promise<void> {
    if (track.id) {
      if (noMock) {
        return this.http.put<Track>(`${apiUser}/tracks/${track.id}`, track, httpOptions).toPromise().then(() => {});
      }
      trackListStub.find(item => item.id === track.id).name = track.name;
      return Promise.resolve();
    } else {
      return this.addTrack(track).then(savedTrack => {
        track.id = savedTrack.id;
      });
    }
  }

  deleteTrack(track): Promise<void> {
    console.assert(track.id);
    if (noMock) {
      return this.http.delete<void>(`${apiUser}/tracks/${track.id}`, httpOptions).toPromise();
    }
    const idx = trackListStub.findIndex(track);
    delete trackListStub[idx];
    tracksStub.delete(track.id);
    return Promise.resolve();
  }

  logIn() {
    return this.http.post<LoginResponse>(`${api}/rest-auth/login/`, {
      username: 'guillaume.beraudo+crac2@gmail.com',
      password: 'cotcot'
    }).toPromise().then(response => {
      apiUser = `${api}/users/${response.user_id || 1}`;
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Token ${response.key}`
        })
      };
    });
  }

  logOut() {
    httpOptions = {
      headers: <HttpHeaders> null
    };
    return Promise.resolve();
  }

  isLoggedIn() {
    return !!httpOptions.headers;
  }
}
