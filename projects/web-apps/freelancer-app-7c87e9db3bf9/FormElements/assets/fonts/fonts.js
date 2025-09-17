const fonts = {
  helVeticaBold: 'Montserrat-Bold',
  montserratRegular: 'Montserrat-Regular'
};


export const fontsBold = (props) => {
  return props?.auth?.font == 'SF Pro Display' ? 'SFProDisplay-Bold' : 
  props?.auth?.font == 'Roboto' ? 'Roboto-Bold' : 
  props?.auth?.font == 'Montserrat' ? 'Montserrat-Bold' : 
  props?.auth?.font == 'Poppins' ? 'Poppins-Bold' : 
  props?.auth?.font == 'Helvetica Neue' ? 'HelveticaNeue-Bold' : 'SFProDisplay-Bold';
};

export const fontsItalic = (props) => {
  return props?.auth?.font == 'SF Pro Display' ? 'SFProDisplay-Italic' : 
  props?.auth?.font == 'Roboto' ? 'Roboto-Italic' : 
  props?.auth?.font == 'Montserrat' ? 'Montserrat-Italic' : 
  props?.auth?.font == 'Poppins' ? 'Poppins-Italic' : 
  props?.auth?.font == 'Helvetica Neue' ? 'HelveticaNeue-Italic' : 'SFProDisplay-Italic';
};

export const fontsLight = (props) => {
  return props?.auth?.font == 'SF Pro Display' ? 'SFProDisplay-Light' : 
  props?.auth?.font == 'Roboto' ? 'Roboto-Light' : 
  props?.auth?.font == 'Montserrat' ? 'Montserrat-Light' : 
  props?.auth?.font == 'Poppins' ? 'Poppins-Light' : 
  props?.auth?.font == 'Helvetica Neue' ? 'HelveticaNeue-Light' : 'SFProDisplay-Light';
};

export const fontsMedium = (props) => {
  return props?.auth?.font == 'SF Pro Display' ? 'SFProDisplay-Medium' : 
  props?.auth?.font == 'Roboto' ? 'Roboto-Medium' : 
  props?.auth?.font == 'Montserrat' ? 'Montserrat-Medium' : 
  props?.auth?.font == 'Poppins' ? 'Poppins-Medium' : 
  props?.auth?.font == 'Helvetica Neue' ? 'HelveticaNeue-Medium' : 'SFProDisplay-Medium';
};

export const fontsRegular = (props) => {
  return props?.auth?.font == 'SF Pro Display' ? 'SFProDisplay-Regular' : 
  props?.auth?.font == 'Roboto' ? 'Roboto-Regular' : 
  props?.auth?.font == 'Montserrat' ? 'Montserrat-Regular' : 
  props?.auth?.font == 'Poppins' ? 'Poppins-Regular' : 
  props?.auth?.font == 'Helvetica Neue' ? 'HelveticaNeue-Regular' : 'SFProDisplay-Regular';
};

export default fonts;
