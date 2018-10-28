import * as React from 'react';

interface NavigationButtonsProps {}

interface NavigationButtonsState {}

class NavigationButtons extends React.Component<NavigationButtonsProps, NavigationButtonsState> {
  public render(): JSX.Element {
    return (
      <div className="nav-btns">
        {/* <button className="aside-btn"><i className="fa fa-bars"/></button> */}
        {/* <button className="search-btn"><i className="fa fa-search"/></button> */}
        {/* <div className="search-form">
          <input className="search-input" type="text" name="search" placeholder="Enter Your Search ..." />
          <button className="search-close"><i className="fa fa-times" /></button>
        </div> */}
      </div>
    );
  }
}

export default NavigationButtons;
