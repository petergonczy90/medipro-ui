import { NavLink } from 'react-router-dom';
import {
  FileText,
  MessageSquare,
  CalendarDays,
  Settings,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const QUICK_LINKS = [
  {
    to: '/documents',
    label: 'Documents',
    description: 'Upload and manage your medical records',
    icon: FileText,
    phase: 'Phase 2',
  },
  {
    to: '/chat',
    label: 'Chat',
    description: 'Chat with your health data using AI',
    icon: MessageSquare,
    phase: 'Phase 7',
  },
  {
    to: '/appointments',
    label: 'Appointments',
    description: 'Schedule and manage appointments',
    icon: CalendarDays,
    phase: 'Phase 9',
  },
  {
    to: '/settings',
    label: 'Settings',
    description: 'Manage your account preferences',
    icon: Settings,
    phase: null,
  },
] as const;

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name || 'User'}
        </h2>
        <p className="text-muted-foreground">
          Here is an overview of your MediPro dashboard.
        </p>
        {user?.role && (
          <Badge variant="secondary" className="mt-2">
            {user.role}
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} className="group">
            <Card className="transition-colors group-hover:border-primary/50">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{link.label}</CardTitle>
                  {link.phase && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {link.phase}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{link.description}</CardDescription>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
