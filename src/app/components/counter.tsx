import * as React from 'react';
import { RootState } from '../store/root-reducer';
import { connect } from 'react-redux';
import { countersActions } from '../features/counters';

interface Props {
  takeValue: (value: number) => void;
  startWith?: number;
}
interface State {
  count: number;
}

export class Counter extends React.Component<Props, State> {

  readonly state: Readonly<State> = { count: this.props.startWith || 0 };
  private interval: any;

  public componentWillMount() {
    const incrementCounter = () => {
      this.setState({ count: this.state.count + 1 });
    };
    this.interval = setInterval(incrementCounter, 2000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public onReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState(Object.assign({}, this.state, {count: 0}));
  }

  public onTake = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.takeValue(this.state.count);
  }

  render() {
    return (
      <div>
        <div className="mb-3">
          <button className="btn btn-success ml-3" onClick={this.onReset}>reset</button>
          <button className="btn btn-info ml-3" onClick={this.onTake}>add to total</button>
          <span className="ml-3">Counter: {this.state.count}</span>
        </div>
      </div>
    );
  }

}

//#region Store Connection

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  takeValue: (value: number) => countersActions.add(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

//#endregion