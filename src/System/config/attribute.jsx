export const attribute_dinamic = (
  key,
  param,
  label,
  formlabel = "",
  color = "green",
  mode = "",
  type = "",
  attrSelect = ""
) => {
  // key   : target databse
  // param : jenis data , |penduduk|pegawai|perangkat
  // label : yang terlihat
  // color : warna label
  // mode  : input|auto
  // type  : text, textarea, select
  // attrSelect : data select jika selecbox, bentuk json object
  return `<font> </font><font key="${key}" params="${param}" formlabel="${formlabel}" mode="${mode}" selection="${attrSelect}" type="${type}"  style="background:${color}; color:#fff;border-radius:5px; padding-left:2px;padding-right:2px;">${label}</font><font> </font> &emsp;`;
};
