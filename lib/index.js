const options=require('./options');
const handleOptionResponse=require('./handleOptionResponse');
let {printToScreen,promptUser}=require('./dbRequests');

module.exports ={options,promptUser, printToScreen, handleOptionResponse};