const { Schema, model } = require("mongoose");

const BlogAddSchema = new Schema(
  {
    blog_title: {
      type: String,
      required: true,
      max: 99,
    },
    category: {
      type: String,
      required: true,
      max: 99,
    },
    details_one: {
      type: String,
      required: true,
      max: 500,
    },
    inner_title: {
      type: String,
      required: true,
      max: 99,
    },
    details_two: {
      type: String,
      required: true,
      max: 500,
    },
    quotation: {
      type: String,
      required: true,
    },
    details_three: {
      type: String,
      required: true,
      max: 500,
    },
    tags: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = model("BlogPost", BlogAddSchema);
module.exports = BlogPost;
