import React, { useEffect } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import * as Cheerio from "cheerio";


const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [medName, setMedName] = React.useState('');
 



  useEffect(() => {
    console.log(text);
  })


  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });   
  
  };

  useEffect(() => {
    console.log('hellooo')
    GetData()
    function GetData() {
      var result = text
      let res = {//declaring the body to send to API
          name: [result],
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
              setMedName(medname)
              console.log(medname)
          })
          .catch((err) => {
              console.log("Fetch Error :-S", err);
          });

          // const componentDidMount = () => {
          //   const url = "https://www.drugs.com/" + `${medName}`
          //   console.log(url)
          //   axios.get()
          //     .then(response => {
          //       // Process the HTML response
          //       const html = response.data
          //       const $ = Cheerio.load(html);
          //       const articles = $(".row h-100");
          //       const drugNames = $(articles)
          //       .map((index, element) => $(element).text())
          //       .get();

          //       console.log(drugNames)
          //     })
          //     .catch(error => {
          //       // Handle any errors
          //       console.log(error)
          //     });
          // }
          // componentDidMount()
  
  }
    
},[text]);

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
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
                className="form-control mt-5 mb-2"
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
            <div className='d-flex justify-content-center'>
              <img className='w-50 h-50' src = {image}></img>
            </div>
              <textarea
                className="form-control w-100 mt-0"
                rows="30"
                // value={(string != "" && isLoading == false ? {handleImageOutput}: "")} 
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
