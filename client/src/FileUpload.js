import React, { Component } from 'react';
import styled from 'styled-components';

// Modules Used:

// Axios : API calls
const axios = require('axios');

const FileDiv = styled.div`
    background-color: transparent;
    padding:0;
    height:100%;
    overflow:hidden;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin:auto;
    position: absolute;
    bottom: 0;
`;
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #235BD6;
  background: transparent;
  border: solid 1px;
`;
const Form = styled.form`
    margin: 0 auto;
`;

class FileUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            uploadStatus: false
          }
        this.handleUpload = this.handleUpload.bind(this);
    }
   
    handleUpload(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        alert("!");

        axios.post('https://classapp-dev-challenge.herokuapp.com/upload', data)
          .then(function (response) {
            alert("!");
            // axios.get('https://classapp-dev-challenge.herokuapp.com/download')
            // .catch(function (error) {
            //   console.log(error);
            // });

          })
          .catch(function (error) {
            console.log(error);
          });
    }

   render() {
     return(
        <FileDiv>
            <Form onSubmit={this.handleUpload} >
                <Input type="file" name="csv" ref={(ref) => { this.uploadInput = ref; }}></Input>
                <Input type="submit" name="submit" value="Upload .CSV File"></Input>
            </Form>
        </FileDiv>
     )
   }
 }
 export default FileUpload;