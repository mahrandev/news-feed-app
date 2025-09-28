import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * @typedef {import('../hooks/useNewsData').NewsArticle} NewsArticleType
 */

/**
 * مكون لعرض مقال إخباري واحد في شكل بطاقة.
 * يعرض هذا المكون عنوان المقال، وصفه، صورته، اسم الكاتب، وتاريخ النشر.
 * البطاقة بأكملها هي رابط قابل للنقر يوجه المستخدم إلى المقال الأصلي.
 * @param {object} props - الخصائص المستلمة من المكون الأب.
 * @param {NewsArticleType} props.article - كائن يحتوي على بيانات المقال الإخباري.
 * @returns {JSX.Element} - بطاقة عرض المقال الإخباري.
 */
export function NewsArticle({ article }) {
  // التأكد من وجود المقال قبل عرض البيانات لتجنب الأخطاء.
  if (!article) {
    return null; // أو عرض مكون احتياطي
  }

  return (
    // `a` tag يجعل البطاقة بأكملها قابلة للنقر.
    <a
      href={article.url} // الرابط الديناميكي من بيانات المقال.
      target="_blank" // يفتح الرابط في تبويب جديد.
      rel="noopener noreferrer" // ممارسة أمنية موصى بها عند استخدام target="_blank".
      className="h-full block" // يضمن أن الرابط يملأ ارتفاع وعرض البطاقة.
    >
      {/* `Card` هو المكون الحاوي الرئيسي من مكتبة الواجهة المستخدمة. */}
      <Card className="flex flex-col h-full overflow-hidden transition-transform duration-200 hover:scale-105">
        {/* عرض الصورة فقط في حال وجود رابط لها في البيانات. */}
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover" // `object-cover` يضمن أن الصورة تملأ المساحة المتاحة دون تشويه.
          />
        )}

        <CardHeader>
          <CardTitle className="text-lg font-bold leading-snug">
            {article.title}
          </CardTitle>
          <CardDescription className="text-sm pt-2">
            {article.description}
          </CardDescription>
        </CardHeader>

        {/* `CardContent` ينمو ليملأ أي مساحة متبقية، مما يدفع `CardFooter` إلى الأسفل. */}
        <CardContent className="flex-grow"></CardContent>

        <CardFooter>
          <div className="w-full text-xs text-gray-500">
            <p className="font-semibold">
              {/* عرض اسم الكاتب، أو "Unknown Author" إذا لم يكن متوفراً. */}
              {article.author || "Unknown Author"}
            </p>
            <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}