import $ from "jquery";

const getTypeManualName = (fontManualType) => {
  const manualGet = $(fontManualType).find(`font[type='manual']`);
  const Obj = [];
  for (let i = 0; i < manualGet.length; i++) {
    Obj.push($(manualGet[i]).attr("name"));
  }
  return Obj;
};

const GenerateSource = (paramSource) => {
  let source = paramSource;
  // console.log(getManualElement(source));
};

export { GenerateSource, getTypeManualName };
