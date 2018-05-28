import React, { Component } from 'react';
import styled from 'styled-components';
import reactlogo from './logo.svg';
import linkedin from './linkedin.png';
import github from './github.png';
import nodejs from './nodejslogo.png';
import FileUpload from './FileUpload';


// Styling
const PageDiv = styled.div`
    background-color: transparent;
    overflow:hidden;
    height: 100%;
    width:100%;
    margin:auto;
    display: flex;
    flex-flow: column;  
`;

const HeaderDiv = styled.div`
    background-color: #F9FAFE;
    overflow:hidden;
    min-height: 80px;
    height: 10%;
    width:100%;
    position: fixed;
    display: flex;
    flex-flow: row nonwrap;
    flex-shrink: 0;
    justify-content: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
    margin:auto;

    `;
const FooterDiv = styled.div`
    background-color: #F9FAFE;
    padding:0;
    min-height: 50px;
    height: 7%;
    overflow:hidden;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2), 0 0 3px 1px rgba(0, 0, 0, 0.19);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    
`;
const TitleDiv = styled.div`
    height:100%;
    overflow:hidden;
    width: 70%;
    margin:auto;
    float: left;
`;

const MainDiv = styled.div`
    background-color: transparent;
    height:100%;
    overflow:hidden;
    float:left;
    width: 100%;
    display: inline;
    margin-top: 5%;
    
`;
const InputDiv = styled.div`
    background-color: white;
    height:100%;
    overflow:hidden;
    float:left;
    width: 50%;

`;
const OutputDiv = styled.div`
    background-color: white;
    height:100%;
    overflow:hidden;
    float:right;
    width: 50%;
    
`;

const LogoDiv = styled.div`
    background-color: transparent;
    padding:0;
    height:100%;
    overflow:hidden;
    width: 20%;
    min-width: 20%;
    display: inline;
    margin:auto;
    float:right;
`;

const Logo = styled.img`
    height: 55%;
    margin: 6% auto;
    overflow:hidden;

    `;

const LogoLink = styled.img`
    height: 75%;
    padding: 0.8%;
    overflow:hidden;

`;

const LogoLinkLeft = LogoLink.extend`
    float: right;
`;
const LogoLinkRight = LogoLink.extend`
    float: left;

`;
const Link = styled.a`
    text-color: gray;
    height: 100%;
    width: 40%;
    margin:0 auto;
    overflow:hidden;
`;

const Text = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-size: 1.7em;
    font-weight:400;
    text-align: center;
    color: #235BD6;
    overflow:hidden;
`;

const HeaderText = Text.extend`
    position: absolute;
    left: 40%;
`;

const FooterText = Text.extend`
    font-size: 1.2em;
    color: #595E76;
`;

const FunctionText = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-size: 1.7em;
    font-weight:500;
    text-align: center;
    color: #2536BA;
    overflow:hidden;
    padding-left: 4%;
    padding-right: 4%;
    padding-top: 4%;
    margin: auto;
    width: 100%;
`;

const FunctionLeftText = FunctionText.extend`
    float: left;
    text-align: left;

`;

const FunctionRightText = FunctionText.extend`
    float: right;
    text-align: right;

`;
const DescriptionText = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-size: 1.0em;
    font-weight:400;
    text-align: center;
    color: #6D6E73;
    overflow:hidden;
    padding-left: 4%;
    padding-right: 4%;

`;

const DescriptionLeftText = DescriptionText.extend`
    float: left;
    text-align: left;

`;

const DescriptionRightText = DescriptionText.extend`
    float: right;
    text-align: right;

`;


// Main component
class App extends Component {

  render() {
    return (
      <PageDiv className="ClassAppDevChallengePage">
        
        {/* Header */}
        <HeaderDiv>
          <TitleDiv>
            <HeaderText>ClassApp Dev Challenge</HeaderText>
          </TitleDiv>
          <LogoDiv>
              <Logo src={reactlogo} alt="reactlogo" />          
              <Logo src={nodejs} alt="nodejslogo" />
          </LogoDiv>
        </HeaderDiv>

        {/* Main page content */}
        <MainDiv>
          <InputDiv> 
            <FunctionLeftText>Input</FunctionLeftText>
            <DescriptionLeftText>An input.csv file.</DescriptionLeftText>         
    
          </InputDiv>

          <OutputDiv>
            <FunctionRightText>Output</FunctionRightText> 
            <DescriptionRightText>An output.json file, that contains the parsed and organized content from input.csv. <br/>The JSON order is not important, but content is.</DescriptionRightText>         
 
          </OutputDiv>
          {/* File upload form */}
          <FileUpload />
        </MainDiv>

        {/* Footer */}
        <FooterDiv>
          <Link href="https://www.github.com/ruycastilho"><LogoLinkLeft alt="githublogo" src={github}/></Link>                    
          <FooterText>Ruy Castilho Barrichelo</FooterText>
          <Link href="https://www.linkedin.com/in/ruycastilho"><LogoLinkRight alt="linkedinlogo" src={linkedin}/></Link>          

        </FooterDiv>
      </PageDiv>
    );
  }
}

export default App;