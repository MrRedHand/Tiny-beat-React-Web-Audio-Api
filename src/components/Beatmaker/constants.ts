import bassOne from '../../sounds/131770__bertrof__sub-kick-long.wav';
import bassTwo from '../../sounds/347323__newagesoup__thick-stamp-sub.wav';
import bassThree from '../../sounds/276772__crispydinner__crdn_pndlrgbt_kick-marker-107.wav';
import hatOne from '../../sounds/137690__quartertone__hh13inkz-blsc-v03.wav';
import hatTwo from '../../sounds/209513__it_was_the_sun__snare1.wav';
import hatThree from '../../sounds/173087__yellowtree__wood-snare-sample-3.wav';

import { ISamplesCollection } from './types';

const samplesCollection: ISamplesCollection[] = [
  {
    label: 'DefaultBass',
    value: 'defaultbass',
    category: 'bass',
    url: bassOne
  },
  {
    label: 'SuperBass',
    value: 'superbass',
    category: 'bass',
    url: bassTwo
  },
  {
    label: 'DuperBass',
    value: 'duperbass',
    category: 'bass',
    url: bassThree
  },
  {
    label: 'DefaultHat',
    value: 'defaulthat',
    category: 'hat',
    url: hatOne
  },
  {
    label: 'SuperHat',
    value: 'superhat',
    category: 'hat',
    url: hatTwo
  },
  {
    label: 'DuperHat',
    value: 'duperhat',
    category: 'hat',
    url: hatThree
  }
];

export default samplesCollection;
