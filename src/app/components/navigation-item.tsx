import React from 'react';
import Category from '../features/categories/models/category';

interface Props {
  category: Category
  select: (id: number) => void
  selected: boolean
}

export class NavigationItem extends React.Component<Props, any> {
  private handleClick = () => {
    this.props.select(this.props.category.id);
  }

  public render = () => (
    <li className="navigation-menu-item" 
        onMouseDown={this.handleClick}>
      {this.props.category.name}
    </li>
  )
}