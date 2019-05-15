const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;

const typeDefs = `
  type blogpost {
    id: String!
    title: String!
    thumbnail: String
    content: String
  }

  input blogpostInput {
    title: String!
    thumbnail: String
    content: String
  }

  type Query {
    blogposts(limit: Int): [blogpost]
    blogpost(id: String!): blogpost
  }

  type Mutation {
    addBlogpost(post: blogpostInput!): blogpost
  }
`;
const getAllBlogposts = (obj, args, context, info) => {
  const limitInput = args.limit || "10";
  const limit = parseInt(limitInput);

  const array = [];
  for (let i = 0; i < limit; i++) {
    array.push({
      id: i,
      title: "Blogpost no. " + i,
      content: "Some boring content...",
      thumbnail: "some URL"
    });
  }
  return array;
};

const getBlogpost = (obj, args, context, info) => {
  return {
    id: args.id,
    title: "Blogpost no. " + args.id,
    content: "Some boring content...",
    thumbnail: "some URL"
  };
};

const addBlogpost = (obj, args, context, info) => args.post;

const resolvers = {
  Query: {
    blogposts: getAllBlogposts,
    blogpost: getBlogpost
  },
  Mutation: {
    addBlogpost: addBlogpost
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
