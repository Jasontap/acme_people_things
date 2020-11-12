const Sequelize = require('sequelize');
const { STRING } = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_people_things_db');

const User = conn.define('user', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const Place = conn.define('place', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const Thing = conn.define('thing', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const Purchase = conn.define('purchase', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  }
})

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry] = await Promise.all([ 'moe', 'lucy', 'larry' ].map(name => User.create({
    name
  })))
  const [nyc, chicago, la, dallas] = await Promise.all([ 'nyc', 'chicago', 'la', 'dallas' ].map(name => Place.create({
    name
  })))
  const [foo, bar, bazz, quq] = await Promise.all([ 'foo', 'bar', 'bazz', 'quq' ].map(name => Thing.create({
    name
  })))
  
  Purchase.create({
    userId:moe.id, placeId:nyc.id, thingId:foo.id
  })

  la.userId = moe.id;
  chicago.userId = larry.id;
  chicago.userId = lucy.id;
}



Purchase.belongsTo(User);
Purchase.belongsTo(Thing);
Purchase.belongsTo(Place);

module.exports = {
  syncAndSeed
}