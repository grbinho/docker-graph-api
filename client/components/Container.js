import React from 'react';
import { Icon, Table } from 'semantic-ui-react'

const Container = ({Id, DockerImage, State, Name}) => {
  return (
    <Table.Row>
      <Table.Cell>
        {Id.substr(0,12)}
      </Table.Cell>
      <Table.Cell>
        {DockerImage}
      </Table.Cell>
      <Table.Cell>
        {State}
      </Table.Cell>
      <Table.Cell>
        {Name}
      </Table.Cell>
    </Table.Row>
  )
};

export default Container;

