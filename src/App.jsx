import { useState } from 'react'
import './App.css'

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const data = {
  lugar: 'San Miguel de Tucuman',
  fecha: '14 de junio de 2022',
  identificador:'3771/5'
}


function App() {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const generateDocument = () => {
    loadFile(
      //'https://docxtemplater.com/tag-example.docx',
      URL.createObjectURL(file),
      function (error, content) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        doc.setData(data);
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
                {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function (error) {
                return error.properties.explanation;
              })
              .join('\n');
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        var out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI
        saveAs(out, 'output.docx');
      }
    );
  };

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
  console.log(date)

  return (
    <div className="App">
      <input type="date" defaultValue='2022-6-9' />
      <label>Lugar:</label>
      <input type="text"></input>
      <input type="file" onChange={e => handleFile(e)} />
      <button onClick={generateDocument} >Generar docx</button>
    </div>
  )
}

export default App
