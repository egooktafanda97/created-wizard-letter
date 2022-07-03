import React from "react";
import {
  useCKEditor,
  CKEditorEventAction,
  registerEditorEventHandler,
} from "ckeditor4-react";

function Editor({ someProp }) {
  const [element, setElement] = React.useState();

  const { editor } = useCKEditor({
    element,
    // `dispatchEvent` is memoized, so initial value of `someProp` will be always used.
    dispatchEvent: ({ type }) => {
      if (type === CKEditorEventAction.focus) {
        console.log(`Will be called with initial value of ${someProp}.`);
      }
    },
    subscribeTo: ["focus"],
  });

  React.useEffect(() => {
    if (editor) {
      // Registers new handler with high priority whenever value of `someProp` changes.
      const cleanup = registerEditorEventHandler({
        editor,
        evtName: "focus",
        handler: () => {
          console.log(
            `Will be called with current value of ${someProp} before regular event handlers.`
          );
        },
        priority: 0,
      });
      return cleanup;
    }
  }, [editor, someProp]);
  const hndelClick = () => {
    editor.insertHtml(`<span key="xs" names="ggg">nama lengkap</span>`);
  };
  return (
    <div>
      <div ref={setElement}></div>
      <button onClick={hndelClick}>Push</button>
    </div>
  );
}

export default Editor;
