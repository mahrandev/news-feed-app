// src/App.jsx
import { useState, useCallback } from "react";
import { debounce } from "lodash";

import { NewsArticle } from "./components/NewsArticle";
import { useNewsData } from "./hooks/useNewsData";
import { NewsHeader } from "./components/NewsHeader";
import { Button } from "@/components/ui/button"; // 1. استيراد الزر
import { LoadingArticle } from "./components/LoadingArticle";

function App() {
  const [query, setQuery] = useState("");
  // 2. حالة جديدة لتخزين رقم الصفحة الحالية
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");

  // 3. تمرير رقم الصفحة إلى الـ Hook
  const { articles, loading, error } = useNewsData(query, page, category);

  const debouncedSetQuery = useCallback(
    debounce((newQuery) => {
      setQuery(newQuery);
      setPage(1); // 4. إعادة الصفحة إلى 1 عند كل بحث جديد
    }, 500),
    []
  );

  const handleSearchChange = (newQuery) => {
    debouncedSetQuery(newQuery);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // إعادة الصفحة إلى 1 عند تغيير التصنيف
  };

  // 5. دوال للتنقل بين الصفحات
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // تأكد من عدم النزول تحت 1
  };

  // 6. تحديد متى يتم تعطيل الأزرار
  const isPrevDisabled = page === 1 || loading;
  const isNextDisabled = articles.length < 21 || loading;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <NewsHeader
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          category={category}
          isCategoryDisabled={!!query}
        />

        {/* -- التعديل يبدأ هنا -- */}
        {loading && (
          // 2. عرض شبكة من الكروت الهيكلية أثناء التحميل
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* إنشاء مصفوفة مؤقتة لعرض 6 كروت هيكلية */}
            {[...Array(6)].map((_, index) => (
              <LoadingArticle key={index} />
            ))}
          </div>
        )}
        {/* -- التعديل ينتهي هنا -- */}
        {error && (
          <p className-="text-center mt-8 text-red-600">
            Error: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              // عرض أول 20 مقالاً فقط
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

        {/* 7. إضافة أزرار التنقل */}
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
