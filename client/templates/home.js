/**
 * Created by Akshat Joshi on 02-06-2017.
 */
Template.home.created = ()=>{
    console.log('Created the home template');
};
Template.home.rendered = ()=>{
    console.log('rendered the home template');
};
Template.home.destroyed = ()=>{
    console.log('destroyed the home template');
};

Template.home.helpers({
   exampleHelper(){
       return new Spacebars.SafeString('This is data rendered from <b>helper</b>');
   },
   contextHelper(){
       return {
           someText: 'Came from parent',
           someNested: {
               someText: 'Came from some someNested.text'
           }
       }
   },

    postsList(){
                return Posts.find({},  {
               sort: {
                   timeCreated: -1
               }

        })
   }

});

Template.home.events({
    'click button.lazyload': function(e, template) {
        var currentLimit = Session.get('lazyLoadLimit');
        Session.set('lazyLoadLimit', currentLimit+1)
    }
})

