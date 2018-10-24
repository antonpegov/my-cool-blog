import * as React from 'react';
import { connect } from 'react-redux';
import { countersSelectors, countersActions } from '../features/counters';
import { RootState } from '../store/root-reducer';

interface ListViewProps {
  totalCounter: number;
  title: string;
  incrementTotal: () => void;
  resetTotal: () => void;
}

export class ListView extends React.Component<ListViewProps, {}> {
  render() {
    const { title, children } = this.props;

    return (
      <React.Fragment>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
        <p>Total: {this.props.totalCounter}</p>
        <div className="text-center">
          <button className="btn btn-success ml-3" onClick={this.props.resetTotal}>reset total</button>
          <button className="btn btn-info ml-3" onClick={this.props.incrementTotal}>increment total</button>
        </div>
      </React.Fragment>
    );
  }
}

//#region Store Connection

const mapStateToProps = (state: RootState) => ({
  totalCounter: countersSelectors.getReduxCounter(state.counters),
});
const mapActionsToProps = {
  incrementTotal: () => countersActions.increment(),
  resetTotal: () => countersActions.reset(),
};
export default connect(mapStateToProps, mapActionsToProps)(ListView);

//#endregion
