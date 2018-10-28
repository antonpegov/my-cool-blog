import * as React from 'react';
import Logo from './logo';

interface FooterProps {}

interface FooterState {}

export class Footer extends React.Component<FooterProps, FooterState> {
  public render(): JSX.Element {
    return (
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="footer-widget">
                <div className="footer-logo">
                <Logo />
                </div>
                <ul className="footer-nav">
                  <li><a href="">Privacy Policy</a></li>
                  <li><a href="">Advertisement</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-widget">
                    <h3 className="footer-title">About Us</h3>
                    <ul className="footer-links">
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Join Us</a></li>
                      <li><a href="#">Contacts</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-widget">
                    <h3 className="footer-title">Catagories</h3>
                    <ul className="footer-links">
                      <li><a href="">Web Design</a></li>
                      <li><a href="">JavaScript</a></li>
                      <li><a href="">Css</a></li>
                      <li><a href="">Jquery</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-widget">
                <h3 className="footer-title">Join our Newsletter</h3>
                <div className="footer-newsletter">
                  <form>
                    <input className="input" type="email" name="newsletter" placeholder="Enter your email" />
                    <button className="newsletter-btn"><i className="fa fa-paper-plane"/></button>
                  </form>
                </div>
                <ul className="footer-social">
                  <li><a href="#"><i className="fa fa-facebook"/></a></li>
                  <li><a href="#"><i className="fa fa-twitter"/></a></li>
                  <li><a href="#"><i className="fa fa-google-plus"/></a></li>
                  <li><a href="#"><i className="fa fa-pinterest"/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
