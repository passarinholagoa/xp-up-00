
-- Atualizar a tabela habits para garantir que as recompensas sejam calculadas baseadas na dificuldade
-- Adicionar função para calcular recompensas automaticamente
CREATE OR REPLACE FUNCTION public.calculate_habit_rewards(difficulty_level TEXT)
RETURNS TABLE(xp_reward INTEGER, coin_reward INTEGER)
LANGUAGE plpgsql
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

-- Criar trigger para atualizar automaticamente as recompensas quando a dificuldade for alterada
CREATE OR REPLACE FUNCTION public.update_habit_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
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

-- Criar o trigger
DROP TRIGGER IF EXISTS trigger_update_habit_rewards ON public.habits;
CREATE TRIGGER trigger_update_habit_rewards
  BEFORE INSERT OR UPDATE OF difficulty ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_habit_rewards();

-- Atualizar todos os hábitos existentes para usar as recompensas corretas baseadas na dificuldade
UPDATE public.habits 
SET xp_reward = CASE difficulty
  WHEN 'easy' THEN 10
  WHEN 'medium' THEN 15
  WHEN 'hard' THEN 20
  ELSE 10
END,
coin_reward = CASE difficulty
  WHEN 'easy' THEN 2
  WHEN 'medium' THEN 3
  WHEN 'hard' THEN 4
  ELSE 2
END;
