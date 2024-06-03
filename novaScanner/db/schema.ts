import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  dato: text("dato"),
  codaera: integer("codaera"),
  telefono: integer("telefono"),
  fecha: text("fecha"),
  foto1: text("foto1"),
  foto2: text("foto2"),
  foto3: text("foto3"),
  foto4: text("foto4"),
  foto5: text("foto5"),
  foto6: text("foto6"),
});
