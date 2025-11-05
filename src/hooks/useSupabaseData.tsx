
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface DatabaseGameState {
  id: string;
  hp: number;
  max_hp: number;
  xp: number;
  total_xp: number;
  max_xp: number;
  coins: number;
  level: number;
  streak: number;
}

export interface DatabaseHabit {
  id: string;
  user_id: string;
  title: string;
  streak: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  coin_reward: number;
  is_positive: boolean;
}

export interface DatabaseDaily {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  due_time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  coin_reward: number;
  streak: number;
  completed_at: string | null;
}

export interface DatabaseTodo {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  coin_reward: number;
  is_overdue: boolean;
  completed_at: string | null;
}

export interface DatabaseProfile {
  id: string;
  display_name: string;
  avatar: string;
  frame_border: string;
  name_color: string;
  background_color: string;
}

export interface DatabaseSettings {
  id: string;
  dark_mode?: boolean;
  global_notifications: boolean;
  daily_reminder: boolean;
  reminder_time: string;
  hardcore_mode: boolean;
  vacation_mode: boolean;
  animated_xp_bar: boolean;
}

export const useSupabaseData = (user: User | null) => {
  const [loading, setLoading] = useState(false);

  // Game State operations
  const loadGameState = async (): Promise<DatabaseGameState | null> => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('game_states')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error loading game state:', error);
      return null;
    }
    
    return data;
  };

  const saveGameState = async (gameState: Partial<DatabaseGameState>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('game_states')
      .upsert({ id: user.id, ...gameState });
    
    if (error) {
      console.error('Error saving game state:', error);
    }
  };

  // Profile operations
  const loadProfile = async (): Promise<DatabaseProfile | null> => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error loading profile:', error);
      return null;
    }
    
    return data;
  };

  const saveProfile = async (profile: Partial<DatabaseProfile>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...profile });
    
    if (error) {
      console.error('Error saving profile:', error);
    }
  };

  // Settings operations
  const loadSettings = async (): Promise<DatabaseSettings | null> => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error loading settings:', error);
      return null;
    }
    
    return data;
  };

  const saveSettings = async (settings: Partial<DatabaseSettings>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('settings')
      .upsert({ id: user.id, ...settings });
    
    if (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Habits operations
  const loadHabits = async (): Promise<DatabaseHabit[]> => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error loading habits:', error);
      return [];
    }
    
    return (data || []) as DatabaseHabit[];
  };

  const saveHabit = async (habit: Partial<DatabaseHabit> & { id?: string }) => {
    if (!user) return null;
    
    if (habit.id) {
      // Para updates, apenas enviamos os campos necessários - as recompensas são calculadas pelo trigger
      const { data, error } = await supabase
        .from('habits')
        .update({
          title: habit.title,
          streak: habit.streak,
          difficulty: habit.difficulty,
          is_positive: habit.is_positive
        })
        .eq('id', habit.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating habit:', error);
        return null;
      }
      
      return data as DatabaseHabit;
    } else {
      // Para inserts, apenas enviamos campos obrigatórios - as recompensas são calculadas pelo trigger
      const { data, error } = await supabase
        .from('habits')
        .insert({ 
          user_id: user.id, 
          title: habit.title!,
          streak: habit.streak || 0,
          difficulty: habit.difficulty!,
          is_positive: habit.is_positive ?? true
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating habit:', error);
        return null;
      }
      
      return data as DatabaseHabit;
    }
  };

  const deleteHabit = async (habitId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId);
    
    if (error) {
      console.error('Error deleting habit:', error);
    }
  };

  // Dailies operations
  const loadDailies = async (): Promise<DatabaseDaily[]> => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('dailies')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error loading dailies:', error);
      return [];
    }
    
    return (data || []) as DatabaseDaily[];
  };

  const saveDaily = async (daily: Partial<DatabaseDaily> & { id?: string }) => {
    if (!user) return null;
    
    if (daily.id) {
      // Para updates, as recompensas são calculadas automaticamente pelo trigger
      const { data, error } = await supabase
        .from('dailies')
        .update({
          title: daily.title,
          completed: daily.completed,
          due_time: daily.due_time,
          difficulty: daily.difficulty,
          streak: daily.streak,
          completed_at: daily.completed_at
        })
        .eq('id', daily.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating daily:', error);
        return null;
      }
      
      return data as DatabaseDaily;
    } else {
      // Para inserts, as recompensas são calculadas automaticamente pelo trigger
      const { data, error } = await supabase
        .from('dailies')
        .insert({ 
          user_id: user.id, 
          title: daily.title!,
          completed: daily.completed || false,
          due_time: daily.due_time!,
          difficulty: daily.difficulty!,
          streak: daily.streak || 0
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating daily:', error);
        return null;
      }
      
      return data as DatabaseDaily;
    }
  };

  const deleteDaily = async (dailyId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('dailies')
      .delete()
      .eq('id', dailyId);
    
    if (error) {
      console.error('Error deleting daily:', error);
    }
  };

  // Todos operations
  const loadTodos = async (): Promise<DatabaseTodo[]> => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error loading todos:', error);
      return [];
    }
    
    return (data || []) as DatabaseTodo[];
  };

  const saveTodo = async (todo: Partial<DatabaseTodo> & { id?: string }) => {
    if (!user) return null;
    
    if (todo.id) {
      // Para updates, as recompensas são calculadas automaticamente pelo trigger
      const { data, error } = await supabase
        .from('todos')
        .update({
          title: todo.title,
          completed: todo.completed,
          due_date: todo.due_date,
          priority: todo.priority,
          difficulty: todo.difficulty,
          is_overdue: todo.is_overdue,
          completed_at: todo.completed_at
        })
        .eq('id', todo.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating todo:', error);
        return null;
      }
      
      return data as DatabaseTodo;
    } else {
      // Para inserts, as recompensas são calculadas automaticamente pelo trigger
      const { data, error } = await supabase
        .from('todos')
        .insert({ 
          user_id: user.id, 
          title: todo.title!,
          completed: todo.completed || false,
          due_date: todo.due_date!,
          priority: todo.priority!,
          difficulty: todo.difficulty!,
          is_overdue: todo.is_overdue || false
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating todo:', error);
        return null;
      }
      
      return data as DatabaseTodo;
    }
  };

  const deleteTodo = async (todoId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoId);
    
    if (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Achievements operations
  const loadAchievements = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) {
      console.error('Error loading achievements:', error);
      return [];
    }
    
    return data || [];
  };

  const saveAchievement = async (achievement: {
    achievement_id: string;
    unlocked: boolean;
    unlocked_at?: string;
    progress?: number;
  }) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('achievements')
      .upsert({ 
        user_id: user.id,
        achievement_id: achievement.achievement_id,
        unlocked: achievement.unlocked,
        unlocked_at: achievement.unlocked_at,
      });
    
    if (error) {
      console.error('Error saving achievement:', error);
    }
  };

  const initializeAchievements = async (achievementIds: string[]) => {
    if (!user) return;
    
    const achievementsToInsert = achievementIds.map(id => ({
      user_id: user.id,
      achievement_id: id,
      unlocked: false,
    }));
    
    const { error } = await supabase
      .from('achievements')
      .upsert(achievementsToInsert, { 
        onConflict: 'user_id,achievement_id',
        ignoreDuplicates: true 
      });
    
    if (error) {
      console.error('Error initializing achievements:', error);
    }
  };

  return {
    loading,
    loadGameState,
    saveGameState,
    loadProfile,
    saveProfile,
    loadSettings,
    saveSettings,
    loadHabits,
    saveHabit,
    deleteHabit,
    loadDailies,
    saveDaily,
    deleteDaily,
    loadTodos,
    saveTodo,
    deleteTodo,
    loadAchievements,
    saveAchievement,
    initializeAchievements,
  };
};
