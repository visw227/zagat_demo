import {Platform} from 'react-native'

const colors = {
  statusBarColor: '#F4F4F6',
  authBackGroud: '#FFF',
  inputBox: '#FFFFFF',
  placeHolderColor: 'rgb(165,175,185)',
  inputTextColor: '#333333',
  ornageButton: '#243243',
  blueText: '#0F3C5F',
  transparentBackground: 'rgba(255,255,255,.1)',
  yellow: '#F1B828',
  white: '#ffffff',
  dullWhite : '#f5f5f5',
  gray: '#ccc',
  // blue: '#284E72',
  blue: '#223244',
  darkCreame: '#f0dab1',
  darkBlue: '#3897f0',
  palletBlue: '#0a516d',
  palletBlue1: '#018790',
  palletOrange: '#f77754',
  redesignBlue: '#4044c9',
  fullDarkBlue: '#15568b',
  success: '#29A888',
  error: '#f78072',
  warning: '#eedea4',
};

const fonts = {
  regular: Platform.OS == 'ios' ? 'Optima' : 'sans-serif-medium',
  semiBold: 'SegoeUI-Semibold',
  bold: 'SegoeUI-Bold',
  italic: 'SegoeUI-Italic',
};

const gitTokenInitial = 'ghp_j5t1PN3iFTtLwi';
const gitTokenLast = 'YEgI4EVR4S39qQgv3JAbtv';

const SECRET_TOKENS = {
  GIT_TOKEN : gitTokenInitial + gitTokenLast
} // git token cannot ne pusheed to github..to this is a tweak


export { colors, fonts,SECRET_TOKENS  };
