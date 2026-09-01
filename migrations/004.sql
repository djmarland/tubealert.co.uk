CREATE INDEX IF NOT EXISTS idx_subscription_line_day_hour_is_block_start
    ON subscription(line_id, day, hour, is_block_start);

CREATE INDEX IF NOT EXISTS idx_subscription_subscriber_line
    ON subscription(subscriber_id, line_id);

UPDATE `line`
    SET
        `name` = 'Hammersmith & City Line',
        `short_name` = 'Hammersmith & City'
  WHERE `id` = 'hammersmith-city';

UPDATE `line`
    SET
        `name` = 'Waterloo & City Line',
        `short_name` = 'Waterloo & City'
  WHERE `id` = 'waterloo-city';
