# Number Classification API  

This is a simple public API that classifies numbers and provides a math fun fact.

## API Endpoint  


## Response Format  
### ✅ **Successful Response (`200 OK`)**
```json
{
  "number": 7,
  "is_prime": false,
  "is_perfect": false,
  "properties": [
    "armstrong",
    "odd"
  ],
  "digit_sum": 7,
  "fun_fact": "7 is the only dimension, besides the familiar 3, in which a vector cross product can be defined."
}
```

## Error Request response
```
{
  "number": "alphabet",
  "error": true
} 

```
##


``` shell
git clone https://github.com/theNubiadev/number-classifier.git

cd number-classifier

npm install

node index.js

#run locally

http://localhost:3000/api/classify-number?number=7

```


### Deployment
This API is deployed at:  

### More Node.js Developers
Looking to hire  👉 [[Node.js Developers](https://hng.tech/hire/nodejs-developers)]