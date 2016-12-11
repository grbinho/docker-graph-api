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
          key={item.Id} {... item}
        />)
      );
    }else {
      return <li>No images</li>;
    }

  };

  return (
    <ul>
      {renderImages()}
    </ul>
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