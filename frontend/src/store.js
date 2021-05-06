import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/MasyarakatReducers";

import {
  adminLoginReducer,
  adminRegisterReducer,
  adminDetailsReducer,
  adminUpdateProfileReducer,
  adminListReducer,
  adminDeleteReducer,
  adminUpdateLevelReducer,
} from "./reducers/PetugasReducers";

import {
  pengaduanCreateReducer,
  pengaduanUserListReducer,
  pengaduanDeleteReducer,
} from "./reducers/PengaduanReducers";

import {
  pengaduanListReducer,
  pengaduanDeleteAdminReducer,
  pengaduanDetailsAdminReducer,
  tanggapanStatusReducer,
  tanggapanAddReducer,
  tanggapanUserListReducer,
  tanggapanDeleteReducer,
  tanggapanListReducer,
} from "./reducers/TanggapanReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  adminLogin: adminLoginReducer,
  adminRegister: adminRegisterReducer,
  adminDetails: adminDetailsReducer,
  adminUpdateProfile: adminUpdateProfileReducer,
  adminList: adminListReducer,
  adminDelete: adminDeleteReducer,
  adminUpdateLevel: adminUpdateLevelReducer,
  pengaduanCreate: pengaduanCreateReducer,
  pengaduanUserList: pengaduanUserListReducer,
  pengaduanDelete: pengaduanDeleteReducer,
  pengaduanList: pengaduanListReducer,
  pengaduanDelete: pengaduanDeleteAdminReducer,
  pengaduanDetailsAdmin: pengaduanDetailsAdminReducer,
  tanggapanAdd: tanggapanAddReducer,
  tanggapanStatus: tanggapanStatusReducer,
  tanggapanUserList: tanggapanUserListReducer,
  tanggapanDelete: tanggapanDeleteReducer,
  tanggapanList: tanggapanListReducer,
});

// const pengaduanInfoFromStorage = localStorage.getItem('pengaduan') ? JSON.parse
// (localStorage.getItem('pengaduan')) : {}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  // pengaduan: {pengaduan:pengaduanInfoFromStorage}
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
