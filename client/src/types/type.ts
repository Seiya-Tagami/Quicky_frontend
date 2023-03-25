export type Memo = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDone: boolean
};

export type ReceivedData = {
  title: string;
  content: string;
};

export type UpdatingData = {
  id: string;
  title: string;
  content: string;
} 