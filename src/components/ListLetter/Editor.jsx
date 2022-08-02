import React, { useEffect, useState, useRef } from "react";
import {
  useCKEditor,
  CKEditorEventAction,
  registerEditorEventHandler,
} from "ckeditor4-react";
import $ from "jquery";
import "../../styles/style.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaFileExport } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ---------------------------------------------
import { makeid, cm2px } from "../../System/Helpers/___func";
// redux
const EditorCofig = require("../../System/config/config.json");

export default function Engine(props) {
  // ---- redux --------------------------------
  const getRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  //--------------------------------------------
  const [loading, setLoading] = useState(true);
  const [heightEditor, setHeightEditor] = useState(0);
  const [element, setElement] = React.useState();

  String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
  };

  // configurasi editor
  const { editor } = useCKEditor({
    element,
    dispatchEvent: (action) => {
      switch (action.type) {
        case CKEditorEventAction.focus:
          console.log(`Will be called with initial value .`);
          break;
        case CKEditorEventAction.change:
          localStorage.setItem("_contens", action.payload.editor.getData());
          break;
        default:
          break;
      }
    },
    subscribeTo: ["focus", "change"],
    contenteditable: true,
    config: {
      extraPlugins: "fixed",
      extraPlugins: "sharedspace",
      removePlugins: "maximize,resize",
      resize_enabled: false,

      tabSpaces: 4,
      allowedContent: true,
      sharedSpaces: {
        top: "top",
        bottom: "bottoms",
      },

      removeButtons: "PasteFromWord",
    },
  });
  useEffect(() => {
    if (editor) {
      editor.config.height = heightEditor + "px";
      editor.config.width = EditorCofig.editor.width;

      // Registers new handler with high priority whenever value of `someProp` changes.
      const cleanup = registerEditorEventHandler({
        editor,
        evtName: "focus",
        handler: () => {
          console.log(
            `Will be called with current value of  before regular event handlers.`
          );
        },
        priority: 0,
      });
      return cleanup;
    }
  }, [editor]);
  const setterLayout = () => {
    editor.resize(200, heightEditor + "px");
  };
  useEffect(() => {
    if (loading == false) {
      setHeightEditor(parseFloat($("#container-editor").height()) - 150);
    }
  }, [loading]);
  const hndelAddAttr = (attr) => {
    editor.insertHtml(attr);
  };

  $(".sidebar-container").css(
    "height",
    `calc(100% - ${$(".top-bar-clases").height()}px)`
  );
  // inisiasi
  useEffect(() => {
    setLoading(false);
  }, []);

  // =========================
  const onCloseModal = () => setOpen(false);
  const exportsPapper = () => {
    const data = editor.getData();
    if (!data.isEmpty()) {
      dispatch({
        type: "SET_CODE",
        payload: {
          code: `${data}`,
        },
      });
    }
    props.back();
  };
  const hndelExports = (ev) => {
    ev.preventDefault();
    onCloseModal();
  };
  return loading ? (
    <div>loading...</div>
  ) : (
    <div id='main-container-editor-editing' className='editing-personal'>
      <div className='top-bar-clases'>
        {heightEditor != 0 && <div id='top'></div>}
        <div className='mt-3' style={{ marginRight: "15px" }}>
          {/* export */}
          <button className='btn-ui btn-main-export' onClick={exportsPapper}>
            <FaFileExport /> Simpan
          </button>
          {/* right menu add */}
        </div>
      </div>

      <div
        id='container-editor'
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}>
        <div className='editor-frame'>
          {heightEditor != 0 && (
            <textarea
              ref={setElement}
              id='bottoms'
              style={{
                width: "100%",
                height: heightEditor + "px",
                padding: 1000,
              }}
              className='editor-canvas'>
              {getRedux?.CODE?.code ?? ""}
            </textarea>
          )}
        </div>
      </div>
    </div>
  );
}
