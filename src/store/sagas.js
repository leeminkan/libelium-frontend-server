import { all } from 'redux-saga/effects';

//public
import AccountSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';
import DashboardSaga from './dashboard/saga';
import DataCollectionSaga from './dataCollection/saga';
import SettingSaga from './setting/saga';
import ChartSaga from './chart/saga';
import DeviceSaga from './device/saga';
import DeviceInfoSaga from './deviceInfo/saga';
import SensorSaga from './sensor/saga';
import SensorInfoSaga from './sensorInfo/saga';
import ChartDataSaga from './chartData/saga';
import ComparisionSaga from './comparision/saga';


export default function* rootSaga() {
    yield all([
        //public
        AccountSaga(),
        AuthSaga(),
        ForgetSaga(),
        LayoutSaga(),
        DashboardSaga(),
        DataCollectionSaga(),
        SettingSaga(),
        ChartSaga(),
        DeviceSaga(),
        DeviceInfoSaga(),
        SensorSaga(),
        SensorInfoSaga(),
        ChartDataSaga(),
        ComparisionSaga()
    ])
}