import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SELECT version();");

  console.log("Database version result:", databaseVersionResult);

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: "16.0",
      },
    },
  });
}

export default status;
