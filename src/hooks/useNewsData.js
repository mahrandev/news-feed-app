// src/hooks/useNewsData.js
import { useState, useEffect } from "react";

// 1. أصبح الـ Hook الآن يستقبل رقم الصفحة (page)
export const useNewsData = (query, page, category) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // src/hooks/useNewsData.js
  // ...الكود السابق لا يتغير

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        let endpoint = "top-headlines";
        let queryParams = `country=us&category=${category}`;
        if (query) {
          endpoint = "everything";
          queryParams = `q=${query}`;
        }
        const url = `https://newsapi.org/v2/${endpoint}?${queryParams}&page=${page}&pageSize=21&apiKey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // -- التعديل يبدأ هنا --
        // NewsAPI يخبرنا إذا نجح الطلب أم لا عبر خاصية "status"
        if (data.status !== "ok") {
          // إذا لم يكن "ok"، نرمي خطأً جديداً باستخدام رسالة الخطأ من الـ API
          throw new Error(`Error from API: ${data.message}`);
        }
        // -- التعديل ينتهي هنا --

        setArticles(data.articles);
      } catch (error) {
        setError(error);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, category]);

  return { articles, loading, error };
};
