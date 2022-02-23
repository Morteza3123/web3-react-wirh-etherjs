import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { contractAddress, abi } from './abi';


export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
})


function App() {

  useEffect(() => {
    loadConnect()
    show()
  })

  const [name, setName] = useState()

  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()



  const connect = async () => {
    await activate(injected)
    console.log('success')
    localStorage.setItem('wallet', 'injected')
  }

  const loadConnect = () => {
    const wallet = localStorage.getItem('wallet')
    if(wallet=="injected"){activate(injected)}
  }

  const disConnect = async () => {
    await deactivate(connector)
    localStorage.removeItem('wallet')
  }

  const show = async () => {
    const contract = new ethers.Contract(contractAddress, abi, library)
    const name = await contract.name()
    setName(name)
  }

  const set = async () => {
    const contract = new ethers.Contract(contractAddress, abi, library)
    const signer = library.getSigner()
    const sigContract = contract.connect(signer)
    await sigContract.setName("Goodby world")
  }
  

  return (
    <div className="App">
      <button onClick={() => connect()}>connect</button>
      <button onClick={() => disConnect()}>desConnect</button><br/><br/>
      <button onClick={() => set()}>set</button><br/><br/>

      <p>{account}</p>
      <p>{name}</p>
    </div>
  );
}

export default App;
