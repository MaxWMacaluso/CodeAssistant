import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CodeEditor from '@uiw/react-textarea-code-editor';

// TODO: Replace with call to app-server
function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

const CodeButtons = () => {
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}');
  var language = 'python';

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {setLoading(false)});
    }
  }, [isLoading]);

  // TODO: Alter
  const handleSubmit = () => {
    console.log(code);
    setLoading(true);
  };

  // TODO: Alter
  const handleLanguage = (evt) => {
    console.log(evt);
  };

  // TODO: Alter
  const handleLevel = (evt) => {
    console.log(evt);
  };

  return (
    <div>
      {/* Programming Language Button */}
      <DropdownButton onSelect = {handleLanguage} id = "language" title = "Programming Language">
        <Dropdown.Item eventKey="python">Python</Dropdown.Item>
        <Dropdown.Item eventKey="javascript">Javascript</Dropdown.Item>
        <Dropdown.Item eventKey="go">Go</Dropdown.Item>
        <Dropdown.Item eventKey="perl">Perl</Dropdown.Item>
        <Dropdown.Item eventKey="php">PHP</Dropdown.Item>
        <Dropdown.Item eventKey="ruby">Ruby</Dropdown.Item>
        <Dropdown.Item eventKey="swift">Swift</Dropdown.Item>
        <Dropdown.Item eventKey="typescript">TypeScript</Dropdown.Item>
        <Dropdown.Item eventKey="sql">SQL</Dropdown.Item>
        <Dropdown.Item eventKey="shell">Shell</Dropdown.Item>
      </DropdownButton>

      {/* Abstraction Level Button */}
      <DropdownButton onSelect = {handleLevel} id = "level" title = "Level">
        <Dropdown.Item eventKey="low">Low</Dropdown.Item>
        <Dropdown.Item eventKey="high">High</Dropdown.Item>
      </DropdownButton>

      {/* Submit Button */}
      <Button
        variant = "primary"
        disabled = {isLoading}
        onClick = {!isLoading ? handleSubmit : null}
      >
        {isLoading ? 'Loading…' : 'Submit'}
      </Button>

      {/* Code Sandbox */}
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
    </div>
  );
}

export default CodeButtons;