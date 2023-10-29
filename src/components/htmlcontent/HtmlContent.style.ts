import styled, { css } from 'styled-components'

export const HtmlContentCSS = css`
  #content #legend span {
    font-family: Menlo, monospace;
    font-weight: bold;
  }

  #topbar {
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 42px;
    border-bottom: 1px solid rgb(80, 80, 80);
  }
  #content {
    margin-top: 50px;
    font-size: large;
    border: 10px;
    border-color: black;
    border-width: 10px;
  }
  #nav,
  #legend {
    float: left;
    margin-left: 10px;
  }
  #legend {
    margin-top: 12px;
  }
  #nav {
    margin-top: 10px;
  }
  #legend span {
    margin: 0 5px;
  }
  .cov0 {
    color: rgb(192, 0, 0);
  }
  .cov1 {
    color: rgb(128, 128, 128);
  }
  .cov2 {
    color: rgb(116, 140, 131);
  }
  .cov3 {
    color: rgb(104, 152, 134);
  }
  .cov4 {
    color: rgb(92, 164, 137);
  }
  .cov5 {
    color: rgb(80, 176, 140);
  }
  .cov6 {
    color: rgb(68, 188, 143);
  }
  .cov7 {
    color: rgb(56, 200, 146);
  }
  .cov8 {
    color: rgb(44, 212, 149);
  }
  .cov9 {
    color: rgb(32, 224, 152);
  }
  .cov10 {
    color: rgb(20, 236, 155);
  }
`

export const HtmlContentContainer = styled.div`
  ${HtmlContentCSS}

  background-color: black;
  padding-left: 10px;
  .file {
    font-size: x-large;
    font-weight: bold;
    color: white;
  }
`
