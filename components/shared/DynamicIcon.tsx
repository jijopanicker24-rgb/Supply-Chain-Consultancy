import {
  Boxes,
  Cpu,
  Factory,
  Flame,
  Handshake,
  HeartPulse,
  LineChart,
  Package,
  ShoppingCart,
  Truck,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

// Maps the icon names stored in the database to icons.
const icons: Record<string, LucideIcon> = {
  "line-chart": LineChart,
  boxes: Boxes,
  truck: Truck,
  handshake: Handshake,
  cpu: Cpu,
  users: Users,
  "shopping-cart": ShoppingCart,
  "heart-pulse": HeartPulse,
  flame: Flame,
  factory: Factory,
  package: Package,
  utensils: Utensils,
};

export default function DynamicIcon({ name, className }: { name: string | null; className?: string }) {
  const Icon = (name && icons[name]) || LineChart;
  return <Icon className={className} aria-hidden />;
}
