import React, { useRef, useEffect, useState } from "react";
import "./style.scss";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import $ from "jquery";

import { getPapperRequest } from "../../System/Model/model_api";
import styled from "styled-components";
import {
  FaSpinner,
  FaArrowCircleLeft,
  FaPrint,
  FaCog,
  FaEdit,
} from "react-icons/fa";

import Content from "./ContentGenerate";
import Modal from "react-responsive-modal";
import axios from "axios";
// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// test
import { pendudukDummy, Perangkat } from "../../System/data/dummy";

import domtoimage from "dom-to-image";

export default function Letter(props) {
  const [data, setData] = useState(null);
  const [penduduk, setpenduduk] = useState({});
  const [dataPerangkat, setdataPerangkat] = useState([]);
  const [configPrint, setConfigPrint] = useState(null);
  const componentRef = useRef();
  const Setterpadding = {
    paddingTop: configPrint != undefined && configPrint.paperMargin.top,
    paddingBottom: configPrint != undefined && configPrint.paperMargin.bottom,
    paddingLeft: configPrint != undefined && configPrint.paperMargin.left,
    paddingRight: configPrint != undefined && configPrint.paperMargin.right,
  };
  const [open, setOpen] = useState(false);
  const [openConfigs, setOpenConfigs] = useState(false);
  const [content, setContent] = useState(``);
  useEffect(() => {
    if (props.open) {
      setOpen(props.open);
    }
  }, [props.open]);
  const [loadingNext, setLoadingNext] = useState(false);

  const getRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (Object.keys(props.globalData).length > 0) {
      setData(props.code);
      setConfigPrint(getRedux.papperSetting);
      setpenduduk(props?.dataPenduduk ?? {});
      setdataPerangkat(props?.dataPerangkat ?? []);
    }
  }, [props.globalData, props.dataPenduduk]);

  const hndelGetPenduduk = () => {
    onCloseModal();
  };
  const hndelBack = () => {
    props.back();
  };

  const hndelCetak = () => {
    if ($("#frame-letter").find(".inp").length) {
      $("#frame-letter").find(".inp")[0].focus();
    } else {
      setContent(
        $("#frame-letter div").find(`font[method='dev']`).css("border", "none")
          .prevObject[0]?.innerHTML ?? ``
      );
      var SetValValue = [];
      getRedux.dataPrinting.nameManulInput.map((_, i) => {
        SetValValue.push({
          name: _,
          value: $(content)
            .find("[name=" + _ + "]")
            .text(),
        });
      });
      dispatch({
        type: "SET_VALUE_MANUAL_INPUT",
        payload: SetValValue,
      });
      const TimePrint = setInterval(() => {
        handlePrint();
        clearInterval(TimePrint);
      }, 1000);
    }
  };

  return (
    <div id='printing'>
      <div className='top-menu-printing'>
        <button className='btn-back-printing' onClick={hndelBack}>
          <FaArrowCircleLeft size={16} />
        </button>
        <div>
          <button
            className='btn-printing'
            onClick={() => {
              dispatch({
                type: "SET_CODE",
                payload: {
                  code: `${$("#content").children()[0].innerHTML}`,
                },
              });
              props.editContent();
            }}>
            <FaEdit size={16} />
          </button>
          {!props.printObj && (
            <button
              className='btn-printing'
              style={{ marginLeft: "10px" }}
              onClick={hndelCetak}>
              <FaPrint size={16} />
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={componentRef}
          content={content}
          config={getRedux.papperSetting}
        />
      </div>
      <Modal closeOnOverlayClick={false} open={open} closeOnEsc={false} center>
        <div className='cards p-3' style={{ width: "400px" }}>
          <div
            className='from-group mb-1'
            style={{
              width: "100%",
            }}>
            <label htmlFor='' className='labels'>
              NIK
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm'
              style={{ border: "1px solid #ccc" }}
              name='nik'
              placeholder='lebel atribut'
            />
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <button
              onClick={hndelGetPenduduk}
              className='btn-ui'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}>
              {loadingNext && (
                <FaSpinner
                  className='icon_pulse'
                  style={{ marginRight: "10px" }}
                />
              )}
              <span>Next</span>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        // closeOnOverlayClick={false}
        open={openConfigs}
        // onClose={onCloseModal}
        closeOnEsc={false}
        center>
        <div className='cards p-3' style={{ width: "400px" }}>
          <div
            className='from-group mb-1'
            style={{
              width: "100%",
            }}>
            <label htmlFor='' className='labels'>
              NIK
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm'
              style={{ border: "1px solid #ccc" }}
              name='nik'
              placeholder='lebel atribut'
            />
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <button
              onClick={hndelGetPenduduk}
              className='btn-ui'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}>
              {loadingNext && (
                <FaSpinner
                  className='icon_pulse'
                  style={{ marginRight: "10px" }}
                />
              )}
              <span>Next</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* ================================================ */}
      <div className='mt-5 mb-5'>
        <div
          className='page'
          style={Setterpadding}
          data-size={configPrint != null && configPrint.paperSize}
          data-layout={configPrint != null && configPrint.paperOrientation}>
          <Content
            code={data ?? null}
            penduduk={penduduk}
            perangkat={dataPerangkat}
          />
        </div>
      </div>
    </div>
  );
}
