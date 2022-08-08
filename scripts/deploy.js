// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');


  // const Petrichor = await hre.ethers.getContractFactory("Petrichor");
  // const petrichor = await Petrichor.deploy();
  // await petrichor.deployed();
  // console.log("Petrichor deployed to:", petrichor.address);


  const Movie = await hre.ethers.getContractFactory("Movie");
  const movie = await Movie.deploy("0x9606Aa2C002134516B5dcBFc76E00abE46a05469");
  await movie.deployed();
  console.log("MovieContract deployed to:", movie.address);

  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
