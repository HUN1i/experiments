import styled from 'styled-components';
import GlobalStyle from './globalStyle';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [sseData, setSseData] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const fetchSSE = () => {
    setSseData('');
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: message,
      }),
    })
      .then((response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const readChunk = () => {
          return reader.read().then(appendChunks);
        };

        const appendChunks = (result) => {
          const chunk = decoder.decode(result.value || new Uint8Array(), {
            stream: !result.done,
          });
          const parseData = JSON.stringify(chunk).replace(/['"]/g, '');
          setSseData((prevString) =>
            (prevString + parseData).replace('\\', '').replace('n', '')
          );

          if (!result.done) {
            return readChunk();
          }
        };

        return readChunk();
      })
      .catch((e) => {
        // 에러 처리
      });
  };
  return (
    <div>
      <GlobalStyle />
      <WideDiv>
        <LogoDiv>@ㅐ미GPT</LogoDiv>

        <br></br>
        <InputDiv
          type="text"
          value={message}
          onChange={handleInputChange}
        ></InputDiv>
        <Button onClick={fetchSSE}>날려라</Button>
        <div></div>
        <FooterDiv
          type="text"
          value={sseData}
          onChange={({ target: { value } }) => setSseData(value)}
        />
      </WideDiv>
    </div>
  );
}

const InputDiv = styled.input`
  width: 20vw;
  height: 10vh;
`;
const WideDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;
const LogoDiv = styled.div`
  width: 100vw;
  height: 15vh;
  font-size: 50px;
  text-align: center;
`;
const Button = styled.button`
  background-color: #3498db;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FooterDiv = styled.textarea`
  width: 50vw;
  min-height: 70vh;
  height: fit-content;
  font-size: 20px;
  overflow: auto;
  background-color: wheat;
`;
export default App;
