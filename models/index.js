import Category from './category.js'
import Message from './message.js'
import Price from './price.js'
import Property from './property.js'
import User from './user.js'

/* ASSOCIATIONS */
// Price.hasOne(Property)
Property.belongsTo(Price, {
  foreignKey: 'priceId',
})

Property.belongsTo(Category, {
  foreignKey: 'categoryId',
})

Property.belongsTo(User, {
  foreignKey: 'userId',
})

Property.hasMany(Message, {
  foreignKey: 'propertyId',
})

Message.belongsTo(Property, {
  foreignKey: 'propertyId',
})

Message.belongsTo(User, {
  foreignKey: 'userId',
})

const models = {
  Category,
  Message,
  Price,
  Property,
  User,
}

export default models
