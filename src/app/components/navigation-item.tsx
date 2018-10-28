import React from 'react';
import Category from '../features/categories/models/category';
import { Link } from 'react-router-dom';

interface Props {
  category?: Category;
  selected: boolean;
  name: string;
  select: (id: number|undefined) => void;
}

export class NavigationItem extends React.Component<Props, any> {

  public render = () => (
    <li className="nav-item">
      <Link className="nav-link"  to={`/posts?cat=${this.props.category && this.props.category.id}`} onMouseDown={this.handleClick}>
        {this.props.name}
      </Link>
    </li>
  )

  private handleClick = () => {
    this.props.select(this.props.category ? this.props.category.id : undefined);
  }
}
