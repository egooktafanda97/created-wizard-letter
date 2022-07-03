import React, { useEffect, useState, useRef } from "react";
import { CKEditor } from "ckeditor4-react";
import $ from "jquery";
import "../style/style.scss";
export default function Ckeditor() {
  const [heightEditor, setHeightEditor] = useState(0);
  useEffect(() => {
    console.log($("#container-editor").height() - $("#top").height());
  }, []);
  useEffect(() => {
    setHeightEditor(parseFloat($("#container-editor").height()) - 150);
  }, []);

  return (
    <div id='main-container-editor'>
      <div className='top-bar-clases'>
        <div id='top'></div>
        <div>
          <button className='btn btn-primary'>Tambahkan Input</button>
        </div>
      </div>
      <div
        id='container-editor'
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}>
        <div className='sidebar-container'></div>
        <div className='editor-frame'>
          {heightEditor != 0 && (
            <CKEditor
              style={{
                width: "85%",
                height: heightEditor + "px",
              }}
              className='editor-canvas'
              id='bottom'
              contenteditable='true'
              onSelectionChange={() => {
                console.log("ok");
              }}
              config={{
                extraPlugins: "fixed",
                extraPlugins: "sharedspace",
                removePlugins: "maximize,resize",
                height: heightEditor + "px",
                sharedSpaces: {
                  top: "top",
                  bottom: "bottom",
                },
                removeButtons: "PasteFromWord",
              }}
              initData={<p>x</p>}
            />
          )}
        </div>
      </div>
    </div>
  );
}
