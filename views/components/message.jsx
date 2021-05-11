import React from 'react';

function Message(props) {
  if (props.messages)
    return (
      <ul>
      {
        props.messages.map(m => (
          <li className="text-center list-unstyled mt-2" style={{color: "red"}}>{m.msg}</li>
        ))
      }
      </ul>
    );
  else 
      return <> </>;
}
module.exports = Message;