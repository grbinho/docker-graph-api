import React from 'react';

const Image = ({Id, Repository, Tag}) => {
  return (
    <tr>
      <td>
        {Id.split(':')[1].substr(0,12)}
      </td>
      <td>
        {Repository}
      </td>
      <td>
        {Tag}
      </td>
    </tr>
  )
};

export default Image;

