/**
 * Created by Akshat Joshi on 03-06-2017.
 */
//Meteor.subscribe('limited-posts');
Session.setDefault('lazyLoadLimit',2);
// Tracker.autorun(function () {
//     Meteor.subscribe('lazyloading-posts', Session.get('lazyLoadLimit'))
// });