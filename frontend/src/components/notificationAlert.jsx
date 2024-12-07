import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ERROR, INFO, SUCCESS, WARN } from "../constant.js";

const notificationAlert = (text, status) => {
  if (status === SUCCESS) {
    return toast.success(text, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (status === INFO) {
    return toast.info(text, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (status === ERROR) {
    return toast.error(text, {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (status === WARN) {
    toast.warn(text, {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    return toast.info(text, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default notificationAlert;
