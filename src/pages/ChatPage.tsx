import { MessageSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ChatPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mt-4">Chat</CardTitle>
          <CardDescription>Coming in Phase 7</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Chat with your health data using AI. Ask questions about your
            medical history and get intelligent insights powered by RAG.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
