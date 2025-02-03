const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPerfect(n) {
  let sum = 1;
  for (let i = 2; i <= n / 2; i++) {
    if (n % i === 0) sum += i;
  }
  return sum === n && n !== 1;
}


function isArmstrong(num) {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
}
// api route for fetching data
// app.get("/api/classify-number", async (req, res) => {
//   const { number } = req.query;

//   // Validate input
//   if (!number || isNaN(number)) {
//     return res.status(400).json({
//       number,
//       error: true,
//     });
//   };

//   const num = parseInt(number);
//   const isOdd = num % 2 !== 0;
//   const isArmstrongNumber = isArmstrong(num);

//   // Determine properties
//   let properties = [];
//   if (isArmstrongNumber) {
//     properties.push("armstrong");
//   }
//   properties.push(isOdd ? "odd" : "even");

//   // Fetch fun fact from Numbers API (math type)
//   let funFact = `Did you know? ${num} is an interesting number!`;
//   try {
//     const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
//     if (response.data.text) funFact = response.data.text;
//   } catch (error) {
//     console.error("Error fetching fun fact:", error.message);
//   }

//   // Calculate digit sum
//   const digitSum = num
//     .toString()
//     .split("")
//     .reduce((acc, digit) => acc + parseInt(digit), 0);

//   res.json({
//     number: num,
//     is_prime: isPrimeNumber, 
//     is_perfect: isPerfect,
//     properties,
//     digit_sum: digitSum,
//     fun_fact: funFact,
//   });
// });  


app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Validate input
  if (!number || isNaN(number)) {
    return res.status(400).json({
      number: "alphabet",
      error: true,
    });
  }

  const num = parseInt(number);
  const isOdd = num % 2 !== 0;
  const isArmstrongNumber = isArmstrong(num);
  const isPrimeNumber = isPrime(num);
  const isPerfectNumber = isPerfect(num);

  // Determine properties
  let properties = [];
  if (isArmstrongNumber) properties.push("armstrong");
  properties.push(isOdd ? "odd" : "even");

  // Fetch fun fact from Numbers API (math type)
  let funFact = `Did you know? ${num} is an interesting number!`;
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    if (response.data.text) funFact = response.data.text;
  } catch (error) {
    console.error("Error fetching fun fact:", error.message);
  }

  // Calculate digit sum
  const digitSum = num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);

  res.json({
    number: num,
    is_prime: isPrimeNumber,
    is_perfect: isPerfectNumber, 
    properties,
    digit_sum: digitSum, // sum of its digits 
    fun_fact: funFact,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
