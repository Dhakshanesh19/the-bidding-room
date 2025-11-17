const dotenv = require('dotenv');

const loadenv = () => {

    const result = dotenv.conifg();
    if(result.error)
    {
        console.log("ERROR IN LOADING THE ENV.....");
    }else{
        console.log("ENV SUCCESSFULLY LOADED 💚")
    }
}