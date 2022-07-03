import React, { forwardRef, useRef, useEffect } from "react";
export const ComponentToPrint = forwardRef((props, ref) => {
  useEffect(() => {
    // console.log(">>", props);
  }, [props]);
  return (
    <div ref={ref}>
      <style>
        {` @media print{
            @page {
              size: ${props.config.paperSize} ${props.config.paperOrientation};
              margin: 0 !important;
            }
            html, body {
              margin-top: ${props.config.paperMargin.top};
              margin-bottom: ${props.config.paperMargin.bottom};
              margin-left: ${props.config.paperMargin.left};
              margin-right: ${props.config.paperMargin.right};       
            }`}
      </style>
      <div dangerouslySetInnerHTML={{ __html: `${props.content}` }}></div>
    </div>
  );
});
