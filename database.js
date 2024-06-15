import SQLite from 'react-native-sqlite-storage';

const database_name = "Estoque.db";
const database_version = "1.0";
const database_displayname = "Estoque Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size,
  () => { console.log("Database opened"); },
  (err) => { console.log("SQL Error: " + err); }
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS estoque (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        quantidade TEXT NOT NULL,
        medida TEXT NOT NULL
      );`,
      [],
      () => { console.log("Table created successfully"); },
      (error) => { console.log("Error creating table: " + error.message); }
    );
  });
};

export const insertItem = (nome, quantidade, medida) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO estoque (nome, quantidade, medida) VALUES (?, ?, ?);`,
      [nome, quantidade, medida],
      () => { console.log("Item inserted successfully"); },
      (error) => { console.log("Error inserting item: " + error.message); }
    );
  });
};

export const getItems = (setItems) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM estoque;`,
      [],
      (tx, results) => {
        let items = [];
        for (let i = 0; i < results.rows.length; i++) {
          items.push(results.rows.item(i));
        }
        setItems(items);
      },
      (error) => { console.log("Error fetching items: " + error.message); }
    );
  });
};

export const deleteItem = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM estoque WHERE id = ?;`,
      [id],
      () => { console.log("Item deleted successfully"); },
      (error) => { console.log("Error deleting item: " + error.message); }
    );
  });
};
