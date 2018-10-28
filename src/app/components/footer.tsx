import * as React from 'react';
import Logo from './logo';
import { connect } from 'react-redux';
import { /*categoriesActions,*/ categoriesSelectors } from '../features/categories';
import { RootState } from '../store/root-reducer';
import Category from '../features/categories/models/category';
import Spinner from './spinner';
import { Link } from 'react-router-dom';

interface FooterProps {
  categories: Category[];
  activeCategoryId: number|null;
}

interface FooterState {}

class Footer extends React.Component<FooterProps, FooterState> {
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
                  <li><a href="https://github.com/antonpegov" target="_blank">Author: Anton Pegov <i>github.com/antonpegov</i></a></li>
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
                    <h3 className="footer-title">Categories</h3>
                    <ul className="footer-links">
                      {!this.props.categories ? <Spinner /> : this.props.categories.filter(item => item.color).map(item => (
                      <li><Link to={`/posts?cat=${item.id}`}>{item.name}</Link></li>
                      ))}
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
//#region Store Connection

const mapStateToProps = (state: RootState) => ({
  categories: categoriesSelectors.getCategories(state.categories),
  activeCategoryId: categoriesSelectors.getActiveCategory(state.categories),
});
const mapDispatchToProps = {
  // selectCategory: (id: number|null) => categoriesActions.setActive(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);

//#endregion
