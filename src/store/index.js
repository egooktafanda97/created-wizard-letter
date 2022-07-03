import { PapperSet } from "./action";
import { State } from "./initialState";
function reducer(state = State, action) {
  switch (action.type) {
    case "PAPPER-SETTING":
      localStorage.setItem(
        "config",
        JSON.stringify(
          JSON.parse(localStorage.getItem("config")) != undefined
            ? {
                ...JSON.parse(localStorage.getItem("config")),
                ...state,
                papperSetting: PapperSet(action),
              }
            : {
                ...state,
                papperSetting: PapperSet(action),
              }
        )
      );
      return { ...state, papperSetting: PapperSet(action) };
    case "MODAL-ACTION":
      return { ...state, modalAttrAction: action.payload };
      break;
    case "MODAL-ATTAC":
      return { ...state, MODALATTAC: action.payload };
      break;
    case "ACTION-VALUE":
      localStorage.setItem(
        "config",
        JSON.stringify(
          JSON.parse(localStorage.getItem("config")) != undefined
            ? {
                ...JSON.parse(localStorage.getItem("config")),
                ...state,
                ACTIONVALUE: action.payload,
              }
            : {
                ...state,
                ACTIONVALUE: action.payload,
              }
        )
      );
      return { ...state, ACTIONVALUE: action.payload };
      break;
    case "ATTACHMENT":
      localStorage.setItem(
        "config",
        JSON.stringify(
          JSON.parse(localStorage.getItem("config")) != undefined
            ? {
                ...JSON.parse(localStorage.getItem("config")),
                ...state,
                ATTACHMENT: action.payload,
              }
            : {
                ...state,
                ATTACHMENT: action.payload,
              }
        )
      );
      return { ...state, ATTACHMENT: action.payload };
    case "PREVIEW":
      return { ...state, preview: action.payload };
      break;
    case "SET_INPUT_NAME":
      return {
        ...state,
        dataPrinting: { ...state.dataPrinting, nameManulInput: action.payload },
      };
      break;
    case "SET_VALUE_MANUAL_INPUT":
      return {
        ...state,
        dataPrinting: {
          ...state.dataPrinting,
          valueManualInput: action.payload,
        },
      };
      break;
    default:
      if (localStorage.getItem("config") == undefined) {
        localStorage.setItem("config", JSON.stringify(state));
        return state;
      } else {
        return JSON.parse(localStorage.getItem("config"));
      }
  }
}

export default reducer;
