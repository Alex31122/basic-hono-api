CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"completed" integer DEFAULT 0,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;