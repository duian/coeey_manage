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
  next();
});

// ProductSchema.method = {
//   destroy(id) {
//
//   }
// };

ProductSchema.statics = {
  load(_id) {
    return this.findOne({ _id })
    .exec();
  },

  list(options) {
    const params = options.params || {};
    const page = options.page || 0;
    const limit = options.limit || 50;
    return this.find(params)
    .limit(limit)
    .skip(limit * page)
    .lean()
    .exec((err, data) => (
      data.map((record, index) => {
        record.index = index + 1;
        return record;
      })
    ));
  },
};

mongoose.model('Product', ProductSchema);
