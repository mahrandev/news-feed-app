import { useState, useCallback } from "react";
import { debounce } from "lodash";

import { NewsArticle } from "./components/NewsArticle";
import { useNewsData } from "./hooks/useNewsData";
import { NewsHeader } from "./components/NewsHeader";
import { Button } from "@/components/ui/button";
import { LoadingArticle } from "./components/LoadingArticle";

/**
 * المكون الرئيسي للتطبيق (App Component).
 * هذا المكون هو نقطة الدخول الرئيسية لواجهة المستخدم، وهو مسؤول عن:
 * - إدارة الحالة العامة للتطبيق مثل مصطلح البحث، رقم الصفحة، والفئة.
 * - استخدام الخطاف المخصص `useNewsData` لجلب بيانات الأخبار.
 * - عرض واجهة المستخدم الرئيسية بما في ذلك الهيدر، قائمة المقالات، وأزرار التنقل.
 * - التعامل مع حالات التحميل والأخطاء.
 * @returns {JSX.Element} - واجهة المستخدم الكاملة للتطبيق.
 */
function App() {
  // حالة لتخزين مصطلح البحث الذي يدخله المستخدم.
  const [query, setQuery] = useState("");
  // حالة لتخزين رقم الصفحة الحالية للتنقل بين صفحات النتائج.
  const [page, setPage] = useState(1);
  // حالة لتخزين فئة الأخبار المختارة.
  const [category, setCategory] = useState("general");

  // استخدام الخطاف المخصص لجلب البيانات بناءً على الحالات الحالية.
  const { articles, loading, error } = useNewsData(query, page, category);

  /**
   * دالة `debounce` مغلفة بـ `useCallback` لتحسين الأداء.
   * تقوم هذه الدالة بتأخير تحديث حالة `query` لمدة 500 مللي ثانية بعد آخر مرة توقف فيها المستخدم عن الكتابة.
   * هذا يمنع إرسال طلبات API متعددة أثناء الكتابة، مما يحسن الأداء ويقلل الحمل على الخادم.
   * @param {string} newQuery - مصطلح البحث الجديد.
   */
  const debouncedSetQuery = useCallback(
    debounce((newQuery) => {
      setQuery(newQuery);
      setPage(1); // إعادة تعيين الصفحة إلى 1 عند كل بحث جديد لضمان بدء النتائج من البداية.
    }, 500),
    []
  );

  /**
   * معالج تغيير حقل البحث.
   * يتم استدعاؤه عند كل تغيير في حقل الإدخال، ويقوم بتمرير القيمة إلى الدالة `debouncedSetQuery`.
   * @param {string} newQuery - القيمة الجديدة من حقل البحث.
   */
  const handleSearchChange = (newQuery) => {
    debouncedSetQuery(newQuery);
  };

  /**
   * معالج تغيير فئة الأخبار.
   * يتم استدعاؤه عند اختيار فئة جديدة من القائمة المنسدلة.
   * @param {string} newCategory - الفئة الجديدة المختارة.
   */
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // إعادة تعيين الصفحة إلى 1 لعرض نتائج الفئة الجديدة من البداية.
  };

  /**
   * دالة للانتقال إلى الصفحة التالية من نتائج الأخبار.
   * تزيد رقم الصفحة بمقدار 1.
   */
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  /**
   * دالة للعودة إلى الصفحة السابقة من نتائج الأخبار.
   * تنقص رقم الصفحة بمقدار 1، مع التأكد من أنها لا تقل عن 1.
   */
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // تحديد ما إذا كان يجب تعطيل زر "السابق".
  const isPrevDisabled = page === 1 || loading;
  // تحديد ما إذا كان يجب تعطيل زر "التالي".
  // يتم تعطيله إذا كان عدد المقالات أقل من 21 (مما يعني عدم وجود صفحة تالية) أو أثناء التحميل.
  const isNextDisabled = articles.length < 21 || loading;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <NewsHeader
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          category={category}
          isCategoryDisabled={!!query} // تعطيل قائمة الفئات عند وجود نص في حقل البحث.
        />

        {/* عرض مكونات التحميل الهيكلية أثناء جلب البيانات */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingArticle key={index} />
            ))}
          </div>
        )}

        {/* عرض رسالة خطأ في حال حدوث مشكلة */}
        {error && (
          <p className="text-center mt-8 text-red-600">
            Error: {error.message}
          </p>
        )}

        {/* عرض المقالات بعد انتهاء التحميل وعدم وجود أخطاء */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              // عرض أول 20 مقالاً فقط لتجنب عرض المقال الإضافي المستخدم في منطق التنقل.
              articles
                .slice(0, 20)
                .map((article, index) => (
                  <NewsArticle key={article.url || index} article={article} />
                ))
            ) : (
              <p className="col-span-full text-center">No articles found.</p>
            )}
          </div>
        )}

        {/* أزرار التنقل بين الصفحات */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={handlePrevPage} disabled={isPrevDisabled}>
            Previous
          </Button>
          <span className="font-semibold">{page}</span>
          <Button onClick={handleNextPage} disabled={isNextDisabled}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;