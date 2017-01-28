import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLSchema,
  graphql
} from 'graphql';

const projectModel = require('./model');

const Project = new GraphQLObjectType({
  name: 'project',
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    company: {type: new GraphQLNonNull(GraphQLString)},
    size: {type: GraphQLInt},
    description: {type: new GraphQLNonNull(GraphQLString)},
    stack: {type: new GraphQLList(GraphQLString)}
  })
});

const Query = new GraphQLObjectType({
  name: 'ProjectSchema',
  fields: () => ({
    getProjects: {
      type: new GraphQLList(Project),
      resolve: (source, args) => {
        return projectModel.find({});
      }
    },
    getProjectByName : {
      type: Project,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: (source, args) => {
        const search = Object.assign({}, args);
        return projectModel.findOne(search);
      }
    },
    getProjectsByCompany : {
      type: new GraphQLList(Project),
      args: {
        company: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: (source, args) => {
        const search = Object.assign({}, args);
        return projectModel.find(search);
      }
    },
    recentProjects : {
      type: new GraphQLList(Project),
      args: {
        count: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: (source, args) => {
        return projectModel.find({}).limit(args.count);
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'ProjectMutations',
  fields: {
    addProject: {
      type: Project,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        company: {type: new GraphQLNonNull(GraphQLString)},
        size: {type: GraphQLInt},
        description: {type: new GraphQLNonNull(GraphQLString)},
        stack: {type: new GraphQLList(GraphQLString)}
      },
      resolve: (source, args) => {
        const proj = Object.assign({}, args);
        return projectModel.create(proj);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;