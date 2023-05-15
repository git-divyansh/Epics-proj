import React, { useEffect } from 'react';
import Tesseract from 'tesseract.js';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [medName, setMedName] = React.useState('');
  const [summary, setSummary] = React.useState('');

  const delay = (ms) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  var count  =0;

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
        setIsLoading(false);
      });
  };

  useEffect (() => {
    // console.log('hellooo')
    GetData()
    function GetData() {
      const result = text
      let res = {
          name: [result],                           //declaring the body to send to API
      };
      console.log(res);
  
      fetch("http://127.0.0.1:2000/", {
          method: "POST",
          body: JSON.stringify({
              name: result,
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          },
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
      <a class="navbar-brand p-3" style = {{fontSize : "200%"}} href="#">Dr.medicine</a>
      <form  style = {{marginRight : "20px"}}>
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>

    </nav>
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mt-0 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <h1 className="text-center py-5 mc-5">Dr.medicine</h1>
          )}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-0"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Convert"
              />
            </>
          )}
      
          {!isLoading && text && (
            <>
            <div className='w-300vw h-50 d-flex justify-content-center' style={{margin : "20px"}}>
              <img className='w-50 h-50' src = {image}></img>
            </div>
            
              <h1>{medName}</h1>
              <textarea
                style = {{width : "40vw", height : "100%", marginLeft : "0"}}
                rows="50"
                value={summary}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
