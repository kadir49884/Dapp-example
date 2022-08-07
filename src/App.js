import "./App.css";
import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import Movie from "./Movie.json";
import { useMovieContract } from "./hooks/useMovieContract";

// Deploy sonrası verdiği adresi buraya giriyoruz

// const greeterAddress = "0x90b18f49B8484e6799CDAAf56Bc4198550180eB5"

function App() {
  const [account, setAccount] = useState();
  const [data, getData] = useState(BigNumber.from(5));
  const [provider, setProvider] = useState();
  const movieContract = useMovieContract();

  function connectWallet() {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => setAccount(accounts[0]))
      .catch((err) => console.log(err));

  }

  const viewMovieInfo = async () => {
    if (!movieContract) return;
    const result = await movieContract.getMovie();
    getData(result);
  };

  const addMovie = async () => {
    if (!movieContract) return;
    const transaction = movieContract.addMovie();
    await transaction.wait();
  };



  return (
    <div className="App">
      <header className="App-header">
        <button
          className="Connect-Button"
          onClick={() => {
            if (account) return;
            connectWallet();
          }}
        >
          Connect Wallet
        </button>

        <button
          className="Token-Button"
          onClick={() => {
            if (account) return;
            viewMovieInfo();
          }}
        >
          Get Token
        </button>
        <p>Info : {String(data)}</p>
      </header>
    </div>
  );
}

export default App;
