const profileModel = require('../../models/profileSchema');

module.exports = async(client, Discord, member) =>{
    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: member.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: member.id,
                serverID: member.guild.id,
                language: 'en',
                premiumTier: 'free',
                coins: 100,
                bank: 0,
                clearanceLvl: 'none',
                staffUnit: 'none',
                gitHubClearance: 'none',
            });
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }
}