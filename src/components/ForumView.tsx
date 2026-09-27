/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Pin, 
  Lock, 
  Heart, 
  Eye, 
  MessageCircle, 
  ShieldAlert, 
  ShieldCheck, 
  GraduationCap, 
  Trash2, 
  ChevronRight, 
  Tag, 
  ArrowLeft, 
  Send, 
  Check, 
  AlertCircle,
  Sparkles,
  Users,
  Info
} from 'lucide-react';
import { ForumTopic, ForumComment, ForumUser, UserRole } from '../types/forum';
import { UserSettings, Level } from '../types';
import { TRANSLATIONS } from '../translations';
import { convertXSystem } from '../utils/esperanto';
import { CURRENT_MOCK_USERS } from '../data/forumData';

interface ForumViewProps {
  topics: ForumTopic[];
  comments: Record<string, ForumComment[]>;
  currentUser: ForumUser;
  onChangeUserRole: (user: ForumUser) => void;
  onCreateTopic: (topicData: {
    title: string;
    content: string;
    category: ForumTopic['category'];
    level: Level;
    tags: string[];
  }) => void;
  onAddComment: (topicId: string, content: string, isModNote?: boolean) => void;
  onToggleTopicLike: (topicId: string) => void;
  onToggleCommentLike: (topicId: string, commentId: string) => void;
  // Moderator actions
  onTogglePinTopic: (topicId: string) => void;
  onToggleLockTopic: (topicId: string) => void;
  onDeleteTopic: (topicId: string) => void;
  onDeleteComment: (topicId: string, commentId: string) => void;
  settings: UserSettings;
}

export const ForumView: React.FC<ForumViewProps> = ({
  topics,
  comments,
  currentUser,
  onChangeUserRole,
  onCreateTopic,
  onAddComment,
  onToggleTopicLike,
  onToggleCommentLike,
  onTogglePinTopic,
  onToggleLockTopic,
  onDeleteTopic,
  onDeleteComment,
  settings,
}) => {
  const t = TRANSLATIONS[settings.language];

  // Active sub-view: list of topics or topic detail
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);

  // Filters & search within forum
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<Level>('all');

  // Form states for creating a new topic
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumTopic['category']>('questions');
  const [newLevel, setNewLevel] = useState<Level>('all');
  const [newTags, setNewTags] = useState('');

  // Form states for replying
  const [replyText, setReplyText] = useState('');
  const [replyAsModNote, setReplyAsModNote] = useState(false);

  const isModerator = currentUser.role === 'moderator';

  // Selected topic object
  const activeTopic = topics.find((top) => top.id === selectedTopicId) || null;
  const activeComments = selectedTopicId ? comments[selectedTopicId] || [] : [];

  // Filter topics
  const filteredTopics = topics.filter((top) => {
    if (selectedCategory !== 'all' && top.category !== selectedCategory) {
      return false;
    }
    if (selectedLevel !== 'all' && top.level !== 'all' && top.level !== selectedLevel) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = top.title.toLowerCase().includes(q);
      const matchContent = top.content.toLowerCase().includes(q);
      const matchAuthor = top.author.name.toLowerCase().includes(q);
      const matchTags = top.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchAuthor && !matchTags) {
        return false;
      }
    }
    return true;
  });

  // Sort: pinned first, then newest
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    onCreateTopic({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      level: newLevel,
      tags: parsedTags,
    });

    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setIsCreatingTopic(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId || !replyText.trim()) return;

    onAddComment(selectedTopicId, replyText.trim(), isModerator ? replyAsModNote : false);
    setReplyText('');
    setReplyAsModNote(false);
  };

  const getLevelBadgeClass = (lvl: Level) => {
    switch (lvl) {
      case 'A1':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'A2':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'B1':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'B2':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'C1':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'moderator':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <ShieldCheck className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            {t.moderatorBadge}
          </span>
        );
      case 'teacher':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <GraduationCap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            {t.teacherBadge}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            {t.learnerBadge}
          </span>
        );
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const handleTitleInputChange = (val: string) => {
    if (settings.autoXSystem) {
      val = convertXSystem(val);
    }
    setNewTitle(val);
  };

  const handleContentInputChange = (val: string) => {
    if (settings.autoXSystem) {
      val = convertXSystem(val);
    }
    setNewContent(val);
  };

  const handleReplyInputChange = (val: string) => {
    if (settings.autoXSystem) {
      val = convertXSystem(val);
    }
    setReplyText(val);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Simulation / Role Switcher Banner */}
      <div className="bg-emerald-50/70 dark:bg-[#1a2e26]/50 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${currentUser.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-900 dark:text-white">
                {currentUser.name}
              </span>
              {getRoleBadge(currentUser.role)}
              {currentUser.levelBadge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-200/70 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {currentUser.levelBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {isModerator
                ? t.forumModHelpText
                : t.forumLearnerHelpText}
            </p>
          </div>
        </div>

        {/* Role toggle simulator buttons */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#202124] p-1 rounded-xl border border-gray-200 dark:border-gray-700">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 hidden sm:inline">
            {t.currentRoleLabel}:
          </span>
          <button
            onClick={() => onChangeUserRole(CURRENT_MOCK_USERS.meLearner)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              currentUser.role === 'learner'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {t.forumRoleLearner}
          </button>
          <button
            onClick={() => onChangeUserRole(CURRENT_MOCK_USERS.teacherMarko)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              currentUser.role === 'teacher'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {t.forumRoleTeacher}
          </button>
          <button
            onClick={() => onChangeUserRole(CURRENT_MOCK_USERS.modAna)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              currentUser.role === 'moderator'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            {t.forumRoleModerator}
          </button>
        </div>
      </div>

      {/* TOPIC DETAIL VIEW */}
      {selectedTopicId && activeTopic ? (
        <div className="space-y-6">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedTopicId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.backToTopics}
          </button>

          {/* Main Topic Card */}
          <div className="bg-white dark:bg-[#303134] rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xs space-y-4">
            
            {/* Meta & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {activeTopic.isPinned && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    <Pin className="w-3 h-3" />
                    {t.pinned}
                  </span>
                )}
                {activeTopic.isLocked && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800">
                    <Lock className="w-3 h-3" />
                    {t.locked}
                  </span>
                )}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(activeTopic.level)}`}>
                  {t.levels[activeTopic.level]}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {t.forumCategories[activeTopic.category]}
                </span>
              </div>

              {/* Moderator Controls for Topic */}
              {isModerator && (
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 px-3 py-1.5 rounded-xl">
                  <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.moderatorTools}:
                  </span>
                  <button
                    onClick={() => onTogglePinTopic(activeTopic.id)}
                    className="text-xs px-2 py-0.5 rounded bg-white dark:bg-[#202124] border border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                  >
                    {activeTopic.isPinned ? t.modUnpinAction : t.modPinAction}
                  </button>
                  <button
                    onClick={() => onToggleLockTopic(activeTopic.id)}
                    className="text-xs px-2 py-0.5 rounded bg-white dark:bg-[#202124] border border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                  >
                    {activeTopic.isLocked ? t.modUnlockAction : t.modLockAction}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(t.forumConfirmDeleteTopic)) {
                        onDeleteTopic(activeTopic.id);
                        setSelectedTopicId(null);
                      }
                    }}
                    className="text-xs px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
                  >
                    {t.modDeleteTopic}
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {activeTopic.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 pt-1 border-b border-gray-100 dark:border-gray-800 pb-3 text-xs text-gray-500 dark:text-gray-400">
              <div className={`w-7 h-7 rounded-full ${activeTopic.author.avatarColor} text-white font-bold flex items-center justify-center text-xs`}>
                {activeTopic.author.name.charAt(0)}
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {activeTopic.author.name}
              </span>
              {getRoleBadge(activeTopic.author.role)}
              <span>•</span>
              <span>{formatDate(activeTopic.createdAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {activeTopic.views} {t.views}
              </span>
            </div>

            {/* Body */}
            <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed pt-2">
              {activeTopic.content}
            </div>

            {/* Tags */}
            {activeTopic.tags && activeTopic.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-3">
                {activeTopic.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Likes & Stats bar */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <button
                onClick={() => onToggleTopicLike(activeTopic.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  activeTopic.likedByMe
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-semibold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${activeTopic.likedByMe ? 'fill-current' : ''}`} />
                <span>{activeTopic.likes} {t.likes}</span>
              </button>

              <span className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {activeComments.length} {t.replies}
              </span>
            </div>

          </div>

          {/* Comments List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.forumRepliesHeading(activeComments.length)}</span>
            </h3>

            {activeComments.length === 0 ? (
              <div className="bg-white dark:bg-[#303134] rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {t.forumNoRepliesYet}
              </div>
            ) : (
              activeComments.map((comm) => (
                <div
                  key={comm.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    comm.isModeratorNote
                      ? 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800'
                      : 'bg-white dark:bg-[#303134] border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-6 h-6 rounded-full ${comm.author.avatarColor} text-white font-bold flex items-center justify-center text-xs`}>
                        {comm.author.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {comm.author.name}
                      </span>
                      {getRoleBadge(comm.author.role)}
                      {comm.isModeratorNote && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
                          {t.forumOfficialNote}
                        </span>
                      )}
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{formatDate(comm.createdAt)}</span>
                    </div>

                    {/* Moderator action on comment */}
                    {isModerator && (
                      <button
                        onClick={() => {
                          if (confirm(t.forumConfirmDeleteComment)) {
                            onDeleteComment(activeTopic.id, comm.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title={t.modDeleteComment}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                    {comm.content}
                  </p>

                  <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onToggleCommentLike(activeTopic.id, comm.id)}
                      className={`inline-flex items-center gap-1 text-xs transition-colors ${
                        comm.likedByMe
                          ? 'text-rose-600 dark:text-rose-400 font-bold'
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${comm.likedByMe ? 'fill-current' : ''}`} />
                      <span>{comm.likes}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Reply Form (or locked notice) */}
          {activeTopic.isLocked ? (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-300">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{t.topicLockedNotice}</span>
            </div>
          ) : (
            <form onSubmit={handleReplySubmit} className="bg-white dark:bg-[#303134] rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.replyToTopic}
                </span>

                {isModerator && (
                  <label className="flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-300 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={replyAsModNote}
                      onChange={(e) => setReplyAsModNote(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span>Skribi kiel Oficialan Noton</span>
                  </label>
                )}
              </div>

              <textarea
                value={replyText}
                onChange={(e) => handleReplyInputChange(e.target.value)}
                rows={3}
                placeholder={t.replyPlaceholder}
                className="w-full p-3 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-400">
                  {settings.autoXSystem ? t.forumAutoXActiveText : ''}
                </span>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  {t.postReplyBtn}
                </button>
              </div>
            </form>
          )}

        </div>
      ) : (
        /* TOPICS LIST VIEW */
        <div className="space-y-6">
          
          {/* Header Title & New Topic Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.forumTitle}
                </h1>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.forumTagline}
              </p>
            </div>

            <button
              onClick={() => setIsCreatingTopic(true)}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              {t.newTopicBtn}
            </button>
          </div>

          {/* CREATE TOPIC MODAL / ACCORDION */}
          {isCreatingTopic && (
            <div className="bg-white dark:bg-[#303134] rounded-2xl border-2 border-emerald-500 dark:border-emerald-600 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {t.createTopicTitle}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCreatingTopic(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {t.cancelBtn}
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    {t.forumTopicTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => handleTitleInputChange(e.target.value)}
                    placeholder={t.topicTitlePlaceholder}
                    required
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                      {t.topicCategoryLabel}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="questions">{t.forumCategories.questions}</option>
                      <option value="grammar">{t.forumCategories.grammar}</option>
                      <option value="practice">{t.forumCategories.practice}</option>
                      <option value="resources">{t.forumCategories.resources}</option>
                      <option value="events">{t.forumCategories.events}</option>
                      <option value="general">{t.forumCategories.general}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                      {t.topicLevelLabel}
                    </label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as Level)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="all">{t.levels.all}</option>
                      <option value="A1">{t.levels.A1}</option>
                      <option value="A2">{t.levels.A2}</option>
                      <option value="B1">{t.levels.B1}</option>
                      <option value="B2">{t.levels.B2}</option>
                      <option value="C1">{t.levels.C1}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    {t.forumTopicMessageLabel}
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => handleContentInputChange(e.target.value)}
                    rows={4}
                    placeholder={t.topicContentPlaceholder}
                    required
                    className="w-full p-3 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                    {t.topicTagsLabel}
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder={t.forumTopicTagsPlaceholder}
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTopic(false)}
                    className="px-4 py-2 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t.publishTopicBtn}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Filtering Toolbar */}
          <div className="bg-white dark:bg-[#303134] rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchForumPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {t.filterByForumCategory}:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-50 dark:bg-[#202124] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">{t.forumCategories.all}</option>
                <option value="questions">{t.forumCategories.questions}</option>
                <option value="grammar">{t.forumCategories.grammar}</option>
                <option value="practice">{t.forumCategories.practice}</option>
                <option value="resources">{t.forumCategories.resources}</option>
                <option value="events">{t.forumCategories.events}</option>
                <option value="general">{t.forumCategories.general}</option>
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {t.filterByForumLevel}:
              </span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as Level)}
                className="bg-gray-50 dark:bg-[#202124] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">{t.levels.all}</option>
                <option value="A1">{t.levels.A1}</option>
                <option value="A2">{t.levels.A2}</option>
                <option value="B1">{t.levels.B1}</option>
                <option value="B2">{t.levels.B2}</option>
                <option value="C1">{t.levels.C1}</option>
              </select>
            </div>

          </div>

          {/* Topics List Table / Feed */}
          {sortedTopics.length === 0 ? (
            <div className="bg-white dark:bg-[#303134] rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {t.noTopicsFound}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                {t.noTopicsFoundDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTopics.map((top) => {
                const topicComments = comments[top.id] || [];

                return (
                  <article
                    key={top.id}
                    onClick={() => setSelectedTopicId(top.id)}
                    className="group bg-white dark:bg-[#303134] p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/80 dark:hover:border-emerald-400/80 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      
                      {/* Left: Avatar + Title & Meta */}
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-full ${top.author.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5`}>
                          {top.author.name.charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Badges line */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            {top.isPinned && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                <Pin className="w-2.5 h-2.5" />
                                {t.pinned}
                              </span>
                            )}
                            {top.isLocked && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800">
                                <Lock className="w-2.5 h-2.5" />
                                {t.locked}
                              </span>
                            )}
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getLevelBadgeClass(top.level)}`}>
                              {t.levels[top.level]}
                            </span>
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                              {t.forumCategories[top.category]}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {top.title}
                          </h2>

                          {/* Preview snippet */}
                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-1 leading-relaxed">
                            {top.content}
                          </p>

                          {/* Meta: Author, time, tags */}
                          <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-gray-400">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {top.author.name}
                            </span>
                            {getRoleBadge(top.author.role)}
                            <span>•</span>
                            <span>{formatDate(top.createdAt)}</span>
                            {top.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex flex-wrap gap-1">
                                  {top.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="text-gray-500">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* Right: Stats Counter (Replies & Likes) */}
                      <div className="shrink-0 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 pt-1">
                        <div className="flex flex-col items-center min-w-[36px]">
                          <span className="font-bold text-gray-800 dark:text-gray-200 text-sm flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            {topicComments.length}
                          </span>
                          <span className="text-[10px] text-gray-400">{t.replies}</span>
                        </div>

                        <div className="flex flex-col items-center min-w-[36px]">
                          <span className="font-bold text-gray-800 dark:text-gray-200 text-sm flex items-center gap-1">
                            <Heart className={`w-3.5 h-3.5 ${top.likedByMe ? 'text-rose-500 fill-current' : 'text-gray-400'}`} />
                            {top.likes}
                          </span>
                          <span className="text-[10px] text-gray-400">{t.likes}</span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors ml-1 hidden sm:block" />
                      </div>

                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
