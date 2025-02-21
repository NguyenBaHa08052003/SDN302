const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectFlash = require("connect-flash");
const cors = require("cors");
const connectDB = require("./src/utils/db");
dotenv.config();
const passport = require("passport");
const passportGoogle = require("./src/passports/passport.google");
const apiRouter = require("./src/routes/api");
const User = require("./src/models/user.model");
const app = express();
const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};

app.use(cors(corsOptions))
console.log(__dirname);
app.use(
  morgan("common", {
    stream: fs.createWriteStream(__dirname + "/src/logs/access.log", {
      flags: "a",
    }),
  })
);
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(
  session({
    secret: "setting express01",
    resave: false,
    saveUninitialized: true,
    name: "setting-session",
  })
);
app.use(connectFlash()); // lưu trữ res tạm thời cho các thông báo 
// nhúng passport
app.use(passport.initialize());
app.use(passport.session());
passport.use("google", passportGoogle);
passport.serializeUser(function (user, done) {
  done(null, user.id); // lưu userId vào session
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  done(null, user);
});

// mở urlencode
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter);

app.use((req, res, next) => {
  res.status(404);
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({
      error: "Không tìm thấy trang",
    });
  }
  res.status(404).json({
    error: "Không tìm thấy trang",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({
      error: "false",
    });
  }
  res.status(500).json({
    error: "false",
  });
});

connectDB();
app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server running with http://localhost:${process.env.PORT ?? 3000}`);
});
