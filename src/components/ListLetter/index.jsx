import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFolder,
  FaEllipsisV,
  FaFileAlt,
  FaPrint,
  FaTimes,
  FaArrowLeft,
  FaClock,
} from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Dropdown from "react-bootstrap/Dropdown";
import Preview from "../LetterCreate/Letter";
import {
  getPendudukByDesa,
  getpapper,
  getSearchPenduduk,
  getDataPerangkat,
} from "./model";
// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { penduduk, perangkat } from "../config/dummy";
// fa search
import { FaSearch } from "react-icons/fa";

import html2canvas from "html2canvas";
import moment from "moment";
import Editor from "./Editor";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    {children}
    <FaEllipsisV size={20} color={`#6e6d6d`} />
  </a>
));

export default function index() {
  const [open, setOpen] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [papperList, setPapperList] = useState([]);
  const [rightModal, setRightModal] = useState(false);
  const [globalSelectedObj, setGlobalSelectedObj] = useState({});
  const [dataPenduduk, setDataPenduduk] = useState([]);
  const [dataPerangkat, setDataPerangkat] = useState([]);
  const [userData, setUserData] = useState({});
  const [previewModalPre, setPreviewModalPre] = useState(false);
  const [editorCode, setEditorCode] = useState(false);

  const getRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  const hndelGetPenduduk = (ev) => {
    getSearchPenduduk(ev, (result) => {
      if (result?.status ?? 400 == 200) {
        setDataPenduduk(result.data);
      }
    });
  };
  const getDataPerangkatDesa = () => {
    getDataPerangkat((result) => {
      setDataPerangkat(result?.response ?? []);
    });
  };

  const pappergetData = () => {
    getpapper((result) => {
      if (result.status === 200) {
        setPapperList(result.data);
      }
    });
  };

  useEffect(() => {
    pappergetData();
    getDataPerangkatDesa();
    $(".widget-cards").hide();
    $(".widget-lampiran").show();
  }, []);

  $(".btn-cards").click(function () {
    $(".widget-cards").hide();
    $(".btn-cards").removeClass("active");
    $("." + $(this).data("tab")).show();
    $(this).addClass("active");
  });
  const Build = (param) => {
    setUserData(param);
    setPreviewModal(true);
  };

  const ItemDrop = (propss) => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu size='sm' title=''>
          <Dropdown.Item>
            <a className='title-dropdown' onClick={() => propss.onClick()}>
              Preview
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a className='title-dropdown'>Ubah Nama</a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a className='title-dropdown'>Buat Surat</a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a className='title-dropdown'>Rincian</a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  return (
    <>
      <div
        className={`modal-include-master ${
          previewModal ? "show_modal_content" : "hide_modal_content"
        }`}>
        {editorCode ? (
          <Editor
            code={getRedux.CODE}
            back={() => {
              setEditorCode(false);
            }}
          />
        ) : (
          <Preview
            globalData={globalSelectedObj}
            code={getRedux?.CODE?.code}
            dataPenduduk={previewModalPre ? penduduk : userData}
            dataPerangkat={previewModalPre ? penduduk : dataPerangkat}
            back={() => {
              setPreviewModal(false);
            }}
            editContent={() => {
              setEditorCode(true);
            }}
          />
        )}
      </div>
      <div className='root' style={{ width: "100%", height: "100%" }}>
        <div className='top-header'>
          <div>
            <a
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer",
              }}>
              <FaArrowLeft size={16} />{" "}
              <span style={{ marginLeft: "5px" }}>Kembali</span>
            </a>
          </div>
          <div className='seraching'>
            <div className='filter-container'>
              <input
                type='text'
                name='filterSearcing'
                id='filterSearcing'
                className='filterSearcing'
                placeholder='cari surat'
              />
            </div>
            <span className='icn-search'>
              <FaSearch size={20} />
            </span>
          </div>
          <div style={{ paddingRight: "10px" }}>
            <div className='svg-logo'>
              <Logo />
            </div>
          </div>
        </div>
        <hr className='mt-10' />
        <div
          className='package-folder'
          style={{
            marginTop: "60px",
          }}>
          <div className='icons'>
            <FaFileAlt size={20} color={`#6e6d6d`} />
          </div>
          <p className='titile-package'>PERSURATAN</p>
        </div>
        <div className='list-cards'>
          <div className='row'>
            {papperList.map((item, index) => (
              <div className='col-sm-6 col-lg-3 col-md-4 mb-4'>
                <div className='card-contents'>
                  <div className='top-cards'>
                    <h2 className='text-title-font-ubuntu'>
                      {item?.kode_surat ?? ""}
                    </h2>
                    <ItemDrop
                      onClick={() => {
                        setGlobalSelectedObj(item);
                        setPreviewModal(true);
                      }}
                    />
                  </div>
                  <div className='content'>
                    <div className='icon-card'>
                      <FaFileAlt size={50} color={`#6e6d6d`} />
                    </div>
                    <div className='text-title-card'>{item?.name ?? "-"}</div>
                  </div>
                  <div className='cards-foot'>
                    <hr />
                    <div className='footer-card'>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaClock size={20} color={`#6e6d6d`} />{" "}
                        <span style={{ marginLeft: "5px", fontSize: ".8em" }}>
                          {moment(item?.created_at).format("DD MMMM YYYY")}
                        </span>
                      </div>
                      <div>
                        <button
                          className='d-flex btn-ui'
                          onClick={() => {
                            setRightModal(true);
                            setGlobalSelectedObj(item);
                            dispatch({
                              type: "SET_CODE",
                              payload: {
                                code: `${item.code}`,
                              },
                            });
                          }}>
                          <FaPrint size={15} color={`#6e6d6d`} />
                          &emsp; Buat Surat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`right-modal ${rightModal ? "show_modal" : "hide_modal"}`}>
          <ModalCetak
            data={{
              penduduk: dataPenduduk,
              name: globalSelectedObj?.name ?? "-",
            }}
            closingModal={() => {
              setRightModal(false);
            }}
            onPreviewClick={(item) => {
              Build(item);
            }}
            hndelSearchNik={hndelGetPenduduk}
            papperObj={globalSelectedObj}
          />
        </div>
      </div>
    </>
  );
}

const ModalCetak = (props) => {
  const [attecment, setAttecment] = useState([]);
  const [userNik, setUserNik] = useState(null);
  const [btnEnabled, setBtnEnabled] = useState(false);
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }
  useEffect(() => {
    if (!isEmpty(props.papperObj)) {
      setAttecment(JSON.parse(props.papperObj.attachment));
    }
  }, [props.papperObj]);
  const hndelNikClikck = (ev) => {
    console.log(ev);
    setUserNik(ev);
    $(".input-search").val(ev?.nama_lengkap ?? "-");
    $(".results").addClass("hide");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}>
        <div className='d-flex' style={{ alignItems: "center" }}>
          <FaFileAlt size={12} color={`#ccc`} /> &nbsp;{" "}
          <strong
            style={{
              margin: 0,
              padding: 0,
              fontSize: ".9em",
              color: "#ccc",
              fontFamily: "Ubuntu",
            }}>
            {props.data?.name ?? "-"}
          </strong>
        </div>
        <span
          className='btn-closed'
          onClick={() => {
            props.closingModal();
          }}>
          <FaTimes />
        </span>
      </div>
      <hr style={{ margin: "0", padding: "0", borderColor: "#636363" }} />
      <div className='content-side-right mt-2'>
        <div className='nik-search mb-2 mt-3'>
          <input
            className='input-search form-input-style h-30px shadow-sm text-ubuntu'
            type='text'
            autocomplete='off'
            name='q'
            onClick={() => {
              $(".results").removeClass("hide");
            }}
            onKeyUp={(e) => {
              props.hndelSearchNik(e.target.value);
              $(".results").removeClass("hide");
              setBtnEnabled(false);
            }}
            placeholder='Cari NIK Penduduk'
          />
          <ul className='results'>
            {props.data?.penduduk.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  hndelNikClikck(item);
                  setBtnEnabled(true);
                }}>
                <span>{item?.nama_lengkap ?? "-"}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr style={{ margin: "0", padding: "0" }} />
        <div style={{ width: "100%", display: "flex", marginTop: "10px" }}>
          <button
            className='btn-cards button_dark mr-2 active'
            data-tab='widget-lampiran'>
            Lampiran
          </button>
          <button
            className='btn-cards button_dark mr-2'
            data-tab='widget-print'>
            Pengaturan Print
          </button>
        </div>
        <div
          className='widget-cards widget-lampiran w-100'
          style={{ marginTop: "15px" }}>
          <form>
            {attecment.map((item, index) => (
              <div
                className='from-group mb-1'
                style={{
                  width: "100%",
                }}>
                <label
                  htmlFor=''
                  className='labels text-ubuntu-regular text-light'
                  style={{ fontSize: "2vh" }}>
                  {item.value}
                </label>
                <div className='text-left msg-inp'></div>
                <input
                  type='file'
                  className='form-input-style h-30px shadow-sm text-ubuntu'
                  required={item.required}
                  data-type='attachment'
                  name={item.name}
                  style={{ border: "#fff", color: "#fff" }}
                  placeholder='lebel atribut'
                />
              </div>
            ))}
          </form>
        </div>
        <div
          className='widget-cards widget-print w-100'
          style={{ marginTop: "15px" }}>
          <PrintingObj defautConfig={props.papperObj} />
        </div>

        <hr style={{ margin: "0", padding: "0", borderColor: "#636363" }} />
        <div
          className='btn-container text-right mt-2 mb-2'
          style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className={`btn-ui-nobg ${!btnEnabled ? "disabled" : ""}`}
            onClick={() => {
              if (btnEnabled) {
                props.onPreviewClick(userNik);
              }
            }}>
            Buat Surat Langsung
          </button>
        </div>
      </div>
    </div>
  );
};

const PrintingObj = (props) => {
  const getRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.defautConfig.config_print != undefined) {
      const ObjPrint = JSON.parse(props.defautConfig?.config_print ?? "{}");

      $("[name='top']").val(
        getRedux?.papperSetting?.paperMargin.top ?? ObjPrint.paperMargin.top
      );
      $("[name='bottom']").val(
        getRedux?.papperSetting?.paperMargin.top ?? ObjPrint.paperMargin.bottom
      );
      $("[name='left']").val(
        getRedux?.papperSetting?.paperMargin.top ?? ObjPrint.paperMargin.left
      );
      $("[name='right']").val(
        getRedux?.papperSetting?.paperMargin.top ?? ObjPrint.paperMargin.right
      );
      $("[name='orientation']").val(
        getRedux?.papperSetting?.paperOrientation ?? ObjPrint.paperOrientation
      );
      $("[name='papper']").val(
        getRedux?.papperSetting?.paperSize ?? ObjPrint.paperSize
      );
    }
  }, [props.defautConfig.config_print]);

  const hndelChange = (ev) => {
    const ObjPrint = {
      paperMargin: {
        top: $("[name='top']").val(),
        bottom: $("[name='bottom']").val(),
        left: $("[name='left']").val(),
        right: $("[name='right']").val(),
      },
      paperOrientation: $("[name='orientation']").val(),
      paperSize: $("[name='papper']").val(),
    };
    dispatch({ type: "PAPPER_SETTING", payload: ObjPrint });
  };

  return (
    <>
      <div className='container-papper-print-set'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className='from-group mb-1 pl-1 pr-1'
            style={{
              width: "100%",
            }}>
            <label
              htmlFor=''
              className='labels text-ubuntu-regular text-light'
              style={{ fontSize: "2vh" }}>
              Top
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm text-ubuntu'
              name='top'
              onChange={(e) => {
                hndelChange(e);
              }}
              placeholder='lebel atribut'
            />
          </div>
          <div
            className='from-group mb-1 pl-1 pr-1'
            style={{
              width: "100%",
            }}>
            <label
              htmlFor=''
              className='labels text-ubuntu-regular text-light'
              style={{ fontSize: "2vh" }}>
              Right
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm text-ubuntu'
              name='right'
              onChange={(e) => {
                hndelChange(e);
              }}
              placeholder='lebel atribut'
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className='from-group mb-1 pl-1 pr-1'
            style={{
              width: "100%",
            }}>
            <label
              htmlFor=''
              className='labels text-ubuntu-regular text-light'
              style={{ fontSize: "2vh" }}>
              Bottom
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm text-ubuntu'
              name='bottom'
              onChange={(e) => {
                hndelChange(e);
              }}
              placeholder='lebel atribut'
            />
          </div>
          <div
            className='from-group mb-1 pl-1 pr-1'
            style={{
              width: "100%",
            }}>
            <label htmlFor='' className='labels text-ubuntu-regular text-light'>
              Left
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm text-ubuntu'
              name='left'
              onChange={(e) => {
                hndelChange(e);
              }}
              placeholder='lebel atribut'
            />
          </div>
        </div>
        <div
          className='from-group mb-1'
          style={{
            width: "100%",
          }}>
          <label
            htmlFor=''
            className='labels text-ubuntu-regular text-light'
            style={{ fontSize: "2vh" }}>
            Orientation
          </label>
          <div className='text-left msg-inp'></div>
          <select
            name='orientation'
            onChange={(e) => {
              hndelChange(e);
            }}
            className='form-input-style h-30px shadow-sm text-ubuntu'>
            <option value='portrait'>portrait</option>
            <option value='landscape'>landscape</option>
          </select>
        </div>
        <div
          className='from-group mb-1'
          style={{
            width: "100%",
          }}>
          <label
            htmlFor=''
            className='labels text-ubuntu-regular text-light'
            style={{ fontSize: "2vh" }}>
            Papper
          </label>
          <div className='text-left msg-inp'></div>
          <select
            name='papper'
            onChange={(e) => {
              hndelChange(e);
            }}
            className='form-input-style h-30px shadow-sm text-ubuntu'>
            <option value='A4'>A4</option>
            <option value='A5'>A5</option>
            <option value='F5'>F5</option>
          </select>
        </div>
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      width='100px'
      height='50px'
      version='1.1'
      style={{
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
        imageRendering: "optimizeQuality",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }}
      viewBox='0 0 1546 332'
      xmlnsXlink='http://www.w3.org/1999/xlink'>
      <defs>
        <style
          type='text/css'
          dangerouslySetInnerHTML={{
            __html:
              "\n\n.fil1 {\nfill: #1897d6\n}\n\n.fil0 {\nfill: #327dfc\n }\n\n",
          }}
        />
      </defs>
      <g id='Layer_x0020_1'>
        <metadata id='CorelCorpID_0Corel-Layer' />
        <g id='_2571466695280'>
          <path
            className='fil0'
            d='M561 126c4,-2 6,-3 9,-6l23 -21c-22,-25 -45,-36 -90,-34 -80,3 -110,88 -77,140 36,55 110,54 162,22l0 -76 -61 0 1 39 17 0 0 9c-4,17 -84,14 -84,-42 1,-28 27,-49 56,-49 18,0 38,9 44,18z'
          />
          <path
            className='fil0'
            d='M747 189c-7,29 -54,23 -48,-11 6,-26 56,-20 48,11zm-90 -1c0,31 29,55 63,52 16,-1 22,-9 27,-11 0,8 -1,16 -6,21 -18,19 -64,-4 -64,-4 -3,10 -11,18 -14,28 7,3 13,8 23,10 16,5 27,5 42,5 38,0 61,-27 61,-63 0,-23 1,-77 0,-96l-40 1 0 10c-8,-4 -11,-10 -28,-12 -11,-2 -23,0 -32,5 -23,11 -32,26 -32,54z'
          />
          <path
            className='fil0'
            d='M1026 192c-7,35 -52,26 -45,-13 5,-31 53,-24 45,13zm0 -55c-5,-3 -7,-5 -13,-7 -32,-12 -75,9 -75,56 0,67 73,69 88,50 2,2 2,6 3,8l39 0 0 -158 -42 0 0 51z'
          />
          <path
            className='fil1'
            d='M1475 161c34,-10 41,45 13,51 -16,4 -27,-5 -29,-19 -3,-16 2,-27 16,-32zm-59 28c0,24 14,41 28,50 17,10 48,11 60,-3l2 5c2,4 -1,1 3,3l37 -1 0 -157 -41 1 0 50c-17,-8 -10,-10 -36,-10 -31,0 -53,27 -53,62z'
          />
          <path
            className='fil0'
            d='M884 195c-7,33 -52,24 -45,-15 5,-30 54,-22 45,15zm-1 -57c-10,-6 -15,-9 -30,-10 -29,-1 -58,24 -57,63 2,63 75,67 88,46 2,3 2,3 2,9l40 -1 0 -115c-56,0 -37,-2 -43,8z'
          />
          <path
            className='fil0'
            d='M1116 180c-2,-12 7,-21 16,-23 13,-3 25,3 27,14l-43 9zm84 6c1,-31 -25,-59 -55,-59l-13 0c-64,0 -84,95 -15,116 22,7 60,4 74,-16 -3,-5 -15,-15 -21,-22 -10,3 -10,10 -28,9 -11,0 -20,-3 -24,-12l82 -16z'
          />
          <path
            className='fil0'
            d='M1291 164c2,-4 11,-23 12,-28 -21,-10 -60,-14 -82,-2 -3,2 -7,5 -9,7 -3,3 -5,5 -7,9 -10,19 -1,38 15,45 25,11 46,2 49,16 -11,14 -46,0 -58,-4 -3,5 -10,22 -12,27 45,25 120,11 107,-35 -6,-23 -31,-23 -56,-28 -19,-4 -9,-15 8,-15 14,0 23,5 33,8z'
          />
          <g>
            <path
              className='fil0'
              d='M73 170c-2,-2 -3,-3 -5,-6 -3,-6 -8,-8 -6,-12 7,-20 50,-53 77,-56 1,2 11,13 13,16 -26,2 -49,21 -65,38 -8,9 -8,11 -14,20zm-38 -42c10,-19 22,-30 41,-42 8,-5 18,-11 28,-14 11,-4 11,-3 15,1 2,3 8,8 10,11 -10,2 -16,4 -26,8 -7,3 -16,9 -21,13l-14 11c-3,2 -2,2 -4,5 -13,15 -10,15 -14,20 -3,-2 -4,-5 -7,-7 -3,-2 -6,-3 -8,-6zm191 42c-3,-5 -7,-6 -10,-13 -5,-9 -6,-30 -7,-41 -1,-7 -2,-14 -3,-21 3,1 3,1 4,0 -6,-8 -13,-17 -21,-24 -9,-9 -25,-29 -38,-30 -8,-1 -13,-1 -21,0 -35,3 -70,21 -93,43 -7,8 -14,14 -21,25 -3,4 -15,22 -16,29 4,3 8,4 12,7 23,17 44,49 56,74 16,32 33,74 37,113l17 -12c6,-4 10,-7 17,-11 11,-6 26,-14 38,-19 20,-8 47,-16 69,-17 14,0 18,1 28,1 0,-12 -2,-22 -3,-33 -5,3 -8,5 -15,7 -6,1 -14,1 -20,0 -23,-6 -37,-31 -30,-54 4,-10 12,-21 20,-24z'
            />
            <path
              className='fil1'
              d='M327 55c14,2 24,-2 29,-13 3,-7 4,-31 4,-40 -6,1 -31,12 -36,15 -15,8 -15,23 -5,33 -3,6 -15,23 -17,29 1,-13 13,-30 1,-41 -5,-5 -31,-14 -39,-15 -1,21 -7,45 14,51 9,3 12,0 19,-2 -1,8 -4,20 -7,27 -1,3 -3,8 -5,11l-6 11c2,-15 10,-32 -2,-43 -6,-4 -30,-11 -39,-14 0,8 2,34 4,41 2,5 6,10 11,12 8,4 12,1 19,0 0,11 -2,17 -4,27 -1,4 -4,12 -6,17l-3 5c2,-16 7,-33 -4,-43 -4,-3 -31,-13 -38,-14 0,10 3,33 6,42 4,11 16,19 30,11 1,5 1,7 0,12 -5,1 -7,-1 -14,1 -11,2 -19,10 -24,21 -10,26 18,52 43,42 29,-12 25,-47 9,-56 1,-4 3,-6 6,-8 3,5 1,9 9,16 4,4 10,7 18,4 10,-5 21,-14 30,-20 -4,-5 -23,-21 -30,-25 -18,-8 -27,15 -32,20 2,-10 17,-36 25,-39 4,12 14,24 28,19 6,-2 27,-14 31,-17 -3,-4 -11,-11 -15,-15 -25,-23 -32,-16 -50,10 1,-5 9,-21 14,-27 4,-5 9,-12 15,-15 1,13 13,25 27,21 6,-1 13,-5 17,-7 5,-3 11,-6 16,-8 -6,-7 -23,-25 -31,-28 -8,-4 -17,-1 -22,4 -3,4 -7,11 -13,15 2,-5 13,-24 17,-27z'
            />
            <path
              className='fil1'
              d='M61 49c6,-2 18,-10 37,-16 14,-4 30,-7 46,-7 17,0 24,6 35,15 2,3 3,3 5,5 6,6 16,15 20,21 3,4 7,7 10,10l16 22c2,3 0,1 1,2 0,-4 0,-8 -1,-12l-1 -26c0,-4 -1,-9 -1,-12 9,2 17,7 27,9 -3,-10 -1,-28 -1,-39 -31,-17 -65,-25 -107,-18 -17,2 -36,10 -49,17 -11,7 -32,21 -37,29z'
            />
            <path
              className='fil1'
              d='M37 239c3,5 6,9 9,14 5,8 28,32 35,35 -3,-13 -13,-39 -19,-51 -8,-17 -14,-29 -25,-45 -3,-5 -17,-23 -21,-25 -1,11 4,30 7,40 4,12 8,21 14,32z'
            />
            <path
              className='fil1'
              d='M303 254c12,-15 23,-38 27,-57 1,-3 2,-10 2,-13 -10,4 -23,23 -44,19 1,6 0,14 -2,18 -4,10 -3,4 -2,15l4 36 15 -18z'
            />
            <path
              className='fil1'
              d='M175 319c2,0 13,-1 15,-1 21,-2 42,-8 61,-18 4,-3 16,-10 18,-13 -30,-1 -42,0 -73,11 -7,2 -39,15 -43,19l22 2z'
            />
          </g>
          <path
            className='fil0'
            d='M608 246l41 0c0,-24 1,-98 0,-116l-41 0 0 116z'
          />
          <polygon
            className='fil1'
            points='1367,244 1408,244 1408,129 1367,129 '
          />
          <path
            className='fil1'
            d='M601 94c5,38 57,32 55,-4 -1,-14 -14,-26 -29,-25 -15,1 -28,14 -26,29z'
          />
          <path
            className='fil0'
            d='M1415 100c10,-36 -43,-48 -52,-16 -11,37 43,49 52,16z'
          />
          <path
            className='fil1'
            d='M1337 244c30,0 31,-48 0,-48l-1 0c-32,-1 -35,48 1,48z'
          />
        </g>
      </g>
    </svg>
  );
};

const styleObj = {
  modalCotekContainer: {
    display: "flex",
  },
};
