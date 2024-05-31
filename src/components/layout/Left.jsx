import React from 'react'

import Message from '../message/Message';

function Left({ isGenerating, setIsGenerating }) {

  return (
    <div style={{position: "relative"}}>
      {isGenerating ? (
        <img src="./Doctor.gif" style={{ height: '500px' }} />
      ) : (
        <img src="./Doctor.png" style={{ height: '500px' }} />
      )}
      {isGenerating ? <Message setIsGenerating={setIsGenerating}/> : null} 
    </div>
  );
}

export default Left