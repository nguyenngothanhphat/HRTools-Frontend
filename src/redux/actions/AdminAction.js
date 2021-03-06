import swal from "sweetalert";
import { toast } from 'react-toastify';
import { adminServices } from "../../services/AdminServices";
import {showLoadingAction, hideLoadingAction, showSpinnerAction, hideSpinnerAction} from './LoadingAction'
import { 
  GET_ALL_DOCUMENT, 
  GET_ALL_USER_UNASSIGNED,
  GET_ALL_TRASH_DOCUMENT,
  RELOAD_DOCUMENT
} from "../constants/AdminConstant";
import { STATUS_CODE } from "../../utils/constants/settingSystem";

export const getAllDocumentAction = (pageNumber, sizePage) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {data, status} = await adminServices.getAllDocument(pageNumber, sizePage);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_ALL_DOCUMENT,
          data
        })
        dispatch(hideLoadingAction());
      }
    } catch (err) {
      console.log('error', err)
      dispatch(hideLoadingAction());
    }
  }
}
export const updateDocumentAction = (dataUpdate, id) => {
  return async (dispatch) => {
    try {
      dispatch(showSpinnerAction());
      const {status} = await adminServices.updateDocument(dataUpdate, id);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch(hideSpinnerAction());
        toast.success("Congratulations! Update Successful");
        dispatch(reloadDocumentAction());
      }
    } catch (err) {
      console.log("error", err);
      dispatch(hideSpinnerAction());
    }
  }
}
export const getAllUserUnassignedAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {data, status} = await adminServices.getAllUserUnassigned(id);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_ALL_USER_UNASSIGNED,
          data
        })
        dispatch(hideLoadingAction());
      }
    } catch (err) {
      console.log("error", err);
      dispatch(hideLoadingAction());
    }
  }
}
export const createDocumentAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {status} = await adminServices.createDocument(data);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch(hideLoadingAction());
        toast.success("Congratulations! Create Document Successful");
        dispatch(reloadDocumentAction());
      }   
    } catch (err) {
      dispatch(hideLoadingAction());
      console.log("error", err);
      swal({
        title: "Create failed",
        icon: "error",
        button: "Re-create",
      });
    }
  }
}
export const deleteDocumentAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {status} = await adminServices.deleteDocument(id);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch(hideLoadingAction());
        toast.success("Congratulations! Deleted Successful");
        dispatch(reloadDocumentAction())
      }
    } catch (err) {
      console.log("error", err);
      dispatch(hideLoadingAction());
    }
  }
}
export const assignUserForDocument = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {status} = await adminServices.assignUserForDocument(id, data);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch(hideLoadingAction());
        toast.success("Congratulations! Assign User Successful");
        dispatch(reloadDocumentAction());
      }
    } catch (err) {
      console.log("error", err);
      dispatch(hideLoadingAction());
    }
  }
}
export const restoneDocumentAction = (id, history) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {status} = await adminServices.restoneDocument(id);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch(hideLoadingAction());
        swal({
          title: "Congratulations! Restore Document Successful",
          text: "You clicked the button!",
          icon: "success",
          button: "Okay",
        }).then((accept) => {
          if (accept) {
            history.goBack();
          }
        })
      }
    } catch (err) {
      console.log("error", err);
      dispatch(hideLoadingAction());
    }
  }
}
export const getTrashDocumentsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction());
      const {data, status} = await adminServices.getTrashDocuments();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_ALL_TRASH_DOCUMENT,
          data
        })
        dispatch(hideLoadingAction());
      }
    } catch (err) {
      console.log("error", err);
      dispatch(hideLoadingAction());
    }
  }
}
export const reloadDocumentAction = () => {
  return {
    type: RELOAD_DOCUMENT
  }
}