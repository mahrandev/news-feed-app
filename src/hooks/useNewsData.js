import { useState, useEffect } from "react";

/**
 * @typedef {object} NewsArticle
 * @property {string} title - عنوان المقال.
 * @property {string} description - وصف المقال.
 * @property {string} url - رابط المقال الأصلي.
 * @property {string} urlToImage - رابط صورة المقال.
 * @property {string} publishedAt - تاريخ نشر المقال.
 * @property {string} author - كاتب المقال.
 */

/**
 * @typedef {object} UseNewsDataResult
 * @property {NewsArticle[]} articles - مصفوفة تحتوي على مقالات الأخبار.
 * @property {boolean} loading - متغير منطقي يشير إلى حالة التحميل.
 * @property {Error|null} error - كائن الخطأ في حال حدوث مشكلة أثناء جلب البيانات.
 */

/**
 * خطاف مخصص (Custom Hook) لجلب بيانات الأخبار من NewsAPI.
 * يدير حالة المقالات، وحالة التحميل، والأخطاء.
 * @param {string} query - مصطلح البحث لجلب مقالات معينة. إذا كان فارغاً، يتم جلب أهم الأخبار.
 * @param {number} page - رقم الصفحة الحالية لجلب البيانات المقسمة.
 * @param {string} category - فئة الأخبار المطلوب جلبها (مثل: business, sports).
 * @returns {UseNewsDataResult} - كائن يحتوي على المقالات، حالة التحميل، والخطأ.
 */
export const useNewsData = (query, page, category) => {
  // حالة لتخزين قائمة المقالات التي تم جلبها من الـ API.
  const [articles, setArticles] = useState([]);
  // حالة لتتبع عملية تحميل البيانات (true أثناء التحميل، false عند الانتهاء).
  const [loading, setLoading] = useState(true);
  // حالة لتخزين أي خطأ قد يحدث أثناء جلب البيانات.
  const [error, setError] = useState(null);

  // التأثير الجانبي (Side Effect) لجلب البيانات عند تغيير مصطلح البحث، رقم الصفحة، أو الفئة.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // بدء التحميل
      setError(null); // إعادة تعيين الأخطاء السابقة
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        // تحديد نقطة النهاية (endpoint) والمعلمات بناءً على وجود مصطلح بحث.
        let endpoint = "top-headlines";
        let queryParams = `country=us&category=${category}`;
        if (query) {
          endpoint = "everything";
          queryParams = `q=${query}`;
        }
        // بناء رابط الـ API الكامل مع تضمين رقم الصفحة وحجمها.
        const url = `https://newsapi.org/v2/${endpoint}?${queryParams}&page=${page}&pageSize=21&apiKey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // التحقق من نجاح الطلب من خلال خاصية 'status' التي يوفرها الـ API.
        if (data.status !== "ok") {
          // في حال فشل الطلب، يتم رمي خطأ مع الرسالة الواردة من الـ API.
          throw new Error(`Error from API: ${data.message}`);
        }

        // تحديث حالة المقالات بالبيانات الجديدة.
        setArticles(data.articles);
      } catch (error) {
        // في حال حدوث أي خطأ، يتم تخزينه في حالة الخطأ.
        setError(error);
        console.error("Fetch error:", error);
      } finally {
        // إيقاف التحميل سواء نجحت العملية أو فشلت.
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, category]); // إعادة تنفيذ التأثير عند تغيير أي من هذه المتغيرات.

  // إرجاع الحالات الثلاث ليتم استخدامها في المكونات.
  return { articles, loading, error };
};