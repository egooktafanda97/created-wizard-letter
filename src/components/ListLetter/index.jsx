import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFolder,
  FaEllipsisV,
  FaFileAlt,
  FaPrint,
  FaTimes,
} from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Dropdown from "react-bootstrap/Dropdown";
import Preview from "../LetterCreate/Letter";
import { getPendudukByDesa, getpapper, getSearchPenduduk } from "./model";
import { penduduk } from "../config/dummy";
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
const ItemDrop = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu size='sm' title=''>
        <Dropdown.Item>
          <a className='title-dropdown'>Preview</a>
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
export default function index() {
  const [open, setOpen] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [papperList, setPapperList] = useState([]);
  const [rightModal, setRightModal] = useState(false);
  const [globalSelectedObj, setGlobalSelectedObj] = useState({});
  const [dataPenduduk, setDataPenduduk] = useState([]);
  const hndelGetPenduduk = (ev) => {
    getSearchPenduduk(ev, (result) => {
      if (result.status == 200) {
        setDataPenduduk(result.data);
      }
    });
    // console.log(ev);
    // setLoadingNext(true);
    // getDataPenduduk($("[name=nik]").val(), (res) => {
    //   setpenduduk(res);
    // onCloseModal();
    //   setLoadingNext(false);
    // });
  };

  const onChangeData = () => {
    getPendudukByDesa((result) => {
      if (result.status === 200) {
        // setpenduduk(result.data);
      }
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
    $(".widget-cards").hide();
    $(".widget-lampiran").show();
  }, []);

  $(".btn-cards").click(function () {
    $(".widget-cards").hide();
    $(".btn-cards").removeClass("active");
    $("." + $(this).data("tab")).show();
    $(this).addClass("active");
  });
  return (
    <>
      <div
        className={`modal-include-master ${
          previewModal ? "show_modal" : "hide_modal"
        }`}>
        <Preview
          globalData={globalSelectedObj}
          back={() => {
            setPreviewModal(false);
          }}
        />
      </div>

      <div className='root' style={{ width: "100%", height: "100%" }}>
        <div className='top-layout-clases'>
          <h2 className='title-top'>Surat</h2>
          <input className='input-grey-rounded' placeholder='Search' />
        </div>
        <hr className='mt-3 mb-4' />
        <div className='package-folder'>
          <div className='icons'>
            <FaFolder size={20} color={`#6e6d6d`} />
          </div>
          <p className='titile-package'>Penduduk</p>
        </div>
        <div className='list-cards'>
          <div className='row'>
            {papperList.map((item, index) => (
              <div className='col-sm-6 col-lg-3 col-md-4 mb-4'>
                <div className='card-contents'>
                  <div className='top-cards'>
                    <h2 className='text-title-font-ubuntu'>surat</h2>
                    <ItemDrop />
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
                      <FaFolder size={20} color={`#6e6d6d`} />
                      <div>
                        <button
                          className='d-flex btn-ui'
                          onClick={() => {
                            setRightModal(true);
                            setGlobalSelectedObj(item);
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
            }}
            closingModal={() => {
              setRightModal(false);
            }}
            onPreviewClick={() => {
              setPreviewModal(true);
            }}
            hndelSearchNik={hndelGetPenduduk}
            papperObj={globalSelectedObj}
          />
        </div>
        {/* modal Nik */}
      </div>
    </>
  );
}

const ModalCetak = (props) => {
  const [attecment, setAttecment] = useState([]);
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
            onKeyUp={(e) => {
              props.hndelSearchNik(e.target.value);
            }}
            placeholder='Cari NIK Penduduk'
          />
          <ul className='results'>
            {props.data?.penduduk.map((item, index) => (
              <li key={index}>
                <a href='index.html'>{item?.nama_lengkap ?? "-"}</a>
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
        <div className='widget-cards widget-lampiran w-100'>
          <strong
            className='labels text-ubuntu-regular text-light mt-2'
            style={{ fontSize: "2vh" }}>
            Lapiran
          </strong>
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
                  name={item.name}
                  style={{ border: "#fff", color: "#fff" }}
                  placeholder='lebel atribut'
                />
              </div>
            ))}
          </form>
        </div>
        <div className='widget-cards widget-print w-100'>
          <PrintingObj />
        </div>

        <hr style={{ margin: "0", padding: "0", borderColor: "#636363" }} />
        <div
          className='btn-container text-right mt-2 mb-2'
          style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className='btn-ui-nobg'
            onClick={() => {
              props.onPreviewClick();
            }}>
            Buat Surat Langsung
          </button>
        </div>
      </div>
    </div>
  );
};

const PrintingObj = () => {
  return (
    <>
      <strong
        className='labels text-ubuntu-regular text-light'
        style={{ fontSize: "2vh" }}>
        - pengaturan cetak
      </strong>
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
              name='label'
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
              name='label'
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
              name='label'
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
              name='label'
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
            name='addToTable'
            className='form-input-style h-30px shadow-sm text-ubuntu'>
            <option value='true'>potrain</option>
            <option value='true'>lanscape</option>
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
            name='addToTable'
            className='form-input-style h-30px shadow-sm text-ubuntu'>
            <option value='true'>A4</option>
            <option value='true'>A5</option>
            <option value='true'>F5</option>
          </select>
        </div>
      </div>
    </>
  );
};

const styleObj = {
  modalCotekContainer: {
    display: "flex",
  },
};
