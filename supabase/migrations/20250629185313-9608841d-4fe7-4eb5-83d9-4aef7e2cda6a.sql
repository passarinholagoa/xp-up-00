
-- Criar tabela para perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Aventureiro',
  avatar TEXT NOT NULL DEFAULT '👤',
  frame_border TEXT NOT NULL DEFAULT 'border-2 border-primary/50',
  name_color TEXT NOT NULL DEFAULT 'text-foreground',
  background_color TEXT NOT NULL DEFAULT 'bg-card',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Criar tabela para estado do jogo
CREATE TABLE public.game_states (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  hp INTEGER NOT NULL DEFAULT 100,
  max_hp INTEGER NOT NULL DEFAULT 100,
  xp INTEGER NOT NULL DEFAULT 0,
  total_xp INTEGER NOT NULL DEFAULT 0,
  max_xp INTEGER NOT NULL DEFAULT 100,
  coins INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Criar tabela para hábitos
CREATE TABLE public.habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  streak INTEGER NOT NULL DEFAULT 0,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER NOT NULL DEFAULT 10,
  coin_reward INTEGER NOT NULL DEFAULT 2,
  is_positive BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para dailies
CREATE TABLE public.dailies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  due_time TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER NOT NULL DEFAULT 15,
  coin_reward INTEGER NOT NULL DEFAULT 3,
  streak INTEGER NOT NULL DEFAULT 0,
  completed_at DATE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para todos (quests)
CREATE TABLE public.todos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  due_date DATE NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  xp_reward INTEGER NOT NULL DEFAULT 20,
  coin_reward INTEGER NOT NULL DEFAULT 4,
  is_overdue BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para conquistas
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  unlocked_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para itens da loja
CREATE TABLE public.shop_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  owned BOOLEAN NOT NULL DEFAULT false,
  purchased_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para configurações
CREATE TABLE public.settings (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  global_notifications BOOLEAN NOT NULL DEFAULT true,
  daily_reminder BOOLEAN NOT NULL DEFAULT true,
  reminder_time TEXT NOT NULL DEFAULT '09:00',
  hardcore_mode BOOLEAN NOT NULL DEFAULT false,
  vacation_mode BOOLEAN NOT NULL DEFAULT false,
  animated_xp_bar BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dailies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para game_states
CREATE POLICY "Users can view their own game state" ON public.game_states
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own game state" ON public.game_states
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own game state" ON public.game_states
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para habits
CREATE POLICY "Users can view their own habits" ON public.habits
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own habits" ON public.habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habits" ON public.habits
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habits" ON public.habits
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para dailies
CREATE POLICY "Users can view their own dailies" ON public.dailies
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own dailies" ON public.dailies
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own dailies" ON public.dailies
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own dailies" ON public.dailies
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para todos
CREATE POLICY "Users can view their own todos" ON public.todos
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own todos" ON public.todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own todos" ON public.todos
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own todos" ON public.todos
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para achievements
CREATE POLICY "Users can view their own achievements" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own achievements" ON public.achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own achievements" ON public.achievements
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para shop_items
CREATE POLICY "Users can view their own shop items" ON public.shop_items
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own shop items" ON public.shop_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own shop items" ON public.shop_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para settings
CREATE POLICY "Users can view their own settings" ON public.settings
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own settings" ON public.settings
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own settings" ON public.settings
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Função para resetar dailies automaticamente
CREATE OR REPLACE FUNCTION public.reset_dailies()
RETURNS void AS $$
BEGIN
  UPDATE public.dailies 
  SET completed = false, completed_at = null, updated_at = now()
  WHERE completed_at < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para atualizar is_overdue nos todos
CREATE OR REPLACE FUNCTION public.update_overdue_todos()
RETURNS void AS $$
BEGIN
  UPDATE public.todos 
  SET is_overdue = true, updated_at = now()
  WHERE due_date < CURRENT_DATE AND NOT completed AND NOT is_overdue;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_game_states_updated_at BEFORE UPDATE ON public.game_states
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_habits_updated_at BEFORE UPDATE ON public.habits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dailies_updated_at BEFORE UPDATE ON public.dailies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON public.todos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
