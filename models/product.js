const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  label: { type: String, default: '', trim: true },
  name: { type: String, default: '', trim: true },
  code: { type: String, default: '', trim: true },
  cost: { type: Number, default: 0 },
  format: { type: String, default: '' },
  count: { type: Number, default: 0 },
  comment: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now },
});

ProductSchema.path('name').required(true, 'Product name cannot be blank');
ProductSchema.path('cost').required(true, 'Product cost cannot be blank');


ProductSchema.pre('save', (next) => {
  console.log('save err');
  next();
});

ProductSchema.statics = {
  list() {
    return this.find({});
  },
};

mongoose.model('Product', ProductSchema);
