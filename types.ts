export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string; 
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}