import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/utils/sort";
import type { SortOption } from "@/types/github";

interface RepositoryListHeaderProps {
  total: number;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function RepositoryListHeader({
  total,
  sortOption,
  onSortChange,
}: RepositoryListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        Repositórios
        <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
          {total}
        </span>
      </h2>

      <div className="flex items-center gap-2">
        <SlidersHorizontal
          className="w-4 h-4 text-muted-foreground shrink-0"
          aria-hidden="true"
        />
        <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-full sm:w-56" aria-label="Ordenar repositórios por">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
