import React, { useEffect } from 'react';
import Tesseract from 'tesseract.js';
import About from './About';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [medName, setMedName] = React.useState('');
  const [summary, setSummary] = React.useState('');

  useEffect(() =>{
    setIsLoading(false)
  },[summary])

  const count = 0;

  const handleSubmit = async () => {

    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
            setProgress(parseInt(count + 1));
            count = count + 1;
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        setText(result.data.text);
      });
  };

  useEffect (() => {
    GetData()
    function GetData() {
      const result = text
      let res = {
          name: [result],                           //declaring the body to send to API
      };
      console.log(res);
  
      fetch("http://127.0.0.1:2000", {
          method: "POST",
          body: JSON.stringify({
              name: result,
          }),
          headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
          },
          mode : 'cors'
      })
          .then((response) => {
              if (response.status !== 200) {
                  console.log(
                      "Looks like there was a problem. Status Code: " + response.status
                  );
                  return;
              }
  
              console.log(response.headers.get("Content-Type"));
              return response.json();
          })
          .then((myJson) => {
              console.log(JSON.stringify(myJson));
              var medname = myJson.name;
              var sum = myJson.summary;

              setMedName(medname)
              setSummary(sum)
              // console.log(medname)
          })
          .catch((err) => {
              console.log("Fetch Error :-S", err);
          });
  }
    
},[text]);

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex" style={{justifyContent : "space-between"}}>
      <a class="navbar-brand p-3" style = {{fontSize : "200%", fontWeight: "bold"}} >Dr.medicine</a>
      <form  style = {{marginRight : "20px"}}>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">About</button>
    </form>

    </nav>
    <div className="container">
      <div className="row h-100">
        <div className="">
          {!isLoading && (
            <h1 className="text-center py-5 mc-5">Dr.medicine</h1>
          )}
          {!isLoading && text &&(
            <>
            <div className='container-div'>
              <img className='med-image' src = {image}></img>
              <div className='cont'>
                <h1 className='heading-medname'>{medName}</h1>
                <textarea
                  className='description'
                  value={summary}
                  onChange={(e) => setText(e.target.value)}
                  ></textarea>
              </div>
            </div>
            </>
          )}
          {!isLoading && !text &&(
            <>
              <div className='container-input'>
                <input
                  type="file"
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                  className="form-control mt-5 mb-0 w-50"
                />
                <input
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary mt-5"
                  value="Convert"
                />
              </div>
            </>
          )}
          {isLoading &&(
            <>
              <div className='progress-container'>
                <progress className="form-control" style={{width : "600px"}} value={progress} max="100">
                  {progress}%{' '}
                </progress>{' '}
                <p className="progress-bar">Converting:- {progress} %</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    <About />

    </>
  );
};

export default App;
