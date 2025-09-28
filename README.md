# 📰 تطبيق أخبار (News Feed App)

<div align="center">

**تطبيق ويب تفاعلي لعرض آخر الأخبار من جميع أنحاء العالم، مبني باستخدام React وتقنيات الويب الحديثة.**

</div>

<br />

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

<br />

### 🚀 [رابط العرض المباشر (Live Demo)](https://news-feed-app-u4wj.vercel.app/)

<br />

> **⚠️ ملاحظة هامة:** هذا التطبيق يستخدم الباقة المجانية من **NewsAPI** والتي تعمل فقط على البيئة المحلية (`localhost`) لأغراض التطوير. لذلك، النسخة المنشورة على Vercel ستعرض واجهة التحميل فقط دون بيانات. لعرض البيانات، يرجى تشغيل المشروع محلياً كما هو موضح بالأسفل.

<br />

<div align="center">
  
  *لقطة شاشة للتطبيق وهو يعمل على البيئة المحلية*
  
  ![صورة للمشروع](https://i.imgur.com/your-screenshot-url.png)
  
  > **نصيحة:** قم بتشغيل المشروع محلياً، خذ لقطة شاشة جميلة، ارفعها على موقع مثل [Imgur](https://imgur.com/upload)، واستبدل الرابط أعلاه برابط صورتك.

</div>

---

## ✨ الميزات الرئيسية (Features)

- **📰 عرض الأخبار:** جلب وعرض أحدث المقالات من [NewsAPI](https://newsapi.org).
- **🔍 بحث فوري:** شريط بحث ديناميكي لتصفية المقالات حسب الكلمات المفتاحية مع تحسين الأداء باستخدام **Debouncing**.
- **📂 فلترة حسب الفئة:** إمكانية عرض الأخبار حسب فئات محددة (رياضة، تكنولوجيا، أعمال، إلخ).
- **🔢 ترقيم الصفحات (Pagination):** أزرار "Next" و "Previous" للتنقل بسهولة بين صفحات النتائج.
- **🔗 روابط للمقالات:** كل كارت مقال هو رابط قابل للنقر يفتح المصدر الأصلي للخبر في نافذة جديدة.
- **⏳ واجهة تحميل احترافية:** استخدام واجهات **Skeleton Loaders** لتحسين تجربة المستخدم أثناء انتظار البيانات.
- **⚠️ معالجة الأخطاء:** عرض رسائل خطأ واضحة للمستخدم في حال فشل جلب البيانات.
- **📱 تصميم متجاوب (Responsive):** واجهة مستخدم تتكيف بسلاسة مع جميع أحجام الشاشات من الهواتف المحمولة إلى شاشات سطح المكتب.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

<table>
  <tr>
    <td align="center">
      <a href="https://react.dev/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" width="60" height="60"/>
      </a>
      <br><strong>React</strong>
    </td>
    <td align="center">
      <a href="https://vitejs.dev/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" alt="Vite" width="60" height="60"/>
      </a>
      <br><strong>Vite</strong>
    </td>
    <td align="center">
      <a href="https://tailwindcss.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" width="60" height="60"/>
      </a>
      <br><strong>Tailwind CSS</strong>
    </td>
    <td align="center">
      <a href="https://ui.shadcn.com/" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" alt="shadcn/ui" width="60" height="60"/>
      </a>
      <br><strong>shadcn/ui</strong>
    </td>
    <td align="center">
      <a href="https://vercel.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg" alt="Vercel" width="60" height="60"/>
      </a>
      <br><strong>Vercel</strong>
    </td>
  </tr>
</table>

---

## 🚀 كيفية تشغيل المشروع محلياً (Getting Started)

لتشغيل نسخة من المشروع على جهازك ورؤية البيانات الحقيقية، اتبع الخطوات التالية:

1.  **نسخ المستودع (Clone the repository):**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **تثبيت الاعتماديات (Install dependencies):**
    ```bash
    npm install
    ```

3.  **إعداد متغيرات البيئة (Environment Variables):**
    - قم بإنشاء ملف جديد في جذر المشروع باسم `.env`.
    - أضف مفتاح API الخاص بك من [NewsAPI](https://newsapi.org) داخل الملف بهذا الشكل:
      ```env
      VITE_NEWS_API_KEY="YOUR_API_KEY_HERE"
      ```

4.  **تشغيل سيرفر التطوير (Run the development server):**
    ```bash
    npm run dev
    ```
    الآن يمكنك فتح [http://localhost:5173](http://localhost:5173) لرؤية التطبيق.

---

## 🧠 المفاهيم والممارسات المطبقة

هذا المشروع لم يكن مجرد بناء واجهة، بل كان تطبيقاً عملياً لمفاهيم أساسية ومتقدمة في React، بما في ذلك:

- **بنية المكونات (Component-Based Architecture):** تقسيم الواجهة إلى مكونات صغيرة وقابلة لإعادة الاستخدام.
- **الخطافات (React Hooks):** استخدام `useState`, `useEffect`, و `useCallback` لإدارة الحالة والآثار الجانبية ودورات حياة المكون.
- **الخطافات المخصصة (Custom Hooks):** فصل منطق جلب البيانات وإدارة الحالة في hook مخصص (`useNewsData`) لزيادة تنظيم الكود وقابليته لإعادة الاستخدام.
- **إدارة الحالة المركزية (Lifting State Up):** إدارة الحالات المشتركة (مثل البحث والفلترة) في المكون الأصلي (`App.jsx`).
- **تحسين الأداء (Performance Optimization):** تطبيق تقنية **Debouncing** لتقليل عدد طلبات API غير الضرورية.
- **النشر والـ CI/CD:** نشر التطبيق على منصة **Vercel** وإعداد النشر التلقائي مع كل `push` لفرع `main`.
