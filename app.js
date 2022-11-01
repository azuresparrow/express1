const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.get('/mean', function(request, response, next) {
  if(!request.query.nums) throw new ExpressError("A comma separated list of numbers must be submitted", 400);
  let nums = parseStringIntoNumArray(request.query.nums);
  let res = {
    'operation': 'mean',
    'input': nums,
    'result': findMean(nums),
  }
  return response.send(res);
} );

app.get('/median', function(request, response, next) {
    if(!request.query.nums)throw new ExpressError("A comma separated list of numbers must be submitted", 400);
    let nums = parseStringIntoNumArray(request.query.nums);
    let res = {
        'operation': 'median',
        'input': nums,
        'result': findMedian(nums),
      }
    return response.send(res);
});

app.get('/mode', function(request, response, next) {
    if(!request.query.nums) throw new ExpressError("A comma separated list of numbers must be submitted", 400);
    let nums = parseStringIntoNumArray(request.query.nums);
    let res = {
        'operation': 'mode',
        'input': nums,
        'result': findMode(nums),
    }
    return response.send(res);
});

app.listen(3000, function(){
  console.log('App on port 3000');
}) 


function parseStringIntoNumArray(str){
    let strArray = str.split(',');
    let numArray = [];
    for(let i = 0; i < strArray.length; i++){
        let value = Number(strArray[i]);
        if(Number.isNaN(value)){
            console.log(value);
            return new Error(`${value} is not a valid number.`);
        } else {
            numArray.push(value);
        }
    }
    return numArray;
}

function findMean(arr){
    let mean = arr.reduce((a,b) => a + b, 0) / arr.length;
    return mean;
}

function findMedian(arr){
    arr.sort( function(a,b) {return a - b;} );

    let midIndex = Math.floor(arr.length/2);

    if(arr.length % 2)
        return arr[midIndex];
    else
        return (arr[midIndex-1] + arr[midIndex]) / 2.0;
}

function findMode(arr){
    let f = new Map();
    let maxf = 0;
    let currentMode;

    for(let i = 0; i < arr.length; i++){
        let num = arr[i]; 
        if(f.has(num)) {
            f.set(num, f.get(num) + 1);
        }
            
        else {
            f.set(num, 1)
        }
            
        
        if(f.get(num) > maxf) {
            maxf = f.get(num);
            currentMode = num;
        }
            
    }
    console.log(f);
    return currentMode;
}