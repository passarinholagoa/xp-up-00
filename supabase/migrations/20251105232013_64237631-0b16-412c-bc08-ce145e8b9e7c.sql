-- Remover conquistas duplicadas, mantendo a mais antiga de cada tipo
DELETE FROM achievements 
WHERE id IN (
  SELECT a.id
  FROM achievements a
  INNER JOIN (
    SELECT user_id, achievement_id, MIN(created_at) as first_created
    FROM achievements
    GROUP BY user_id, achievement_id
    HAVING COUNT(*) > 1
  ) b ON a.user_id = b.user_id 
     AND a.achievement_id = b.achievement_id 
     AND a.created_at > b.first_created
);

-- Adicionar constraint única para evitar duplicatas futuras
ALTER TABLE achievements 
ADD CONSTRAINT achievements_user_achievement_unique 
UNIQUE (user_id, achievement_id);