
-- Criar tabela de estados do jogo
CREATE TABLE public.game_states (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  hp INTEGER NOT NULL DEFAULT 50,
  max_hp INTEGER NOT NULL DEFAULT 50,
  xp INTEGER NOT NULL DEFAULT 0,
  total_xp INTEGER NOT NULL DEFAULT 0,
  max_xp INTEGER NOT NULL DEFAULT 100,
  coins INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela de perfis
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Aventureiro',
  avatar TEXT NOT NULL DEFAULT 'default-avatar',
  frame_border TEXT NOT NULL DEFAULT 'default-frame',
  name_color TEXT NOT NULL DEFAULT '#ffffff',
  background_color TEXT NOT NULL DEFAULT '#1a1a1a',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela de configurações
CREATE TABLE public.settings (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  global_notifications BOOLEAN NOT NULL DEFAULT true,
  daily_reminder BOOLEAN NOT NULL DEFAULT true,
  reminder_time TEXT NOT NULL DEFAULT '09:00',
  hardcore_mode BOOLEAN NOT NULL DEFAULT false,
  vacation_mode BOOLEAN NOT NULL DEFAULT false,
  animated_xp_bar BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela de hábitos
CREATE TABLE public.habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  streak INTEGER NOT NULL DEFAULT 0,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER NOT NULL DEFAULT 10,
  coin_reward INTEGER NOT NULL DEFAULT 2,
  is_positive BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela de tarefas diárias
CREATE TABLE public.dailies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  due_time TEXT NOT NULL DEFAULT '09:00',
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER NOT NULL DEFAULT 10,
  coin_reward INTEGER NOT NULL DEFAULT 2,
  streak INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar tabela de todos
CREATE TABLE public.todos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  due_date TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER NOT NULL DEFAULT 15,
  coin_reward INTEGER NOT NULL DEFAULT 3,
  is_overdue BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.game_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dailies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para game_states
CREATE POLICY "Users can view their own game state" ON public.game_states FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own game state" ON public.game_states FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own game state" ON public.game_states FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para settings
CREATE POLICY "Users can view their own settings" ON public.settings FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own settings" ON public.settings FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own settings" ON public.settings FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para habits
CREATE POLICY "Users can view their own habits" ON public.habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own habits" ON public.habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habits" ON public.habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habits" ON public.habits FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para dailies
CREATE POLICY "Users can view their own dailies" ON public.dailies FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own dailies" ON public.dailies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own dailies" ON public.dailies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own dailies" ON public.dailies FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para todos
CREATE POLICY "Users can view their own todos" ON public.todos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own todos" ON public.todos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own todos" ON public.todos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own todos" ON public.todos FOR DELETE USING (auth.uid() = user_id);

-- Funções para calcular recompensas baseadas na dificuldade
CREATE OR REPLACE FUNCTION public.calculate_habit_rewards(difficulty_level TEXT)
RETURNS TABLE(xp_reward INTEGER, coin_reward INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  CASE difficulty_level
    WHEN 'easy' THEN
      RETURN QUERY SELECT 10 as xp_reward, 2 as coin_reward;
    WHEN 'medium' THEN
      RETURN QUERY SELECT 15 as xp_reward, 3 as coin_reward;
    WHEN 'hard' THEN
      RETURN QUERY SELECT 20 as xp_reward, 4 as coin_reward;
    ELSE
      RETURN QUERY SELECT 10 as xp_reward, 2 as coin_reward;
  END CASE;
END;
$$;

-- Trigger para atualizar recompensas dos hábitos automaticamente
CREATE OR REPLACE FUNCTION public.update_habit_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  rewards RECORD;
BEGIN
  SELECT * INTO rewards FROM public.calculate_habit_rewards(NEW.difficulty);
  NEW.xp_reward := rewards.xp_reward;
  NEW.coin_reward := rewards.coin_reward;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_habit_rewards
  BEFORE INSERT OR UPDATE OF difficulty ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_habit_rewards();

-- Funções similares para dailies
CREATE OR REPLACE FUNCTION public.calculate_daily_rewards(difficulty_level TEXT)
RETURNS TABLE(xp_reward INTEGER, coin_reward INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  CASE difficulty_level
    WHEN 'easy' THEN
      RETURN QUERY SELECT 10 as xp_reward, 2 as coin_reward;
    WHEN 'medium' THEN
      RETURN QUERY SELECT 15 as xp_reward, 3 as coin_reward;
    WHEN 'hard' THEN
      RETURN QUERY SELECT 20 as xp_reward, 4 as coin_reward;
    ELSE
      RETURN QUERY SELECT 10 as xp_reward, 2 as coin_reward;
  END CASE;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_daily_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  rewards RECORD;
BEGIN
  SELECT * INTO rewards FROM public.calculate_daily_rewards(NEW.difficulty);
  NEW.xp_reward := rewards.xp_reward;
  NEW.coin_reward := rewards.coin_reward;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_daily_rewards
  BEFORE INSERT OR UPDATE OF difficulty ON public.dailies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_daily_rewards();

-- Funções para todos com multiplicador de prioridade
CREATE OR REPLACE FUNCTION public.calculate_todo_rewards(difficulty_level TEXT, priority_level TEXT)
RETURNS TABLE(xp_reward INTEGER, coin_reward INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  base_xp INTEGER;
  base_coins INTEGER;
  multiplier DECIMAL;
BEGIN
  -- Definir recompensas base por dificuldade
  CASE difficulty_level
    WHEN 'easy' THEN
      base_xp := 15;
      base_coins := 3;
    WHEN 'medium' THEN
      base_xp := 20;
      base_coins := 4;
    WHEN 'hard' THEN
      base_xp := 25;
      base_coins := 5;
    ELSE
      base_xp := 15;
      base_coins := 3;
  END CASE;
  
  -- Aplicar multiplicador de prioridade
  CASE priority_level
    WHEN 'low' THEN
      multiplier := 1.0;
    WHEN 'medium' THEN
      multiplier := 1.2;
    WHEN 'high' THEN
      multiplier := 1.5;
    ELSE
      multiplier := 1.0;
  END CASE;
  
  RETURN QUERY SELECT (base_xp * multiplier)::INTEGER as xp_reward, (base_coins * multiplier)::INTEGER as coin_reward;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_todo_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  rewards RECORD;
BEGIN
  SELECT * INTO rewards FROM public.calculate_todo_rewards(NEW.difficulty, NEW.priority);
  NEW.xp_reward := rewards.xp_reward;
  NEW.coin_reward := rewards.coin_reward;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_todo_rewards
  BEFORE INSERT OR UPDATE OF difficulty, priority ON public.todos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_todo_rewards();
