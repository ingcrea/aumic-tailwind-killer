const duckdb = require('duckdb');
const fs = require('fs');

const dbPath = 'aumic-lexicon.duckdb';
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const db = new duckdb.Database(dbPath);

db.serialize(() => {
    db.run("CREATE TABLE tw_lexicon (version UTINYINT, class VARCHAR, css VARCHAR, layer VARCHAR);");
    db.run("CREATE UNIQUE INDEX idx_fast_lookup ON tw_lexicon(version, class);");

    const stmt = db.prepare("INSERT INTO tw_lexicon VALUES (?, ?, ?, ?)");
    
    // Insert some sample static classes from v4
    const samples = [
        [4, 'inline', 'display: inline;', 'utilities'],
        [4, 'block', 'display: block;', 'utilities'],
        [4, 'flex', 'display: flex;', 'utilities'],
        [4, 'grid', 'display: grid;', 'utilities'],
        [4, 'hidden', 'display: none;', 'utilities'],
        [4, 'absolute', 'position: absolute;', 'utilities'],
        [4, 'relative', 'position: relative;', 'utilities'],
        [4, 'w-full', 'width: 100%;', 'utilities'],
        [4, 'h-full', 'height: 100%;', 'utilities'],
        [4, 'text-center', 'text-align: center;', 'utilities'],
        [4, 'font-bold', 'font-weight: 700;', 'utilities']
    ];

    for (const s of samples) {
        stmt.run(s[0], s[1], s[2], s[3]);
    }

    stmt.finalize();
    console.log("Lexicon DB (PoC) seeded successfully at", dbPath);
});
