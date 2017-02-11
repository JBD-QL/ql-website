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

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost/QLdemo';
const db = mongoose.connect(uri);

const projectModel = require('./model1');

const Project = new GraphQLObjectType({
  name: 'project',
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    team: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)}
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
    getProjectsByTeam : {
      type: new GraphQLList(Project),
      args: {
        team: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: (source, args) => {
        const search = Object.assign({}, args);
        return projectModel.find(search);
      }
    },
    getRecentProjects : {
      type: new GraphQLList(Project),
      args: {
        count: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: (source, args) => {
        const count = args.count;
        return projectModel.find({}).limit(count);
      }
    },
  })
});

const Mutation = new GraphQLObjectType({
  name: 'ProjectMutations',
  fields: {
    addProject: {
      type: Project,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        team: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: (source, args) => {
        const proj = Object.assign({}, args);
        return projectModel.create(proj);
      }
    },
    deleteProject: {
      type: Project,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (source, args) => {
        const proj = Object.assign({}, args);
        return projectModel.findOneAndRemove(proj);
      }
    },
    deleteAllProjects: {
      type: new GraphQLList(Project),
      resolve: (source, args) => {
        return projectModel.remove({});
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;

// mutation {
//   p0: addProject(name: "QLegance", team: "JBD", description: "A lightweight Graphql client library for Javascript environments") {
//     name
//     team
//     description
//   }
//   p1: addProject(name: "DejaVue", team: "MiCottOn", description: "Visualization and debugging tool built for Vue.js") {
//     name
//     team
//     description
//   }
//   p2: addProject(name: "Veritas Offline GRE", team: "Team VW", description: "An Electron desktop application for GRE prep lessons") {
//     name
//     team
//     description
//   }
//   p3: addProject(name: "Vuedeux", team: "Team Vuedeux", description: "A lightweight open-source utility layer for binding Vuex to Redux in a way that allows developers to re-use their pre-existing Redux stores") {
//     name
//     team
//     description
//   }
//   p4: addProject(name: "Delorean", team: "Brasco", description: "Time travel debugging for MobX-React applications") {
//     name
//     team
//     description
//   }
//   p5: addProject(name: "Salazar", team: "Team Salazar", description: "A library and development suite for UI focused BDD/TDD") {
//     name
//     team
//     description
//   }
// }