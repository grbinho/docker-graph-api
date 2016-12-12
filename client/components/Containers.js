import React, { PropTypes } from 'react';
import { Icon, Table } from 'semantic-ui-react'
import Container from './Container';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const Containers = ({data}) => {
  const renderContainers = () => {
    if(data.containers) {
      return data.containers.map((item) =>
        (<Container
          key={item.Id} {... item}
        />)
      );
    }else {
      return <Table.Row>
        <Table.Cell> No items</Table.Cell>
      </Table.Row>;
    }

  };

  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell>State</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {renderContainers()}
      </Table.Body>
    </Table>
  )
};

Containers.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    containers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      dockerImage: PropTypes.string,
      state: PropTypes.string,
      name: PropTypes.string
    }))
  }).isRequired,
};

// We use the gql tag to parse our query string into a query document
const DockerContainersQuery = gql`
  {
    containers {
      Id
      DockerImage: Image
      State
      Name
    }
  }`;

const ContainersWithData = graphql(DockerContainersQuery)(Containers);

export default ContainersWithData;