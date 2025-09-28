// src/components/LoadingArticle.jsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingArticle() {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        {/* Skeleton for the title */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        {/* Skeleton for the description */}
        <Skeleton className="h-4 w-full mt-2 rounded-md" />
        <Skeleton className="h-4 w-5/6 mt-1 rounded-md" />
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Skeleton for an image or main content */}
        <Skeleton className="w-full h-32 rounded-lg" />
      </CardContent>
      <CardFooter>
        <div className="w-full">
          {/* Skeleton for author and date */}
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-1/3 mt-2 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}
