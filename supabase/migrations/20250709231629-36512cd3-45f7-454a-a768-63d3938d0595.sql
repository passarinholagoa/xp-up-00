
-- Adicionar triggers que estão faltando no banco de dados

-- Primeiro, vamos garantir que todos os triggers de updated_at estão funcionando
-- (alguns podem ter sido perdidos nas migrações anteriores)

-- Recriar triggers de updated_at que podem estar faltando
DROP TRIGGER IF EXISTS update_achievements_updated_at ON public.achievements;
CREATE TRIGGER update_achievements_updated_at 
  BEFORE UPDATE ON public.achievements
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_shop_items_updated_at ON public.shop_items;
CREATE TRIGGER update_shop_items_updated_at 
  BEFORE UPDATE ON public.shop_items
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- Adicionar função para calcular se daily está em streak
CREATE OR REPLACE FUNCTION public.update_daily_streak()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Se completando uma daily pela primeira vez hoje
  IF NEW.completed = true AND OLD.completed = false THEN
    -- Verificar se completou ontem para manter streak
    IF OLD.completed_at = CURRENT_DATE - INTERVAL '1 day' OR OLD.streak = 0 THEN
      NEW.streak := OLD.streak + 1;
    ELSE
      NEW.streak := 1; -- Reset streak se não completou ontem
    END IF;
    NEW.completed_at := CURRENT_DATE;
  -- Se desmarcando uma daily
  ELSIF NEW.completed = false AND OLD.completed = true THEN
    NEW.streak := GREATEST(OLD.streak - 1, 0);
    NEW.completed_at := NULL;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger para atualizar streak das dailies
DROP TRIGGER IF EXISTS trigger_update_daily_streak ON public.dailies;
CREATE TRIGGER trigger_update_daily_streak
  BEFORE UPDATE OF completed ON public.dailies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_daily_streak();

-- Função para calcular recompensas de dailies baseadas na dificuldade
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
      RETURN QUERY SELECT 15 as xp_reward, 3 as coin_reward;
  END CASE;
END;
$$;

-- Função para atualizar recompensas de dailies
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

-- Trigger para atualizar recompensas das dailies
DROP TRIGGER IF EXISTS trigger_update_daily_rewards ON public.dailies;
CREATE TRIGGER trigger_update_daily_rewards
  BEFORE INSERT OR UPDATE OF difficulty ON public.dailies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_daily_rewards();

-- Função para calcular recompensas de todos baseadas na dificuldade e prioridade
CREATE OR REPLACE FUNCTION public.calculate_todo_rewards(difficulty_level TEXT, priority_level TEXT)
RETURNS TABLE(xp_reward INTEGER, coin_reward INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  base_xp INTEGER;
  base_coin INTEGER;
  priority_multiplier DECIMAL;
BEGIN
  -- Definir recompensas base pela dificuldade
  CASE difficulty_level
    WHEN 'easy' THEN
      base_xp := 15;
      base_coin := 3;
    WHEN 'medium' THEN
      base_xp := 20;
      base_coin := 4;
    WHEN 'hard' THEN
      base_xp := 25;
      base_coin := 5;
    ELSE
      base_xp := 20;
      base_coin := 4;
  END CASE;
  
  -- Definir multiplicador pela prioridade
  CASE priority_level
    WHEN 'low' THEN
      priority_multiplier := 1.0;
    WHEN 'medium' THEN
      priority_multiplier := 1.2;
    WHEN 'high' THEN
      priority_multiplier := 1.5;
    ELSE
      priority_multiplier := 1.0;
  END CASE;
  
  RETURN QUERY SELECT 
    (base_xp * priority_multiplier)::INTEGER as xp_reward,
    (base_coin * priority_multiplier)::INTEGER as coin_reward;
END;
$$;

-- Função para atualizar recompensas de todos
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

-- Trigger para atualizar recompensas dos todos
DROP TRIGGER IF EXISTS trigger_update_todo_rewards ON public.todos;
CREATE TRIGGER trigger_update_todo_rewards
  BEFORE INSERT OR UPDATE OF difficulty, priority ON public.todos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_todo_rewards();

-- Atualizar todos os registros existentes com as novas recompensas
UPDATE public.dailies 
SET xp_reward = CASE difficulty
  WHEN 'easy' THEN 10
  WHEN 'medium' THEN 15
  WHEN 'hard' THEN 20
  ELSE 15
END,
coin_reward = CASE difficulty
  WHEN 'easy' THEN 2
  WHEN 'medium' THEN 3
  WHEN 'hard' THEN 4
  ELSE 3
END;

UPDATE public.todos 
SET xp_reward = CASE 
  WHEN difficulty = 'easy' AND priority = 'low' THEN 15
  WHEN difficulty = 'easy' AND priority = 'medium' THEN 18
  WHEN difficulty = 'easy' AND priority = 'high' THEN 23
  WHEN difficulty = 'medium' AND priority = 'low' THEN 20
  WHEN difficulty = 'medium' AND priority = 'medium' THEN 24
  WHEN difficulty = 'medium' AND priority = 'high' THEN 30
  WHEN difficulty = 'hard' AND priority = 'low' THEN 25
  WHEN difficulty = 'hard' AND priority = 'medium' THEN 30
  WHEN difficulty = 'hard' AND priority = 'high' THEN 38
  ELSE 20
END,
coin_reward = CASE 
  WHEN difficulty = 'easy' AND priority = 'low' THEN 3
  WHEN difficulty = 'easy' AND priority = 'medium' THEN 4
  WHEN difficulty = 'easy' AND priority = 'high' THEN 5
  WHEN difficulty = 'medium' AND priority = 'low' THEN 4
  WHEN difficulty = 'medium' AND priority = 'medium' THEN 5
  WHEN difficulty = 'medium' AND priority = 'high' THEN 6
  WHEN difficulty = 'hard' AND priority = 'low' THEN 5
  WHEN difficulty = 'hard' AND priority = 'medium' THEN 6
  WHEN difficulty = 'hard' AND priority = 'high' THEN 8
  ELSE 4
END;

-- Função para gerenciar level up automático
CREATE OR REPLACE FUNCTION public.handle_level_up()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Calcular novo nível baseado no total_xp
  WHILE NEW.total_xp >= NEW.max_xp LOOP
    NEW.level := NEW.level + 1;
    NEW.total_xp := NEW.total_xp - NEW.max_xp;
    NEW.max_xp := NEW.max_xp + (NEW.level * 50); -- Aumenta XP necessário por level
    NEW.max_hp := NEW.max_hp + 10; -- Aumenta HP máximo por level
    NEW.hp := NEW.max_hp; -- Restaura HP ao subir de nível
  END LOOP;
  
  -- Atualizar XP atual
  NEW.xp := NEW.total_xp;
  
  RETURN NEW;
END;
$$;

-- Trigger para level up automático
DROP TRIGGER IF EXISTS trigger_handle_level_up ON public.game_states;
CREATE TRIGGER trigger_handle_level_up
  BEFORE UPDATE OF total_xp ON public.game_states
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_level_up();
