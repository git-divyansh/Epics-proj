import React from 'react'
import "./About.css"

const About = () => {
  return (
    <>
    <div className='about'>
      <div className='about-container'>
        {/* <img className='about-photo'/> */}
        <div className='about-description'>
          <h1 className='about-heading'>About Project</h1>
          <p className='about-me'>
          the process will start with a drug image as input and it will straight away be fed to the 
          Tesseract OCR model, Tesseract OCR consists of trained language models (&gt;192), different 
          kinds of recognition (image as word, text block, vertical text). to extract all 
          the text in the provided image and present it in a digitally accepted text format. The text 
          extracted will be stored in a variable and through the flask API will be sent to out Python 
          script where we use fuzzy search, a fuzzy search is performed using a fuzzy matching algorithm, 
          which returns a list of results based on likely relevance even though search argument words and 
          spellings may not be an exact match. After finding the match, from our dataset of medicine names 
          we will send input of our next model, the web scraping model, our web scraping script will use the 
          stored word and search it on go.drugbank.com. The summary of the drug information will then be 
          displayed as output for the initially provided image.<br/>
          &emsp;&emsp;&emsp;&emsp;&emsp;Our system also caters to the needs of the youth and people of all ages by providing information on 
          side effects and alternative medicines. This increased awareness empowers individuals to make informed 
          decisions regarding their healthcare, ensuring they take the appropriate medications for their specific 
          . However, we strongly emphasize that everyone should only take medication after obtaining a prescription 
          from a doctor, as self-medication can have serious consequences.<br/><br/>
          &emsp;&emsp;&emsp;&emsp;&emsp;During the development of our system, we delved into various modules such as Optical Character Recognition 
          (OCR), Fuzzy searching, and web scraping. Through collaborative efforts, we formulated a comprehensive plan 
          to integrate these modules into the overall model. OCR technology, for instance, automates the extraction of
           data from printed or written text found in scanned documents or image files. It converts the text into a 
           machine-readable format, facilitating data processing tasks such as editing or searching.

          </p>
        </div>
      </div>
      <div className='about-container'>
        <h1 className='heading-2' style={{cursor : "default"}}>CODE SNIPPET</h1>
        <div style={{marginTop : "30px"}}>
          <img className='img' style={{width : "38vw", height : "60vh", borderRadius : "5px", margin: "4px"}} src = {require("./img/python code sinppet 2.jpg")}></img>
          <img className='img' style={{width : "38vw", height : "60vh", borderRadius : "5px", margin: "4px"}} src = {require("./img/python code sinppet 1.jpg")}></img>
          <img className='img' style={{width : "38vw", height : "60vh", borderRadius : "5px", margin: "4px"}} src = {require("./img/python code sinppet 3.jpg")}></img>
          <img className='img' style={{width : "38vw", height : "60vh", borderRadius : "5px", margin: "4px"}} src = {require("./img/dataset.jpg")}></img>
        </div>
      </div>
    </div>
    </>
  )
}

export default About