import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Dashboard from "./dashboard/reducer";
import DataCollection from "./dataCollection/reducer";
import Setting from "./setting/reducer";
import Chart from "./chart/reducer";
import Device from "./device/reducer";
import DeviceInfo from "./deviceInfo/reducer";
import Sensor from "./sensor/reducer";
import SensorInfo from "./sensorInfo/reducer";
import ChartData from "./chartData/reducer";
import Comparision from "./comparision/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Dashboard,
  DataCollection,
  Setting,
  Chart,
  Device,
  DeviceInfo,
  Sensor,
  SensorInfo,
  ChartData,
  Comparision
});

export default rootReducer;
