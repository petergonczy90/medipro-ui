import { Settings } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SettingsPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mt-4">Settings</CardTitle>
          <CardDescription>Coming later</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Manage your account preferences, language settings, notification
            preferences, and security options.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
