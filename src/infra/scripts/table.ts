import fs from "fs"
import pgp from "pg-promise";

const db = pgp()("postgres://facilita:facilita@localhost:5432/default");

const tableScript = fs.readFileSync("./table.sql", "utf8");

db.any(tableScript)
  .then(() => {
    console.log("DDL executado com sucesso.");
    db.$pool.end();
  })
  .catch(error => {
    console.error("Erro ao executar o DDL:", error);
    db.$pool.end();
  });