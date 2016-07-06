var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  ordered_date: {
    type: Date,
    default: Date.now
  },
  delivery_date: {
    type: Date,
    default: Date.now
  },
  items: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    }
  }],
});


// MenuSchema.pre('save', function(next){
//   var code = createSha(this.url);
//   this.code = code;
//   next();
// });

module.exports = mongoose.model('Order', OrderSchema);
// module.exports = mongoose.model('Order', OrderSchema);
