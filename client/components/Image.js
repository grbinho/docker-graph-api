import React from 'react';

const Image = ({Id, Repository, Tag}) => {
  return (
    <li>
      {`${Repository}:${Tag}`}
    </li>
  )
};

export default Image;

