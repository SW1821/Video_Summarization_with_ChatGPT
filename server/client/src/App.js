import React,{ useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [video, setVideo] = useState("");
  const [videoState, setVideoState] = useState("");
  const [loading, setLoading] = useState("");
  const [opt1, setOPT1] = useState("0.2");
  const [opt2, setOPT2] = useState("no");

  const onClickSubmit = (e) => {
    e.preventDefault();
  };

  const onClickSelect1 = (e) => {
    setOPT1(e.target.value);
  }
  const onClickSelect2 = (e) => {
    setOPT2(e.target.value);
  }


  const onClickChange = (e) => {
        setText(e.target.value);
        setVideo(`${e.target.value.slice(-4)}.mp4`);
  };

  
  const onClickClear = (e) => {
      setText("")
      setMessage("")
      setLoading("")
      setVideoState("")   
      setOPT1("")
      setOPT2("") 
  };

  const onClickEnter = async (e) => {

    setLoading(true);
    const url = "http://localhost:5000/post"; //144.24.80.128
    //const url = "http://144.24.80.128:5000/post"
    try {
        await axios.post(url,{
        name: text,
        keyword1 :opt1,
        keyword2 :opt2,
        });
        setLoading("");
        setVideoState(true);
        setMessage("200");
    } catch(err) {
        console.log(err)
    };
  }

  const onClickDown = async () => {
    const videoUrl = `http://localhost:5000/summaryVideo_${video}`
    console.log(message)
    //const videoUrl = `http://144.24.80.128:5000/${video}`
    const fechData = await fetch(videoUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = window.URL.createObjectURL(new Blob([blob]))
      const fileName = videoUrl.split("/").pop();
      const aTag = document.createElement("a");
  
      aTag.href = blobURL;
      aTag.setAttribute("download", fileName);
  
      document.body.appendChild(aTag);

      aTag.click();
      aTag.remove();
    })
  
    return fechData;
    
  }

    return (
      <div className="App">
        <header className="App-header">
          <a href='./'>
            <img className="logo" src="./logo192.png" alt="logo" width="30" height="30"/>
            Video Summary
          </a>
          <p>SW1821</p>
          </header>
          <div className='enter_url'>
              <p className='enter_url_p'>🔹 Enter Your URL 🔹</p>
              <div className='options'>
                  <form id="optsForm" onSubmit={onClickSubmit}>
                    <input id="youtube_url" onChange={onClickChange} value={text}/>
                    <p id="opt_p" htmlFor="opts">🔽 Choose Options for Performance 🔽</p>
                      <label>COS Similarity Level</label>
                      <select id="select_opt1" onChange={onClickSelect1} value={opt1}>
                              <option value="0.1">0.1</option>
                              <option value="0.2">0.2</option>
                              <option value="0.3">0.3</option>
                      </select>
                      <label>Caption</label>
                          <select id="select_opt2" onChange={onClickSelect2} value={opt2}>
                              <option value="no">no</option>
                              <option value="add">add</option>
                          </select>
                      <div className='buttons'>
                        <button id="send_url" onClick={onClickEnter}>ENTER</button>
                        <button id="clear" onClick={onClickClear}>CLEAR</button>
                      </div>
                  </form>
              </div>
          </div>
          <div>
            {loading ? <div className="Loader"/> 
              : (videoState ? 
                <div className='Done'>
                  
                  <button id="download_btn" onClick={() => onClickDown()}>Download</button>
                  <video width="320" height="240" controls>
                    <source src={`http://localhost:5000/summaryVideo_${video}`} type="video/mp4"/>
                  </video>
                </div> : <></>
                ) 
            }
          </div>
      </div>
      )
};


export default App;