import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import { store, browserHistory } from './store';
/*tslint:disable:no-import-side-effect*/
import './styles/styles.scss';
declare let module: any;

ReactDOM.render(<App store={store} history={browserHistory} />, document.getElementById('root'));
if (module.hot) {
  module.hot.accept();
}
