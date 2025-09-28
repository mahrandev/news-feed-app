import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * مكون رأس الصفحة (Header) الخاص بالأخبار.
 * يحتوي على عنوان التطبيق، حقل للبحث، وقائمة منسدلة لاختيار فئة الأخبار.
 * @param {object} props - الخصائص المستلمة من المكون الأب.
 * @param {(query: string) => void} props.onSearchChange - دالة يتم استدعاؤها عند تغيير قيمة حقل البحث.
 * @param {(category: string) => void} props.onCategoryChange - دالة يتم استدعاؤها عند تغيير الفئة المختارة.
 * @param {string} props.category - الفئة الحالية المختارة.
 * @param {boolean} props.isCategoryDisabled - متغير منطقي لتحديد ما إذا كان يجب تعطيل قائمة الفئات.
 * @returns {JSX.Element} - مكون رأس الصفحة.
 */
export function NewsHeader({ onSearchChange, onCategoryChange, category, isCategoryDisabled }) {
  // قائمة الفئات المتاحة في الـ API.
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">News Feed</h1>
      <div className="mt-6 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search for articles..."
          className="flex-grow text-center sm:text-left"
          // استدعاء الدالة عند كل تغيير في الإدخال.
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Select
          // استدعاء الدالة عند اختيار قيمة جديدة.
          onValueChange={onCategoryChange}
          // القيمة الافتراضية المحددة.
          defaultValue={category}
          // تعطيل القائمة بناءً على الخاصية المستلمة.
          disabled={isCategoryDisabled}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {/* عرض كل فئة كعنصر في القائمة المنسدلة. */}
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}