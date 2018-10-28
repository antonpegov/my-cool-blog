import React from 'react';
import Category from '../features/categories/models/category';
import { Link } from 'react-router-dom';

interface Props {
  category?: Category;
  selected: boolean;
  name: string;
  select: (id: number|null) => void;
}

export class NavigationItem extends React.Component<Props, any> {
  public liStyle = this.props.category
    ? {boxShadow: `0px -5px 0px 0px ${this.props.category.color} inset`}
    : {};
  public render = () => (
    <li className="nav-item" style={this.liStyle}>
      <Link className="nav-link" to={`/posts${this.props.category ? '?cat=' + this.props.category.id : ''}`} onMouseDown={this.handleClick}>
        {this.props.name}
      </Link>
    </li>
  )

  private handleClick = () => {
    this.props.select(this.props.category ? this.props.category.id : null);
  }
}
