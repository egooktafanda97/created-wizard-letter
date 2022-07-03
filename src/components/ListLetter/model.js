import {
  url_api,
  url_assets,
  url_base,
  url_api_server,
} from "../config/config";
import axios from "axios";
import moment from "moment";
import { penduduk } from "../config/dummy";

const getpapper = async (respose) => {
  api_get(`${url_api_server}wizard/getPapper`, respose);
};
const getSearchPenduduk = async (searching, respose) => {
  api_get(`${url_api_server}wizard/getPenduduk/${searching}`, respose);
};
const getPendudukByDesa = async (respose) => {
  respose(penduduk);
};

async function api_get(url, response) {
  const gets = await axios.get(url).catch((err) => {
    response(err.respose);
  });
  if (gets.status != undefined) {
    response(gets);
  }
}

export { getPendudukByDesa, getpapper, getSearchPenduduk };
