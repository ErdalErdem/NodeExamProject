import db from './connection.js';

const deleteMode = process.argv.includes('--delete');
console.log(process.argv);

async function setupDatabase() {
    try {
        if (deleteMode) {
            console.log("Deleting tables...");
            await db.exec(`DROP TABLE IF EXISTS Users`);
        }

        console.log("Creating tables...");
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);

        if (deleteMode) {
            console.log("Inserting sample data...");
            await db.run(`INSERT INTO Users (name, email, password) VALUES ('John Doe', 'john@example.com', '$2b$14$1pNSNCJTq3K6hx.MUhkQtOs1tTmc6SBfHV/.dcUkJ/rh//1QB7GxO')`);
            await db.run(`INSERT INTO Users (name, email, password) VALUES ('Jane Smith', 'jane@example.com', '$2b$14$1pNSNCJTq3K6hx.MUhkQtOs1tTmc6SBfHV/.dcUkJ/rh//1QB7GxO')`);
            await db.run(`INSERT INTO Users (name, email, password) VALUES ('Alice Johnson', 'alice@example.com', '$2b$14$1pNSNCJTq3K6hx.MUhkQtOs1tTmc6SBfHV/.dcUkJ/rh//1QB7GxO')`);
        }

        console.log("Database setup completed successfully.");
    } catch (error) {
        console.log('An error occurred while running setupDatabase.js:', error);
    }
}

setupDatabase();
