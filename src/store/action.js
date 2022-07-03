export const PapperSet = (action) => {
  var width = `${action.payload.size.split(",")[0]}`;
  var height = `${action.payload.size.split(",")[1]}`;
  if (action.payload.orientation == "landscape") {
    width = `${action.payload.size.split(",")[1]}`;
    height = `${action.payload.size.split(",")[0]}`;
  }
  // console.log(">", action.payload.size);
  const Obj = {
    paperSize: action.payload.papper,
    paperOrientation: action.payload.orientation,
    paperMargin: {
      top: `${action.payload.marginTop}${action.payload.satuan}`,
      left: `${action.payload.marginLeft}${action.payload.satuan}`,
      right: `${action.payload.marginRight}${action.payload.satuan}`,
      bottom: `${action.payload.marginBottom}${action.payload.satuan}`,
    },
    width: width,
    height: height,
  };
  return Obj;
};
