import React, { useState, useEffect } from "react";
import "./loadingComponent.scss";
export default function loadingAnimate(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (props.visible != undefined) {
      setLoading(props.visible);
    }
  }, [props.visible]);
  return (
    <div
      style={{
        width: "100%",
        display: loading ? "flex" : "block",
      }}>
      {loading ? (
        <div className='load-content'>
          <svg
            className='spinner'
            width='30px'
            height='30px'
            viewBox='0 0 66 66'
            xmlns='http://www.w3.org/2000/svg'>
            <circle
              className='path'
              fill='none'
              strokeWidth={6}
              strokeLinecap='round'
              cx={33}
              cy={33}
              r={30}
            />
          </svg>
        </div>
      ) : (
        <></>
      )}
      {props.children}
    </div>
  );
}
