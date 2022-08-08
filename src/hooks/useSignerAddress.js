import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";


export const useSignerAddress = () => {
  const [signerAddress, setSignerAddress] = useState(null);

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSignerAddress(signer.getAddress());
  };

  useEffect(() => {
    getAddress();
  }, []);

  return { signerAddress };
};