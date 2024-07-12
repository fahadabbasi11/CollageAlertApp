// database/database.js
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'college_alert.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT)`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log(error);
      }
    );
  });
};

export const addEvent = (title, description, date) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO events (title, description, date) VALUES (?, ?, ?)`,
      [title, description, date],
      (tx, results) => {
        console.log('Event added successfully');
      },
      error => {
        console.log(error);
      }
    );
  });
};

export const getEvents = callback => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM events`,
      [],
      (tx, results) => {
        const events = [];
        for (let i = 0; i < results.rows.length; i++) {
          events.push(results.rows.item(i));
        }
        callback(events);
      },
      error => {
        console.log(error);
      }
    );
  });
};
