import "./App.css";
import { useState, useEffect } from "react";
import { useMovieContract } from "./hooks/useMovieContract";
import { usePetrichorContract } from "./hooks/usePetrichorContract";
// import { useAllowance } from "./hooks/useAllowance";
// import { formatEther } from "ethers/lib/utils";
import { useSignerAddress } from "./hooks/useSignerAddress";
import { ethers } from "ethers";
import ReactPlayer from "react-player";

function App() {
  const [backendData, setBackendData] = useState({});
  const [movieId, setMovieId] = useState(3);
  // const [data, getData] = useState("");
  const [value, setValue] = useState("");

  // const [provider, setProvider] = useState();
  const movieContract = useMovieContract();
  const petrichorContract = usePetrichorContract();
  // const { approve, allowance, isAppoving } = useAllowance();
  const [isLocking, setIsLocking] = useState(false);
  const { signerAddress } = useSignerAddress();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [petrichorOwnerAddress, setPetrichorOwnerAddress] = useState(null);

  useEffect(() => {
    fetch(`/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const getSignerBalance = async () => {
    if (!petrichorContract) return;
    try {
      setPetrichorOwnerAddress(await petrichorContract.ownerAddress());
      setTokenBalance(await petrichorContract.balanceOf(signerAddress));
    } catch {}
  };

  const addToken = async () => {
    if (!movieContract && !petrichorContract) return;
    const etherValue = ethers.utils.parseEther("1");
    setIsLocking(true);

    try {
      await movieContract.transferFrom(
        petrichorOwnerAddress,
        signerAddress,
        etherValue
      );
      setIsLocking(false);
    } catch {
      setIsLocking(false);
    }
  };

  // useEffect(() => {
  //   getPetrichorContract();
  // }, []);

  // const getPetrichorContract = async () => {
  //   if (!petrichorContract) return;
  //   try {
  //     setPetrichorOwnerAddress(await petrichorContract.ownerAddress());
  //   } catch {}
  // };

  // const getBalance = async () => {
  //   if (!petrichorContract) return;
  //   setIsLocking(true);
  //   try {
  //     const txn = await petrichorContract.getBalance(movieContract.account);
  //     await txn.wait();
  //     setIsLocking(false);
  //   } catch {
  //     setIsLocking(false);
  //   }
  // };
  // function connectWallet() {
  //   if (!window.ethereum) {
  //     alert("Metamask is not installed");
  //     return;
  //   }
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   setProvider(provider);
  //   provider
  //     .send("eth_requestAccounts", [])
  //     .then((accounts) => setAccount(accounts[0]))
  //     .catch((err) => console.log(err));
  // }

  return (
    <div className="App">
      <p className="Imdb-Title">IMDB PAGE</p>
      <ReactPlayer className="Movie-Video" url={`${backendData.url}`} />

      <p>
        {movieId} : {backendData.name}
      </p>

      <input
        className="Movie-Comment"
        placeholder="Enter Your Comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addToken}>Send Comment</button>
      <br />
      <br />
      <br />
      <button onClick={getSignerBalance}>Balance Value</button>
      {/* <button onClick={approve}>Approve</button> */}
      <div>
        {/* <h4>Allowance: {formatEther(allowance)}</h4> */}
        <h4>
          Balance:{" "}
          {parseFloat(ethers.utils.formatUnits(tokenBalance)).toFixed(0)}
        </h4>
        <p>{isLocking ? "Token adding..." : ""}</p>
      </div>
    </div>
  );
}

export default App;
