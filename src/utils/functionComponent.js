import axios from "axios";
import swal from "sweetalert";
export const onDeleted = (urls, response) => {
  const url = urls;
  swal({
    title: "Anda yakin?",
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const func_delete = async (response) => {
        const del = await axios
          .delete(localStorage.getItem("base_url") + "api/" + url, {
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
            },
          })
          .catch((err) => {
            swal("Data gagal dihapus!", {
              icon: "error",
            });
          });
        if (del != undefined && del.status == 200) {
          swal("Data berhasil dihapus!", {
            icon: "success",
          });
          response(del.data);
        }
      };
      func_delete(response);
    }
  });
};

export function rupiah(angka, prefix) {
  if (angka != undefined && angka != null) {
    var separator = ".";
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }
}

export const CheckLogin = async () => {
  const Check = await axios
    .get(localStorage.getItem("base_url") + "api/auth/authCheck", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      window.location.href = localStorage.getItem("web_url") + "Login/index";
    });
};

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const UrlClientSite =
  localStorage.getItem("web_url") + "/ClientSite/index/";
