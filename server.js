const { syncAndSeed } = require('./db')

const Sequelize = require('sequelize');

const init = async()=> {
  try {
    await syncAndSeed();
    console.log('ready')
  }
  catch(ex) {
    console.log(ex);
  }
 
}

init();