import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (!charset) return;

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(generated);

    const result = zxcvbn(generated);
    setStrength(result.score);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Password Generator</h2>
      <div>
        <label>
          Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="4"
            max="32"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include uppercase letters
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include lowercase letters
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include symbols
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      {password && (
        <div style={{ marginTop: '1rem' }}>
          <input type="text" value={password} readOnly style={{ width: '100%' }} />
          <button onClick={copyToClipboard}>Copy to clipboard</button>
          {strength !== null && (
            <div>
              <p>Password Strength: {['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
