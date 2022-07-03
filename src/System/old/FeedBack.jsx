import React from "react";
import { CKEditorEventAction, useCKEditor } from "ckeditor4-react";

function Editor({ dispatchEvent, initData }) {
  // Use `useState` rather than `useRef` in order to trigger re-render.
  const [element, setElement] = React.useState();

  const { status } = useCKEditor({
    element,
    dispatchEvent,
    subscribeTo: ["blur", "change", "focus"],
  });

  return (
    <div
      ref={setElement}
      style={status !== "ready" ? { visibility: "hidden" } : undefined}>
      {initData}
    </div>
  );
}

function Feedback() {
  // `dispatch` can be passed directly to `useCKEditor` hook.
  const [{ canSendFeedback, data, isUserEditing }, dispatch] = React.useReducer(
    reducer,
    {
      canSendFeedback: false,
      data: undefined,
      isUserEditing: false,
    }
  );

  const handleClick = () => {
    alert(`Feedback has been submitted successfully:\n${data}`);
  };

  return (
    <div>
      <Editor
        dispatchEvent={dispatch}
        initData={<p>Let us hear your feedback!</p>}
      />
      <button disabled={!canSendFeedback} onClick={handleClick}>
        Send
      </button>
      {isUserEditing && <div>We're happy to hear your feedback!</div>}
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case CKEditorEventAction.change:
      const data = action.payload.editor.getData().trim();
      return {
        ...state,
        canSendFeedback: !!data,
        data,
      };
    case CKEditorEventAction.focus:
      return {
        ...state,
        isUserEditing: true,
      };
    case CKEditorEventAction.blur:
      return {
        ...state,
        isUserEditing: false,
      };
  }
}

export default Feedback;
