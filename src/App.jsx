import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  const selectInputPassword = useCallback(() => {
    inputRef.current?.select();
  }, [inputRef]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(inputRef.current);
  };

  const generatedPassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    let pass = "";

    if (charAllowed) str += "!#$%^&*()+=_-[]{}";
    if (numAllowed) str += "123456789";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

  useEffect(() => {
    generatedPassword();
  }, [length, charAllowed, numAllowed, generatedPassword]);

  return (
    <>
      <div className=" bg-gray-600 p-8 w-1/2 mx-auto my-40 rounded-lg space-y-4">
        <div className="flex justify-center">
          <input
            ref={inputRef}
            className="px-11 py-2 rounded-md text-orange-400"
            type="text"
            value={password}
          />
          <button
            className="bg-blue-600 text-white py-2 px-3 rounded-lg"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="space-x-3">
          <input
            type="range"
            max={100}
            min={8}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-orange-400">{length}</label>
          <input
            type="checkbox"
            id="charAllowed"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charAllowed" className="text-orange-400">
            Include Character
          </label>
          <input
            type="checkbox"
            id="numAllowed"
            checked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="numAllowed" className="text-orange-400">
            Include Number
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
