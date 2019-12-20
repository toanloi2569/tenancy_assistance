import DanhSach from './danhsachnha';
import {combineReducers} from 'redux';
import ActivateHome from './action-view-home';
const allListHome = combineReducers({
    danhsach: DanhSach,
    activateHome: ActivateHome
});
export default allListHome;