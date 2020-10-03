const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxLength: 60,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    spirits: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ProductSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
