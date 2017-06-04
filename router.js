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
        waitOn(){
            return Meteor.subscribe('single-post', this.params.slug)
        },
        data(){
            return Posts.findOne({slug: this.params.slug})
        }
    });

});