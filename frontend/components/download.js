import React, { useState, useEffect } from 'react';
import '../styles/download.css';

function Downlaod(props) {
  const [thumbUrl, setThumbUrl] = useState('');
  const [title, setTitle] = useState('');
  const [gosterYeniBilesen, setGosterYeniBilesen] = useState(false);
  const [options, setOptions] = useState([]);


  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const indir = (e) => {
    alert("Bu biraz uzun sürebilir! Sunucu patates. Dönüşüm bittiğinde otomatik olarak videoya gidilecek!")
    setTimeout(function() {
      // Bekleme süresi sonunda yapılacak işlem
      setGosterYeniBilesen(false);
    }, 1500);

    const postData = {
      link: props.link,
      res: selectedOption
    };
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    
    fetch('https://mp4api.deno832.net/indir', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('POST işlemi başarılı:', data);
        window.open("https://mp4api.deno832.net/videos/" + data.filename);

      })
      .catch(error => {
        console.error('POST işlemi hatası:', error);
      });



  };

  useEffect(() => {
    const url = 'https://mp4api.deno832.net/bilgi';
    const veri = {
      link: props.link
    };

    const secenekler = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(veri)
    };

    fetch(url, secenekler)
      .then(response => {
        if (!response.ok) {
          throw new Error('İstek başarısız!');
        }
        return response.json();
      })
      .then(data => {
        console.log('İstek başarılı! Yanıt:', data);
        const thumbUrlz = data.Thumbnail_url;
        setThumbUrl(thumbUrlz);
        setTitle(data.Title);
        setGosterYeniBilesen(true);
        setOptions(data.Resolutions);
      })
      .catch(error => {
        console.error('İstek hatası:', error);
      });
  }, [props.link]);

  return (
    <div>
      {gosterYeniBilesen ? (
        <div style={{display: 'flex'}}>
        <img id='thumb' src={thumbUrl} alt="Açıklama" />
        <h1 id='title'>{title} </h1>

        <select id='combobox' value={selectedOption} onChange={handleSelectChange}>
        <option value="">Lütfen seçin</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        </select>
          
        <button onClick={indir} class="btn-download yukari" id="btn-auto-click">
          <div class="arrow"></div>
        </button>
      </div>

      
      ) : (
        <div id='center_div'>
          <img id='loading_gif' src="https://i.ibb.co/FXxGsyF/loading.gif" alt="Yükleniyor..." />
        </div>
      )}
    </div>
  );
}

export default Downlaod;
