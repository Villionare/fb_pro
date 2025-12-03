export interface HomeDataMain {
  boardCategories: categoryItems[],
  boards: BoardItem[]
}

interface categoryItems {
  _id: string;
  category_id: string;
  name: string;
  description: string;
  boards: string[];
  maxNumber: number;
  updatedAt?: string;
}


export interface BoardItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  board_category: string;
  threads: string[];
  createdAt: string;
  updatedAt: string;
}
