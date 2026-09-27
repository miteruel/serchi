import { ForumUser } from '../types/forum';

// Demo users of the role switcher in the forum. They must exist in the
// forum_users table (loaded with npm run forum:import).

export const CURRENT_MOCK_USERS: Record<string, ForumUser> = {
  meLearner: {
    id: 'user_current',
    name: 'VerdaStelulo',
    role: 'learner',
    avatarColor: 'bg-emerald-600',
    levelBadge: 'A2',
  },
  modAna: {
    id: 'user_mod_ana',
    name: 'Ana_Moderatorino',
    role: 'moderator',
    avatarColor: 'bg-purple-600',
    levelBadge: 'C1',
  },
  teacherMarko: {
    id: 'user_teacher_marko',
    name: 'Instruisto_Marko',
    role: 'teacher',
    avatarColor: 'bg-blue-600',
    levelBadge: 'C1',
  },
  beginnerSofia: {
    id: 'user_sofia',
    name: 'Sofia_Komencanto',
    role: 'learner',
    avatarColor: 'bg-amber-600',
    levelBadge: 'A1',
  },
};
