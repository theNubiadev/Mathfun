const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

function isArmstrong(num) {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
}
// api route for fetching data
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Validate input
  if (!number || isNaN(number)) {
    return res.status(400).json({
      number,
      error: true,
    });
  };

  const num = parseInt(number);
  const isOdd = num % 2 !== 0;
  const isArmstrongNumber = isArmstrong(num);

  // Determine properties
  let properties = [];
  if (isArmstrongNumber) {
    properties.push("armstrong");
  }
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
    is_prime: false, 
    is_perfect: false,
    properties,
    digit_sum: digitSum,
    fun_fact: funFact,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
