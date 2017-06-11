/**
 * Created by Akshat Joshi on 04-06-2017.
 */
Accounts.config({
    forbidClientAccountCreation: true
});
if(Meteor.isClient){
    Meteor.subscribe("userRoles");
}