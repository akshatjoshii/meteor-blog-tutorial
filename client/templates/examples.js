/**
 * Created by Akshat Joshi on 03-06-2017.
 */
Template.contentExample.rendered = function () {
    console.log(this.data);
};

Template.contentExample.helpers({
    logContext: function(){
        console.log('Context Log Helper', this);
         return Session.get('randomNumber');
    }
});

Template.contentExample.events({
    'click button': function(e, template){
        Session.set('randomNumber', Math.random(0,99));
    }
});
