import { FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function DocumentsPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mt-4">Documents</CardTitle>
          <CardDescription>Coming in Phase 2</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Upload, manage, and analyze your medical documents. AI-powered
            extraction will automatically process lab results, prescriptions,
            and imaging reports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
