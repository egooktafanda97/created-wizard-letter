export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// centi meter to pixel
export function cm2px(cm) {
  return cm * 37.7952755906;
}
// comvert milimeter to pixel
export function mm2px(mm) {
  return mm * 3.7795275591;
}

// comvert inch to pixel
export function inch2px(inch) {
  return inch * 96;
}
