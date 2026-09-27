/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

export type UserRole = 'learner' | 'teacher' | 'moderator';

export interface ForumUser {
  id: string;
  name: string;
  role: UserRole;
  avatarColor: string;
  levelBadge?: string;
}

export interface ForumComment {
  id: string;
  topicId: string;
  author: ForumUser;
  content: string;
  createdAt: string; // ISO string
  likes: number;
  likedByMe?: boolean;
  isModeratorNote?: boolean;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: ForumUser;
  level: 'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: 'general' | 'questions' | 'grammar' | 'practice' | 'resources' | 'events';
  tags: string[];
  createdAt: string; // ISO string
  updatedAt: string;
  views: number;
  likes: number;
  likedByMe?: boolean;
  repliesCount: number;
  isPinned?: boolean;
  isLocked?: boolean;
  languageUsed?: 'eo' | 'es' | 'en' | 'multilingual';
}
