import axios from "axios";
const urls = require("../config/config.json").Api.url;

export const export_wizard = async (data, response) => {
  try {
    const posts = await axios.post(urls + "wizard/build", data).catch((err) => {
      console.log(err);
    });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};

export const getPapperRequest = async (id, response) => {
  try {
    const posts = await axios
      .get(urls + "wizard/getPapperRequest/" + id)
      .catch((err) => {
        console.log(err);
      });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};
