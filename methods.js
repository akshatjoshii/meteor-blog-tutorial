Meteor.methods({
    insertPost: function(postDocument) {
        if(this.isSimulation) {
            Session.set('saveButton', 'Saving...');
        }else{
            var user = Meteor.user();
            // ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to write a post");

            if(Posts.findOne({slug: postDocument.slug}))
                postDocument.slug = postDocument.slug +'-'+ Math.random().toString(36).substring(3);
            // add properties on the serverside
            postDocument.timeCreated = moment().unix();
            postDocument.author = user.profile.name;
            postDocument.owner = user._id;
            Posts.insert(postDocument);
            return postDocument.slug;
        }
    }
});

/**
 * Created by Akshat Joshi on 06-06-2017.
 */
