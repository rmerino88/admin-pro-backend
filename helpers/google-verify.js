const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SIGN_IN_ID_CLIENT);

const googleVerify = async( token ) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_SIGN_IN_ID_CLIENT, 
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
    const { name, email, picture } = payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return { name, email, picture };
}

// verify().catch(console.error);

module.exports = {
    googleVerify
}