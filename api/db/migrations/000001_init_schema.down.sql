ALTER TABLE IF EXISTS comments DROP CONSTRAINT IF EXISTS fk_comments_feedback_id;
ALTER TABLE IF EXISTS comments DROP CONSTRAINT IF EXISTS fk_comments_user_id;
ALTER TABLE IF EXISTS feedbacks DROP CONSTRAINT IF EXISTS fk_feedbacks_user_id;
ALTER TABLE IF EXISTS feedbacks DROP CONSTRAINT IF EXISTS fk_feedbacks_external_user_id;
ALTER TABLE IF EXISTS feedbacks DROP CONSTRAINT IF EXISTS fk_feedbacks_project_id;
ALTER TABLE IF EXISTS projects DROP CONSTRAINT IF EXISTS fk_projects_user_id;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS external_users;
DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS feedback_category;
DROP TYPE IF EXISTS feedback_status;
