import React from 'react';
import { Icon, Table } from 'semantic-ui-react'

const Container = ({Id, DockerImage}) => {
  return (
    <Table.Row>
      <Table.Cell>
        {Id}
      </Table.Cell>
      <Table.Cell>
        {DockerImage}
      </Table.Cell>
    </Table.Row>
  )
};

export default Container;

