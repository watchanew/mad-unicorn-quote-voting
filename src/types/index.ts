export interface Quote {
  id: number;
  text: string;
  author: string;
  votes: number;
  timestamp: Date;
  imageUrl: string; 
}

export interface User {
  username: string;
}

export type SortOption = 'popular' | 'recent' | 'alphabetical';
export type ChartType = 'bar' | 'pie';