create table detail (
	id INTEGER PRIMARY KEY NOT NULL,
	date TEXT NOT NULL,
	category_id INTEGER NOT NULL,
	location TEXT,
	cost INTEGER NOT NULL,
	purchase INTEGER NOT NULL,
	last_update TEXT NOT NULL
);
