import * as AppSagas from 'containers/App/sagas';
import * as VideoListSagas from 'containers/VideoList/sagas';

// Bootstrap sagas
var d=[
  AppSagas.getGithubData, AppSagas.loginUserSaga, AppSagas.logoutUserSaga
];
d=d.concat(VideoListSagas.default);
export default d;
