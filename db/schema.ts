import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name"),
	email: text("email"),
	password: text("password"),
	role: text("role").$type<"monique" | "not">(),
});

export const usersRelations = relations(users, ({ many }) => ({
	messages: many(messages),
}));

export const messages = pgTable("messages", {
	id: serial("id").primaryKey(),
	body: text("body"),
	userId: integer("user_id"),
});

export const messagesRelations = relations(messages, ({ one }) => ({
	user: one(users, {
		fields: [messages.userId],
		references: [users.id],
	}),
}));

// Types
export type Message = typeof messages.$inferSelect;
export type User = typeof users.$inferSelect;

export interface MessageWithUser extends Message {
	user: User;
}
