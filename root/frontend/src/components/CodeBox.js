import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CodeEditor from '@uiw/react-textarea-code-editor';

import { getOutput } from '../actions/response';

const CodeBox = () => {
  // Query = code + language + level
  const [code, setCode] = useState('def add(a, b):\n  return a + b');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setLoading] = useState(false);

  // TODO: Fix React Hook useEffect has missing dependencies warning
  // useEffect runs on every render
  useEffect(() => {
    if (isLoading) {
      const fetchOutput = async () => {
        let temp = await getOutput(code, language, level);
        setOutput(temp);
        setLoading(false);
      }
      fetchOutput();
    }
  // If isLoading updates, the effect will run again
  }, [isLoading]);

  // Triggers on CodeEditor change
  const handleCode = (evt) => {
    setCode(evt.target.value);
  }

  // Triggers on level dropdown change
  const handleLevel = (evt) => {
    setLevel(evt);
  }

  // Triggers on language dropdown change
  const handleLanguage = (evt) => {
    setLanguage(evt);
  }

  // Triggers on submit button click
  const handleSubmit = () => {
    setLoading(true);
  }

  return (
    <div>
      {/* Programming Language Button */}
      <DropdownButton onSelect = {handleLanguage} id = "language" title = {language ? language : 'Programming Language'}>
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
      <DropdownButton onSelect = {handleLevel} id = "level" title = {level ? level : 'Detail Level'}>
        <Dropdown.Item eventKey="low">Low</Dropdown.Item>
        <Dropdown.Item eventKey="high">High</Dropdown.Item>
      </DropdownButton>

      {/* Submit Button */}
      <Button
        id = "submit"
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
        onChange = {handleCode}
        padding = {15}
        data-color-mode = "dark"
        style = {{
          fontSize: 14,
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
          //   backgroundColor: "#f5f5f5"
        }}
      />
      <h4>Language: {language}</h4>
      <h4>Detail Level: {level}</h4>
      <h4>Code: {code}</h4>
      <h4>Output: {output}</h4>
    </div>
  );
}

export default CodeBox;