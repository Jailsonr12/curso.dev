import database from "/infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVerionResult = await database.query("SHOW server_version");
  const databaseVersionvalue = databaseVerionResult.rows[0].server_version
    .trim()
    .split(" ")[0];

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionResultValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsResultValue =
    databaseOpenedConnectionsResult.rows[0].count;

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionvalue,
        max_connections: parseInt(databaseMaxConnectionResultValue),
        opened_connections: databaseOpenedConnectionsResultValue,
      },
    },
  });
}
export default status;
