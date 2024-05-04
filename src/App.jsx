import { useCallback, useEffect, useState, useRef} from "react";

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook  
  const passwordRef = useRef(null)

  // password generation function
  const passwordGenerator = useCallback(()=>{
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%&*()_+~?{}[]`";

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      setPassword(pass)
    }
  },[length, numberAllowed, charAllowed, setPassword])

  // copy password to clipboard
  const copyPasswordToClipboard = useCallback(()=>{
   
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101);
  },[password])
   

  // run passwordGenerator() if any changes of below mentioned  [dependencies]
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, setPassword, passwordGenerator])


  // jsx code 
  return (
    <div className="mx-auto max-w-lg rounded-md p-8 mt-4 bg-gray-700">
      <h1 className=" text-center text-white text-2xl  font-bold">
        Password Generator
      </h1>
      <div className="flex py-4">
        <input 
          type="text"
          placeholder="password"
          value={password} 
          className="w-full outline-none text-orange-500 py-1 px-3"
          readOnly
          ref={passwordRef}
          
        />
        <button 
        onClick={copyPasswordToClipboard}
        className="bg-blue-500 py-1 px-3 cursor-pointer">Copy</button>
      </div>

      <div className="flex">
        <div className="flex pr-4">
          <input
            type="range"
            min={8}
            max={100}
            id="rangeInput"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="rangeInput" className="mx-2 text-orange-500">
            length({length})
          </label>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput" className="mx-2 text-orange-500">
            Numbers
          </label>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput" className="mx-2 text-orange-500">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
