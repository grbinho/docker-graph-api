import React, { PropTypes } from 'react';
import Image from './Image';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const Images = ({data}) => {
  const renderImages = () => {
    if(data.images) {

      console.log(data.images);

      return data.images.map((item) =>
        (<Image
          key={`${item.Id}_${item.Repository}_${item.Tag}`} {... item}
        />)
      );
    }else {
      return <div>No images</div>;
    }

  };

  return (
    <table>
      <thead>
        <th>Id</th>
        <th>Repository</th>
        <th>Tag</th>
      </thead>
      <tbody>{renderImages()}</tbody>
    </table>
  )
};

Images.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      repository: PropTypes.string,
      tag: PropTypes.string
    }))
  }).isRequired,
};

// We use the gql tag to parse our query string into a query document
const DockerImagesQuery = gql`
  {
    images {
      Id
      Repository
      Tag
      Created
      Size
    }
  }`;

const ImagesWithData = graphql(DockerImagesQuery)(Images);

export default ImagesWithData;