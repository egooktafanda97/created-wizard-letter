import React, { useState, useEffect } from "react";
import { FaTimes, FaPen } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import "./styleComponentTable.scss";
// ["nip", "nama", "alamat"];
export default function Table({
  selectFilter,
  Column,
  dataSet = [],
  pagination,
  Footer = null,
  responseFilter = null,
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(dataSet);
  const [datasets, setDatasets] = useState(dataSet);
  const [filter, setFilter] = useState(selectFilter);
  // pagination
  const pageLimit = pagination.pageLimit;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  //   ===============

  useEffect(() => {
    if (dataSet.length > 0) {
      setData(dataSet);
      setDatasets(dataSet);
      setFilter(selectFilter);
      // console.log("foot", typeof Footer);
    }
  }, [dataSet]);
  useEffect(() => {
    setCurrentData(data.slice(offset, offset + pageLimit));
  }, [offset, data]);

  const fuc_filter = (objFilter, datasets, val) => {
    const lowercasedFilter = val.toLowerCase();
    const filteredData = datasets.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key] != null && objFilter.includes(key) === false
          ? false
          : item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    return filteredData;
  };
  const hndelFilter = (values) => {
    // console.log(selectFilter);
    const filters = fuc_filter(selectFilter, datasets, values);
    setData(filters);
    if (typeof responseFilter == "function") {
      responseFilter(filters);
    }
  };
  return (
    <>
      <div className='flex-betwen'>
        <div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
          Total : {data.length}
        </div>
        <input
          style={{ width: "250px", height: "35px" }}
          type='search'
          id='dynatable-query-search-example'
          onChange={(e) => {
            hndelFilter(e.target.value);
          }}
          placeholder='cari data'
        />
      </div>
      <div className='table-responsive'>
        {loading == true && dataSet.length == 0 ? (
          <div className='w-100 text-center'>
            <div
              style={{
                minWidth: "50%",
                padding: "15px",
                borderRadius: "5px",
              }}>
              <strong>Tidak ada data yang akan di tampilkan</strong>
            </div>
          </div>
        ) : (
          <table
            id='example'
            className='table table-striped table-bordered'
            cellSpacing={0}
            width='100%'>
            <thead>
              <tr>
                {Column.map((item, index) => {
                  return (
                    <th
                      className={`dynatable_th ${
                        item.className != undefined ? item.className : ""
                      }`}
                      {...item.config}
                      key={index}>
                      {item.title != undefined ? item.title : item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tfoot>
              {Footer != null ? (
                Footer
              ) : (
                <tr>
                  {Column.map((item, index) => {
                    return (
                      <th
                        className={`dynatable_th ${
                          item.className != undefined ? item.className : ""
                        }`}
                        style={item.style != undefined ? item.style : {}}
                        key={index}>
                        {item.title != undefined ? item.title : item}
                      </th>
                    );
                  })}
                </tr>
              )}
            </tfoot>
            <tbody>
              {data.length == 0 ? (
                <tr>
                  <td>Tidak ada data</td>
                </tr>
              ) : (
                currentData.map((Itm, i) => (
                  <tr key={i}>
                    {Object.keys(Itm).map((key, index) => {
                      return (
                        <td key={index} className='td-styles'>
                          {typeof Itm[key] == "function"
                            ? Itm[key]()
                            : Itm[key]}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        <Paginator
          totalRecords={data.length}
          pageLimit={pageLimit}
          pageNeighbours={3}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
