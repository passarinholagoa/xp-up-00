
-- Corrigir a função update_habit_rewards para definir o search_path corretamente
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

-- Também vamos corrigir a função calculate_habit_rewards para ter o search_path definido
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

-- Recriar o trigger para garantir que está funcionando corretamente
DROP TRIGGER IF EXISTS trigger_update_habit_rewards ON public.habits;
CREATE TRIGGER trigger_update_habit_rewards
  BEFORE INSERT OR UPDATE OF difficulty ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_habit_rewards();
