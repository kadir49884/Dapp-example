import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { MOVIE_ADDRESS } from "../constants/addresses";
import MovieABI from "../constants/Movie.json";

export const useMovieContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(MOVIE_ADDRESS, MovieABI.abi, signer)
    setContract(_contract);
  }, []);

  return contract;
};