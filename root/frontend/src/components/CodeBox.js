import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeBox = () => {
  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}');
  var language = 'python';

  return (
    <CodeEditor
      value = {code}
      language = {language}
      placeholder = "Enter code here"
      onChange = {(event) => setCode(event.target.value)}
      padding = {15}
      data-color-mode = "dark"
      style = {{
        fontSize: 14,
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
        //   backgroundColor: "#f5f5f5"
      }}
    />
  );
}
  
export default CodeBox;