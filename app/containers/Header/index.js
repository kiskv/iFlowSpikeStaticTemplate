import React, { Component } from "react";
import { Toolbar } from 'devextreme-react';

export class Header extends Component {
    constructor() {
        super();

        this.state = {
            opened: true,
            openedStateMode: 'shrink',
            revealMode: 'slide',
            position: 'left'
          };

        this.toolbarItems = [{
            widget: 'dxButton',
            location: 'before',
            options: {
              icon: 'menu',
              onClick: () => this.setState({ opened: !this.state.opened })
            }
          }];
    }

    render() {
        return (
            <Toolbar items={this.toolbarItems } />
        );
    }
}