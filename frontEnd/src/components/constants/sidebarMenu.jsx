import {
  Truck,
  Container,
  CircleDot,
  Route,
  FileText,
  Users,
  Wrench,
  Fuel
} from 'lucide-react';

export const MENU_BY_ROLE = {
  admin: [
    { id: 'trucks', label: 'Camions', icon: <Truck size={20} /> },
    { id: 'trailers', label: 'Remorques', icon: <Container size={20} /> },
    { id: 'tires', label: 'Pneus', icon: <CircleDot size={20} /> },
    { id: 'trips', label: 'Trajets', icon: <Route size={20} /> },
    { id: 'maintenanceRules', label: 'Règles Maintenance', icon: <Wrench size={20} /> },
    { id: 'maintenanceRecords', label: 'Historique Maint', icon: <Wrench size={20} /> },
    { id: 'users', label: 'Chauffeurs', icon: <Users size={20} /> },
    { id: 'rapport', label: 'Rapport', icon: <FileText size={20} /> },
  ],

  driver: [
    { id: 'trips', label: 'Mes Trajets', icon: <Route size={20} /> },
    { id: 'fuelLogs', label: 'Carburant', icon: <Fuel size={20} /> },
  ]
};
