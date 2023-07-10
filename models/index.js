import Category from './category.js'
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

const models = {
  Category,
  Price,
  Property,
  User,
}

export default models
