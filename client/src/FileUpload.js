import React, { Component } from 'react';
import styled from 'styled-components';

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
    
        axios.post('http://localhost:5000/upload', data)
          .then(function (response) {
        this.setState({ uploadStatus: true });
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