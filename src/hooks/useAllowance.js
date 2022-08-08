import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { PETRICHOR_ADDRESS, MOVIE_ADDRESS } from "../constants/addresses";
import ERC20PETRCIHOR from "../constants/Petrichor.json";


export const useAllowance = () => {
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const [isAppoving, setIsApproving] = useState(false);

  const getAllowance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(PETRICHOR_ADDRESS, ERC20PETRCIHOR.abi, provider);
    const result = await _contract.allowance(signer.getAddress(), MOVIE_ADDRESS);
    setAllowance(result);
  };

  useEffect(() => {
    getAllowance();
  }, []);

  const approve = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(PETRICHOR_ADDRESS, ERC20PETRCIHOR.abi, signer);
    setIsApproving(true);
    try {
      const txn = await _contract.approve(
        MOVIE_ADDRESS,
        ethers.constants.MaxUint256
      );
      await txn.wait();
      setIsApproving(false);
      getAllowance();
    } catch {
      setIsApproving(false);
    }
  };

  return { isAppoving, allowance, approve };
};