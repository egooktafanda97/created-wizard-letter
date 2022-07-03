export const TemplateRole = {
  model_insert_default: function (key, param = null) {
    return `<font> </font><sup><font key="${key}" params="${param}" style="background:green; color:#fff;padding:2px;border-radius:5px">nama lengkap</font></sup><font> </font>`;
  },
};
