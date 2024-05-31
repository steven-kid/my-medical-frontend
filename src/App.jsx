import React, { useEffect, useState } from 'react';
import Left from './components/layout/Left';
import Right from './components/layout/Right';


function App() {

  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className='flex flex-wrap justify-around items-center h-screen'>
      <Left setIsGenerating={setIsGenerating} isGenerating={isGenerating}/>
      <Right setIsGenerating={setIsGenerating} isGenerating={isGenerating}/>
    </div>
  );
}

export default App;
