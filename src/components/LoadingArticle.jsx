import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * مكون لعرض بطاقة تحميل هيكلية (Skeleton Loading Card).
 * يستخدم هذا المكون لإعطاء المستخدم انطباعاً بصرياً عن شكل المحتوى الذي سيتم تحميله،
 * مما يحسن تجربة المستخدم أثناء انتظار جلب البيانات من الـ API.
 * @returns {JSX.Element} - بطاقة تحميل هيكلية تمثل شكل مقال إخباري.
 */
export function LoadingArticle() {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        {/* هيكل عظمي يمثل عنوان المقال */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        {/* هيكل عظمي يمثل وصف المقال */}
        <Skeleton className="h-4 w-full mt-2 rounded-md" />
        <Skeleton className="h-4 w-5/6 mt-1 rounded-md" />
      </CardHeader>
      <CardContent className="flex-grow">
        {/* هيكل عظمي يمثل صورة المقال */}
        <Skeleton className="w-full h-32 rounded-lg" />
      </CardContent>
      <CardFooter>
        <div className="w-full">
          {/* هيكل عظمي يمثل معلومات الكاتب والتاريخ */}
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-1/3 mt-2 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}