const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Provider = require("../models/provider.model");
const User = require("../models/user.model");
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const {
        displayName: fullname,
        emails: [{ value: email }],
      } = profile;
      console.log(fullname, email);
    const user = await createProviderAndUser(email, fullname);
    done(null, user);
  }
);

const findOrCreateProvider = async (name) => {
    let provider = await Provider.findOne({ name });
    if (!provider) {
      provider = await Provider.create({ name });
    }
    console.log(provider);
    
    return provider;
  };
  
  const findOrCreateUser = async (email, providerId, fullname) => {
    let user = await User.findOne({ email, provider: providerId });
    if (!user) {
      user = await User.create({
        fullname,
        email,
        status: true,
        provider: providerId,
      });
    }
    return user;
  };
  
  // Sử dụng các hàm trên
  const createProviderAndUser = async (email, fullname) => {
    try {
      const provider = await findOrCreateProvider('google');
      const user = await findOrCreateUser(email, provider._id, fullname);
      return user;
    } catch (error) {
      console.error('Error:', error);
    }
  };
