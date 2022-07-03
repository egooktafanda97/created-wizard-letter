import axios from "axios";
const api_url = "http://localhost/rest/api/";

export const praWizard = async (data, response) => {
  const push = await axios
    .post(api_url + "wizard/pra-wizad", data)
    .catch((err) => {
      console.log(err.response);
    });
  if (push.status == 200) {
    response(push.data);
  }
};
