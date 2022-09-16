import { error } from "@sveltejs/kit";

export function load({ params }) {
  if (params.id < 10) return {
    tasks: [
      {id: 24, name: 'Not aes', cost: 1000, solves: 10, category: 'Crypto', isSolved: true},
      
      {id: 0, name: 'Baby Web #0', cost: 10, solves: 57, category: 'Web', isSolved: true},
      {id: 1, name: 'Baby Web #1', cost: 50, solves: 58, category: 'Web', isSolved: true},
      {id: 2, name: 'Baby Web #2', cost: 100, solves: 58, category: 'Web', isSolved: true},
      {id: 3, name: 'Baby Web #3', cost: 150, solves: 58, category: 'Web', isSolved: false},
      {id: 4, name: 'Baby Brute', cost: 150, solves: 50, category: 'Web', isSolved: true},
      {id: 5, name: 'Baby Brute #2', cost: 150, solves: 53, category: 'Web', isSolved: false},
      {id: 6, name: 'Baby Brute #3', cost: 250, solves: 31, category: 'Web', isSolved: false},
      {id: 9, name: 'Новогоднее поздравление Alpha edition', cost: 400, solves: 18, category: 'Web', isSolved: false},
      {id: 10, name: 'New Year Windows Crackme 1', cost: 400, solves: 18, category: 'Reverse', isSolved: false},
      
      {id: 7, name: 'robotd', cost: 50, solves: 24, category: 'Web-Easy', isSolved: false},
      {id: 8, name: 'Курлык-Курлык', cost: 50, solves: 17, category: 'Web-Easy', isSolved: true},
      {id: 11, name: 'Секретный код', cost: 50, solves: 18, category: 'Web-Easy', isSolved: false},

      {id: 12, name: 'Опасная химическая реакция', cost: 100, solves: 18, category: 'Osint', isSolved: true},
    ],
  };
  
  throw error(404);
}