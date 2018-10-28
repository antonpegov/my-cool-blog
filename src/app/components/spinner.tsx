import * as React from 'react';

interface SpinnerProps {}

interface SpinnerState {}

class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  public render(): JSX.Element {
    return (
      <span>
        <img src="assets/cool-spinner.gif" width="30px" alt="" className="src"/>
      </span>
    );
  }
}

export default Spinner;
