/**
 * Created by Akshat Joshi on 03-06-2017.
 */

Posts = new Mongo.Collection('posts');

if(Meteor.isServer){
    Posts.allow({
        insert: function(userId, doc) {
            return userId && doc.owner === userId && Meteor.user().roles.admin
        },
        update: function (userId, doc, fields, modifier) {
            return Meteor.user().roles.admin
        },
        fetch: ['owner'] //An array with field parameters that will be updated
    });

    Posts.deny({
        update: function(userId, docs, fields, modifier) {
            return _.contains(fields, 'owner') || _.contains(fields, 'timeCreated') || _.contains(fields, 'slug');
        }
    })
}