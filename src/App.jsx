import { useState } from 'react';
import Cipher from './utils/cipher';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [cipherType, setCipherType] = useState('custom');
  const [customKey, setCustomKey] = useState('secret');
  const [aesKey, setAesKey] = useState('');
  const [rsaPublicKey, setRsaPublicKey] = useState('');
  const [rsaPrivateKey, setRsaPrivateKey] = useState('');
  const [caesarShift, setCaesarShift] = useState(3);

  const handleEncode = () => {
    try {
      let result;
      switch(cipherType) {
        case 'custom':
          result = Cipher.encode(inputText, customKey);
          break;
        case 'aes':
          result = CryptoJS.AES.encrypt(inputText, aesKey).toString();
          break;
        case 'rsa':
          const encrypt = new JSEncrypt();
          encrypt.setPublicKey(rsaPublicKey);
          result = encrypt.encrypt(inputText);
          break;
        case 'caesar':
          result = Cipher.caesarEncode(inputText, caesarShift);
          break;
      }
      setOutputText(result || 'Encryption failed');
    } catch (error) {
      setOutputText('Error: ' + error.message);
    }
  };

  const handleDecode = () => {
    try {
      let result;
      switch(cipherType) {
        case 'custom':
          result = Cipher.decode(inputText, customKey);
          break;
        case 'aes':
          result = CryptoJS.AES.decrypt(inputText, aesKey).toString(CryptoJS.enc.Utf8);
          break;
        case 'rsa':
          const decrypt = new JSEncrypt();
          decrypt.setPrivateKey(rsaPrivateKey);
          result = decrypt.decrypt(inputText);
          break;
        case 'caesar':
          result = Cipher.caesarDecode(inputText, caesarShift);
          break;
      }
      setOutputText(result || 'Decryption failed');
    } catch (error) {
      setOutputText('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Multi-cypher Framework</h1>
      <div className="control-group">
        <label>
          Cipher Type:
          <select value={cipherType} onChange={(e) => setCipherType(e.target.value)}>
            <option value="custom">Custom Cipher</option>
            <option value="caesar">Caesar Cipher</option>
            <option value="aes">AES</option>
            <option value="rsa">RSA</option>
          </select>
        </label>
      </div>
      {cipherType === 'caesar' && (
        <div className="control-group">
         <label>
          Shift Amount:
          <input
            type="number"
            min="1"
            max="25"
            value={caesarShift}
            onChange={(e) => setCaesarShift(Math.max(1, Math.min(25, e.target.value)))}
          />
          </label>
        </div>
      )}
      

      {cipherType === 'rsa' ? (
        <>
          <div className="control-group">
            <label>
              Public Key:
              <textarea
                value={rsaPublicKey}
                onChange={(e) => setRsaPublicKey(e.target.value)}
                placeholder="Paste RSA public key here"
                className="key-input"
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Private Key:
              <textarea
                value={rsaPrivateKey}
                onChange={(e) => setRsaPrivateKey(e.target.value)}
                placeholder="Paste RSA private key here"
                className="key-input"
              />
            </label>
          </div>
        </>
      ) : (
        <div className="control-group">
          <label>
            {cipherType === 'aes' ? 'AES Key:' : 'Custom Key:'}
            <input
              type="text"
              value={cipherType === 'aes' ? aesKey : customKey}
              onChange={(e) => cipherType === 'aes' ? setAesKey(e.target.value) : setCustomKey(e.target.value)}
            />
          </label>
        </div>
      )}

      <div className="control-group">
        <label>
          Text:
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
      </div>

      <div className="button-group">
        <button onClick={handleEncode}>Encode</button>
        <button onClick={handleDecode}>Decode</button>
      </div>

      <div className="control-group">
        <label>
          Result:
          <textarea
            value={outputText}
            readOnly
          />
        </label>
      </div>
    </div>
  );
}

export default App;