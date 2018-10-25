import * as React from 'react';

interface ComponentNameProps {};

interface ComponentNameState {};

export class Post extends React.Component<ComponentNameProps, ComponentNameState> {
  public render(): JSX.Element {
    return (<span>ComponentName</span>);
  }
}
