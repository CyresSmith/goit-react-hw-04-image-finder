import { Report } from 'notiflix/build/notiflix-report-aio';
import theme from 'theme';

Report.init({
  width: '420px',
  backgroundColor: theme.colors.primary,
  borderRadius: theme.radii.high,
  backOverlayClickToClose: true,
  fontFamily: theme.fonts.body,
  titleFontSize: theme.fontSizes.l,
  titleMaxLength: 50,
  messageFontSize: theme.fontSizes.m,
  messageMaxLength: 500,
  buttonFontSize: theme.fontSizes.m,
  success: {
    svgColor: '#32c682',
    titleColor: '#1e1e1e',
    messageColor: '#242424',
    buttonBackground: '#32c682',
    buttonColor: '#fff',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },
  failure: {
    svgColor: '#ff5549',
    titleColor: '#1e1e1e',
    messageColor: '#242424',
    buttonBackground: '#ff5549',
    buttonColor: '#fff',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
  warning: {
    svgColor: '#eebf31',
    titleColor: '#1e1e1e',
    messageColor: '#242424',
    buttonBackground: '#eebf31',
    buttonColor: '#fff',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
  info: {
    svgColor: '#26c0d3',
    titleColor: '#1e1e1e',
    messageColor: '#242424',
    buttonBackground: '#26c0d3',
    buttonColor: '#fff',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});
