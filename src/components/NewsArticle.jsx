// src/components/NewsArticle.jsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// سنستقبل البيانات لاحقاً عن طريق الـ props
export function NewsArticle({ article }) {
  // بيانات مؤقتة للتجربة
  const sampleArticle = {
    title: "Sample Article Title",
    description:
      "This is a sample description for the news article. It provides a brief overview of the content.",
    author: "John Doe",
    publishedAt: "2025-09-28T12:00:00Z",
    urlToImage: "https://placehold.co/600x400", // رابط صورة مؤقت
  };

  // نستخدم بيانات الـ prop لو موجودة، أو البيانات المؤقتة
  const displayArticle = article || sampleArticle;

  return (
    <a
      href={displayArticle.url} // 2. الرابط الديناميكي من الـ API
      target="_blank" // 3. لفتح الرابط في نافذة جديدة
      rel="noopener noreferrer" // 4. لأسباب أمنية عند استخدام target="_blank"
      className="h-full block" // block لجعل الرابط يأخذ مساحة الكارت
    >
      <Card className="flex flex-col h-full overflow-hidden">
        {/* الصورة ستكون اختيارية */}
        {displayArticle.urlToImage && (
          <img
            src={displayArticle.urlToImage}
            alt={displayArticle.title}
            className="w-full h-48 object-cover"
          />
        )}

        <CardHeader>
          <CardTitle className="text-lg font-bold leading-snug">
            {displayArticle.title}
          </CardTitle>
          <CardDescription className="text-sm pt-2">
            {displayArticle.description}
          </CardDescription>
        </CardHeader>

        {/* نضع المحتوى الرئيسي هنا لو احتجنا */}
        <CardContent className="flex-grow">{/* حالياً فارغ */}</CardContent>

        <CardFooter>
          <div className="w-full text-xs text-gray-500">
            <p className="font-semibold">
              {displayArticle.author || "Unknown Author"}
            </p>
            <p>{new Date(displayArticle.publishedAt).toLocaleDateString()}</p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}
