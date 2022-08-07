import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { MOVIE_ADDRESS } from "../constants/addresses";
import Movie from "../Movie.json";

export const useMovieContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _contract = new ethers.Contract(MOVIE_ADDRESS, Movie.abi, provider)
    setContract(_contract);
  }, []);

  return contract;
};