import React from 'react';
import '../styles/ana.css';
import Download from './download';
import { useState } from 'react';

function Ana() {
  const [gosterYeniBilesen, setGosterYeniBilesen] = useState(false);

  const [textInputValue, setTextInputValue] = useState('');

  const handleInputChange = (event) => {
    setTextInputValue(event.target.value);
  };


  function tiklama() {
    setTimeout(function() {
      // Bekleme süresi sonunda yapılacak işlem
      setGosterYeniBilesen(true);
    }, 1500); // 2000 milisaniye (2 saniye)
    
  }

  return (
    <div id='container'>
      {gosterYeniBilesen ? (
        <Download link= {textInputValue} />
      ) : (
        <div>
          <div id="centering">
            <h1 id='emir'>YouTube Linkini Yapıştır!</h1>
          </div>

          <div id="centering">
            <input value={textInputValue} onChange={handleInputChange} type="text" name="" id="link_input" />
          </div>

          <div id="centering" className='yukarıdan'>
            <div>
              <button onClick={tiklama} class="btn-download" id="btn-auto-click">
                <div class="arrow"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ana;