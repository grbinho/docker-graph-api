import React, { Component } from 'react'
import { Link } from 'react-router'
import { Input, Menu, Segment, Grid } from 'semantic-ui-react'

export default class AppMenu extends Component {

  state = { activeItem: 'Containers' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing>
          <Menu.Item as={Link} to='/' name='Containers' active={activeItem === 'Containers'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/images' name='Images' active={activeItem === 'Images'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment>
          {this.props.children}
        </Segment>
      </div>
    )
  }
}
