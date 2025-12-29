// Types based on leetcode-query response
export type SubmissionStats = {
  difficulty: string;
  count: number;
  submissions: number;
};

export type QuestionCount = {
  difficulty: string;
  count: number;
};

export type Badge = {
  id: string;
  displayName: string;
  icon: string;
  creationDate: string;
};

export type DifficultyData = {
  easy: number;
  easyTotal: number;
  medium: number;
  mediumTotal: number;
  hard: number;
  hardTotal: number;
  solved: number;
  total: number;
};
