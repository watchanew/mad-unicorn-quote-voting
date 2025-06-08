import { Quote } from '@/types';

export const madUnicornQuotes = [
  {
    id: 1,
    text: "แพงกว่าชีวิตกูอีก น้ำหอมเนี่ยไอเหี้ย",
    votes: 342,
    timestamp: new Date('2024-01-15'),
    author: "พี่บอมไรเดอร์",
    imageUrl: "/images/movie-scenes/bomb-1.png"
  },
  {
    id: 2,
    text: "ไอเหี้ย มึงจะให้กูไปส่งผีเหรอไอ้สัตว์",
    votes: 289,
    timestamp: new Date('2024-01-18'),
    author: "พี่บอมไรเดอร์",
    imageUrl: "/images/movie-scenes/bomb-2.png"
  },
  {
    id: 3,
    text: "รถเยอะขนาดนั้น... มันจะเอาไปแห่ศพพ่อมันหรือไงว่ะ!?!",
    votes: 456,
    timestamp: new Date('2024-01-20'),
    author: "CTO รุ่ยเจี๋ย",
    imageUrl: "/images/movie-scenes/rj-1.png"
  },
  {
    id: 4,
    text: "ธันเดอร์เผ่ามึงสะกดอย่างนี้หรอ โง่แต่เสือกขยัน",
    votes: 178,
    timestamp: new Date('2024-01-22'),
    author: "CTO รุ่ยเจี๋ย",
    imageUrl: "/images/movie-scenes/rj-2.png"
  },
  {
    id: 5,
    text: "คอนโด 40 ห้องที่คุณขายเมื่อคืน ผมเหมาแล้วกัน ถือว่าจ่ายค่า 'เสือก' ",
    votes: 523,
    timestamp: new Date('2024-01-25'),
    author: "คุณคนิน",
    imageUrl: "/images/movie-scenes/kanin-1.png"
  }
];

export const getMockQuotes = (count: number): Quote[] => {
  return madUnicornQuotes.slice(0, Math.min(count, madUnicornQuotes.length));
};

export const QUOTES_PER_PAGE = 10;
export const CHART_COLORS = ['#FFD600', '#FF6F00', '#FFA000', '#FFB300', '#FFC107'];