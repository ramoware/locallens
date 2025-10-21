CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"category" text NOT NULL,
	"date" timestamp NOT NULL,
	"session_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
