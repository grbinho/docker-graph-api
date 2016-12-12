import React from 'react';
import { Icon, Table } from 'semantic-ui-react'

const Image = ({Id, Repository, Tag}) => {
  return (
    <Table.Row>
      <Table.Cell>
        {Id.split(':')[1].substr(0,12)}
      </Table.Cell>
      <Table.Cell>
        {Repository}
      </Table.Cell>
      <Table.Cell>
        {Tag}
      </Table.Cell>
    </Table.Row>
  )
};

export default Image;

