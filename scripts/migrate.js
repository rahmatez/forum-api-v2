const { execSync } = require("child_process");

// Run database migrations for production deployment
if (process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  try {
    console.log("Running database migrations...");
    execSync("npm run migrate up", {
      stdio: "inherit",
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    });
    console.log("Database migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error.message);
    // Don't exit process, let the app start anyway
  }
}

module.exports = {};
