import { CalendarDays } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function AppointmentsPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mt-4">Appointments</CardTitle>
          <CardDescription>Coming in Phase 9</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Schedule and manage your medical appointments. Get AI-powered
            suggestions for follow-up visits based on your health records.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
