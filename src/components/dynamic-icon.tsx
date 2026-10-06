"use client";

import * as React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  FolderGit2,
  Layers,
  Code2,
  GraduationCap,
  Brain,
  Server,
  Database,
  MonitorSmartphone,
  Wrench,
  Scale,
  Newspaper,
  ShoppingCart,
  Eye,
  Sun,
  TrafficCone,
  Image,
  Music,
  Users,
  Bus,
  Cloud,
  ChartLine,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
  Phone,
  FolderGit2,
  Layers,
  Code2,
  GraduationCap,
  Brain,
  Server,
  Database,
  MonitorSmartphone,
  Wrench,
  Scale,
  Newspaper,
  ShoppingCart,
  Eye,
  Sun,
  TrafficCone,
  Image,
  Music,
  Users,
  Bus,
  Cloud,
  ChartLine,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon className={className} />;
}
