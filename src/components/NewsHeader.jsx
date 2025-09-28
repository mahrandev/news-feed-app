// src/components/NewsHeader.jsx
import { Input } from "@/components/ui/input";
// 1. استيراد مكونات Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 2. استقبال props جديدة
export function NewsHeader({
  onSearchChange,
  onCategoryChange,
  category,
  isCategoryDisabled,
}) {
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {/* 3. إضافة القائمة المنسدلة */}
        <Select
          onValueChange={onCategoryChange}
          defaultValue={category}
          disabled={isCategoryDisabled}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
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
