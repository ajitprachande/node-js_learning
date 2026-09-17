CREATE TABLE "uesr_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" text NOT NULL,
	"salt" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "uesr_sessions" ADD CONSTRAINT "uesr_sessions_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");