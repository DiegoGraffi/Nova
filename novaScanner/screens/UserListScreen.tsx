import { ScrollView } from "react-native";
import ClientListItem from "../components/ClientListItem";

const users = [
  "Ana María, Ruiz Santos",
  "Diego Alejandro, Jiménez Moreno",
  "Marta Isabel, Fernández Delgado",
  "Javier Antonio, López Navarro",
  "Laura Patricia, Gómez Ramírez",
  "Juan Carlos, Torres Sánchez",
  "Sofía Alejandra, Rodríguez González",
  "Pedro José, Martínez Herrera",
  "Carmen Lucía, Pérez Molina",
  "Luis Miguel, Díaz Cruz",
  "Andrea Elena, Castillo Reyes",
  "David Alejandro, Herrera Flores",
  "Elena Isabel, Soto Pacheco",
  "Jorge Luis, López Vargas",
  "Ana Belén, Flores Ríos",
  "Miguel Ángel, Ramírez Ruiz",
  "Sara Patricia, Núñez Castro",
  "Daniel Eduardo, Vega Muñoz",
  "Claudia Alejandra, Méndez Guzmán",
  "Andrés Felipe, Sánchez Mendoza",
  "Natalia Gabriela, Castro Rojas",
  "Roberto Carlos, Mendoza Pérez",
  "María Teresa, Guzmán Gutiérrez",
  "Pablo Andrés, Ríos Medina",
  "Andrea Paola, Morales Velázquez",
  "José Luis, Martín Cabrera",
  "Daniela Estefanía, Cervantes Guerrero",
  "Juan Manuel, Contreras Sosa",
  "Valeria Fernanda, Rivera Gallegos",
  "Diego Alonso, Martínez López",
];

export default function UserList() {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15, backgroundColor: "white" }}
    >
      {users.map((user, index) => {
        return <ClientListItem client={user} key={index} />;
      })}
    </ScrollView>
  );
}
