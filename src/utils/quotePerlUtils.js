import adobePerlImage from '../assets/perls/adobePerl.png';
import babyBluePerlImage from '../assets/perls/babyBluePerl.png';
import blackPerlImage from '../assets/perls/blackPerl.png';
import bluePerlImage from '../assets/perls/bluePerl.png';
import chamoisPerlImage from '../assets/perls/chamoisPerl.png';
import darkBluePerlImage from '../assets/perls/darkBluePerl.png';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import darkRedPerlImage from '../assets/perls/darkRedPerl.png';
import fliederPerlImage from '../assets/perls/fliederPerl.png';
import greenPerlImage from '../assets/perls/greenPerl.png';
import greyLightBrownPerlImage from '../assets/perls/greyLightBrownPerl.png';
import greyPerlImage from '../assets/perls/greyPerl.png';
import lightGreenPerlImage from '../assets/perls/lightGreenPerl.png';
import lightGreyPerlImage from '../assets/perls/lightGreyPerl.png';
import lightOrangePerlImage from '../assets/perls/lightOrangePerl.png';
import lightYellowPerlImage from '../assets/perls/lightYellowPerl.png';
import mandarinePerlImage from '../assets/perls/mandarinePerl.png';
import olivePerlImage from '../assets/perls/olivePerl.png';
import orangePerlImage from '../assets/perls/orangePerl.png';
import pinkPerlImage from '../assets/perls/pinkPerl.png';
import purplePerlImage from '../assets/perls/purplePerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import skinPerlImage from '../assets/perls/skinPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';
import yellowPerlImage from '../assets/perls/yellowPerl.png';

export function choosePerlColor(perl, textColor) {
  const randomInt = getRandomInt(25);
  textColor.current = 'white';
  switch (randomInt) {
    case 0:
      perl.current = adobePerlImage;
      break;
    case 1:
      perl.current = babyBluePerlImage;
      textColor.current = 'black';
      break;
    case 2:
      perl.current = blackPerlImage;
      break;
    case 3:
      perl.current = bluePerlImage;
      break;
    case 4:
      perl.current = chamoisPerlImage;
      textColor.current = 'black';
      break;
    case 5:
      perl.current = darkBluePerlImage;
      break;
    case 6:
      perl.current = darkGreenPerlImage;
      break;
    case 7:
      perl.current = darkRedPerlImage;
      break;
    case 8:
      perl.current = fliederPerlImage;
      break;
    case 9:
      perl.current = greenPerlImage;
      break;
    case 10:
      perl.current = greyLightBrownPerlImage;
      break;
    case 11:
      perl.current = greyPerlImage;
      break;
    case 12:
      perl.current = lightGreenPerlImage;
      break;
    case 13:
      perl.current = lightGreyPerlImage;
      textColor.current = 'black';
      break;
    case 14:
      perl.current = lightOrangePerlImage;
      textColor.current = 'black';
      break;
    case 15:
      perl.current = lightYellowPerlImage;
      textColor.current = 'black';
      break;
    case 16:
      perl.current = mandarinePerlImage;
      break;
    case 17:
      perl.current = olivePerlImage;
      break;
    case 18:
      perl.current = orangePerlImage;
      break;
    case 19:
      perl.current = pinkPerlImage;
      break;
    case 20:
      perl.current = purplePerlImage;
      break;
    case 21:
      perl.current = redPerlImage;
      break;
    case 22:
      perl.current = skinPerlImage;
      textColor.current = 'black';
      break;
    case 23:
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
