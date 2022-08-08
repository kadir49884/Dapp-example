import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { PETRICHOR_ADDRESS } from "../constants/addresses";
import PetrichorAbi from "../constants/Petrichor.json";

export const usePetrichorContract = () => {
    const [contract, setContract] = useState(null);
  
    useEffect(() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const _contract = new ethers.Contract(PETRICHOR_ADDRESS, PetrichorAbi.abi, signer)
      setContract(_contract);
    }, []);
  
    return contract;
  };