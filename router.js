/**
 * Created by Akshat Joshi on 04-06-2017.
 */
if (Meteor.isClient) {
    Session.setDefault('lazyLoadLimit', 2)
}

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    onAfterAction: function () {
        var data = Posts.findOne({slug: this.params.slug});
        if (_.isObject(data) && !_.isArray(data))
            document.title = 'My Meteor Blog - ' + data.title;
        else
            document.title = 'My Meteor Blog - ' + this.route.getName();
    }
});

PostController = RouteController.extend({
    waitOn: function () {
        return Meteor.subscribe('single-post', this.params.slug)
    },
    data: function () {
        return Posts.findOne({
            slug: this.params.slug
        })
    }
});
Router.map(function () {
    this.route('Home', {
        path: '/',
        template: '/home',
        subscriptions(){
            return Meteor.subscribe('lazyloading-posts', Session.get('lazyLoadLimit'))
        }
    });
    this.route('About', {
        path: '/about',
        template: 'about'
    });

    this.route('Post', {
        path: '/posts/:slug',
        template: 'post',
        controller: 'PostController'
    });
    this.route('Edit Post', {
        path: '/edit-post/:slug',
        template: 'editPost',
        controller: 'PostController'
    });
    this.route('Create Post', {
        path: '/create-post',
        template: 'editPost',


    });

    var requiresLogin = function requiresLogin(){
        if (!Meteor.user() ||
            !Meteor.user().roles ||
            !Meteor.user().roles.admin) {
            this.render('notFound');
        } else {
            this.next();
        }
    };
    Router.onBeforeAction(requiresLogin, {only: ['Create Post','EditPost']});

});