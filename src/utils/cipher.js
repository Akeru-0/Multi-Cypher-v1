const Cipher = {
    encode: (text, key) => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        result += String.fromCharCode((charCode + keyChar) % 256);
      }
      return result;
    },
  
    decode: (text, key) => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        result += String.fromCharCode((charCode - keyChar + 256) % 256);
      }
      return result;
    },
  
    caesarEncode: (text, shift) => {
    shift = parseInt(shift) % 26;
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if ((code >= 65 && code <= 90)) { // Uppercase
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      if ((code >= 97 && code <= 122)) { // Lowercase
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;
    }).join('');
  },

  caesarDecode: (text, shift) => {
    shift = parseInt(shift) % 26;
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if ((code >= 65 && code <= 90)) { // Uppercase
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }
      if ((code >= 97 && code <= 122)) { // Lowercase
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
      return char;
    }).join('');
  }
};
  export default Cipher;