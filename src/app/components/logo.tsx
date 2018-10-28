import * as React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {}

interface LogoState {}

class Logo extends React.Component<LogoProps, LogoState> {
  public render(): JSX.Element {
    return (
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src="./assets/logo.png" alt="" />
        </Link>
      </div>
    );
  }
}

export default Logo;
