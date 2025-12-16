import {
  Truck,
  Container,
  CircleDot,
  Route,
  FileText,
  Users,
  Wrench,
  Fuel
} from "lucide-react";

export const MENU_BY_ROLE = {
  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Truck size={20} />,
      path: "/admin"
    },
    {
      id: "trucks",
      label: "Camions",
      icon: <Truck size={20} />,
      path: "/admin/trucks"
    },
    {
      id: "trailers",
      label: "Remorques",
      icon: <Container size={20} />,
      path: "/admin/trailers"
    },
    {
      id: "tires",
      label: "Pneus",
      icon: <CircleDot size={20} />,
      path: "/admin/tires"
    },
    {
      id: "trips",
      label: "Trajets",
      icon: <Route size={20} />,
      path: "/admin/trips"
    },
    {
      id: "maintenanceRules",
      label: "Règles Maintenance",
      icon: <Wrench size={20} />,
      path: "/admin/maintenanceRules"
    },
    {
      id: "maintenanceRecords",
      label: "Historique Maint",
      icon: <Wrench size={20} />,
      path: "/admin/maintenanceRecords"
    },
    {
      id: "users",
      label: "Chauffeurs",
      icon: <Users size={20} />,
      path: "/admin/users"
    },
    {
      id: "rapport",
      label: "Rapport",
      icon: <FileText size={20} />,
      path: "/admin/rapport"
    }
  ],

  driver: [
    {
      id: "trips",
      label: "Mes Trajets",
      icon: <Route size={20} />,
      path: "/driver/trips"
    },
    {
      id: "fuelLogs",
      label: "Carburant",
      icon: <Fuel size={20} />,
      path: "/driver/fuelLogs"
    }
  ]
};
