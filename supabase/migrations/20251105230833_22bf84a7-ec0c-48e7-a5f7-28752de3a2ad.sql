-- Criar trigger para level up automático
CREATE TRIGGER trigger_level_up
  BEFORE UPDATE ON public.game_states
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_level_up();