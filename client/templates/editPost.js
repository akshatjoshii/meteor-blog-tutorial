/**
 * Created by Akshat Joshi on 06-06-2017.
 */
Template.editPost.events({
    'submit form': function (e, template) {
        e.preventDefault();
        var form = e.target;
        var user = Meteor.user();

        _this = this;
        console.log(this);
        if(this._id){
            Posts.update(this._id, {
                $set: {
                    title: form.title.value,
                    description: form.description.value,
                    text: form.text.value
                }, function(error){
                    if(error){
                        alert(error.reason);
                    }else{
                        Router.go('Post', {
                            slug: _this.slug
                        })
                    }
                }
            })
        }else{
            var slug = _.slugify(form.title.value);

            Posts.insert({
                title: form.title.value,
                slug: slug,
                description: form.description.value,
                text: form.text.value,
                timeCreated: moment().unix(),
                author: user.profile.name,
                owner: user._id
            }, function (error) {
                if(error){
                    alert(error.reason);
                }else{
                    Router.go('Post', {slug:slug})
                }
            })
        }


    }
});

Session.setDefault('saveButton', 'Save Post');
Template.editPost.helpers({
    saveButtonText: function(){
        return Session.get('saveButton');
    }
});