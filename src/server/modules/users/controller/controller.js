const path = require('path');

function getProfile(req, res) {
    res.send("Profile sent");
}

exports.getProfile = getProfile;