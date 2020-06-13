import adobePerlImage from '../assets/perls/adobePerl.png';
import blackPerlImage from '../assets/perls/blackPerl.png';
import bluePerlImage from '../assets/perls/bluePerl.png';
import darkBluePerlImage from '../assets/perls/darkBluePerl.png';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import darkRedPerlImage from '../assets/perls/darkRedPerl.png';
import greenPerlImage from '../assets/perls/greenPerl.png';
import lightGreenPerlImage from '../assets/perls/lightGreenPerl.png';
import lightOrangePerlImage from '../assets/perls/lightOrangePerl.png';
import lightYellowPerlImage from '../assets/perls/lightYellowPerl.png';
import mandarinePerlImage from '../assets/perls/mandarinePerl.png';
import olivePerlImage from '../assets/perls/olivePerl.png';
import orangePerlImage from '../assets/perls/orangePerl.png';
import pinkPerlImage from '../assets/perls/pinkPerl.png';
import purplePerlImage from '../assets/perls/purplePerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';
import yellowPerlImage from '../assets/perls/yellowPerl.png';

export function choosePerlColor(perl, textColor) {
  const randomInt = getRandomInt(18);
  textColor.current = 'white';
  switch (randomInt) {
    case 0:
      perl.current = adobePerlImage;
      break;
    case 1:
      perl.current = blackPerlImage;
      break;
    case 2:
      perl.current = bluePerlImage;
      break;
    case 3:
      perl.current = darkBluePerlImage;
      break;
    case 4:
      perl.current = darkGreenPerlImage;
      break;
    case 5:
      perl.current = darkRedPerlImage;
      break;
    case 6:
      perl.current = greenPerlImage;
      break;
    case 7:
      perl.current = lightGreenPerlImage;
      break;
    case 8:
      perl.current = lightOrangePerlImage;
      textColor.current = 'black';
      break;
    case 9:
      perl.current = lightYellowPerlImage;
      textColor.current = 'black';
      break;
    case 10:
      perl.current = mandarinePerlImage;
      break;
    case 11:
      perl.current = olivePerlImage;
      break;
    case 12:
      perl.current = orangePerlImage;
      break;
    case 13:
      perl.current = pinkPerlImage;
      break;
    case 14:
      perl.current = purplePerlImage;
      break;
    case 15:
      perl.current = redPerlImage;
      break;
    case 16:
      perl.current = whitePerlImage;
      textColor.current = 'black';
      break;
    default:
      perl.current = yellowPerlImage;
      textColor.current = 'black';
      break;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
