import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.images.length } images.
    { props.images.map(item => <ListItem image={item}/>)}
  </div>
)

export default List;
