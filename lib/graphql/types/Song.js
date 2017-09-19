import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  globalIdField
} from 'graphql-relay'


import { nodeInterface, nodeField } from './Node'

var SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: globalIdField('Song'),
    title: { type: GraphQLString },
    num: { type: GraphQLInt },
    book: {
      type: new GraphQLObjectType({
        name: 'Book',
        fields: () => ({
          name: { type: GraphQLString },
          abbrv: { type: GraphQLString },
          languages: { type: GraphQLString }
        })
      })

    },
    lyrics: { type: GraphQLString },
    lyrics_Markdown: {
      type: new GraphQLObjectType({
        name: 'Markdown',
        fields: () => ({
          md: { type: GraphQLString },
          html: { type: GraphQLString }
        })
      })
    },
    lyrics_Html: { type: GraphQLString },
    tags: { type: GraphQLString },
    videos: { type: GraphQLString },
    references: {
      type: new GraphQLObjectType({
        name: 'References',
        fields: () => ({
          author: { type: GraphQLString },
          book: { type: GraphQLString },
          year: { type: GraphQLString }
        })

      })
    },
    partitions: { type: GraphQLString },
    language: { type: GraphQLString },
    songId: { type: GraphQLString },
    meta: {
      type: new GraphQLObjectType({
        name: 'Meta',
        fields: () => ({
          totalViews: { type: GraphQLInt },
          stats: {
            type: new GraphQLList(new GraphQLObjectType({
              name: 'Stats',
              fields: () => ({
                week: { type: GraphQLInt },
                year: { type: GraphQLInt },
                day: { type: GraphQLInt },
                views: { type: GraphQLInt }
              })

            }))
          }
        })

      })
    }
  }),
  interfaces: () => [nodeInterface]
})

module.exports = SongType
