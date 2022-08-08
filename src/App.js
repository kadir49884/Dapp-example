import "./App.css";
import { useState, useEffect } from "react";
import { useMovieContract } from "./hooks/useMovieContract";
import { usePetrichorContract } from "./hooks/usePetrichorContract";
import { useAllowance } from "./hooks/useAllowance";
import { formatEther } from "ethers/lib/utils";
import { useSignerAddress } from "./hooks/useSignerAddress";
import { ethers } from "ethers";

function App() {
  // const [account, setAccount] = useState();
  const [data, getData] = useState("");
  const [value, setValue] = useState("Comment and gain the token");

  const [provider, setProvider] = useState();
  const movieContract = useMovieContract();
  const petrichorContract = usePetrichorContract();
  const { approve, allowance, isAppoving } = useAllowance();
  const [isLocking, setIsLocking] = useState(false);
  const { signerAddress } = useSignerAddress();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [petrichorOwnerAddress, setPetrichorOwnerAddress] = useState(null);

  useEffect(() => {
    getPetrichorContract();
  }, [tokenBalance]);

  const getPetrichorContract = async () => {
    if (!petrichorContract) return;
    try {
      setTokenBalance(await petrichorContract.balanceOf(signerAddress));
      setPetrichorOwnerAddress(await petrichorContract.ownerAddress());
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
      <input
        placeholder="Enter Your Comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addToken}>Add tokens</button>
      <br />
      <button onClick={getPetrichorContract}>Balance Value</button>
      {/* <button onClick={approve}>Approve</button> */}
      <div>
        {/* <h4>Allowance: {formatEther(allowance)}</h4> */}
        <h4>Balance: {ethers.utils.formatUnits(tokenBalance)}</h4>
        <p>{isLocking ? "Token adding..." : ""}</p>
      </div>
    </div>
  );
}

export default App;
