DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE `subscriber` (
    `id` varchar(1000) PRIMARY KEY,
    `subscription` json NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS `subscription`;
CREATE TABLE `subscription` (
    `id` INTEGER PRIMARY KEY,
    `line_id` varchar(50) NOT NULL,
    `subscriber_id` varchar(1000) NOT NULL,
    `day` INTEGER NOT NULL,
    `hour` INTEGER NOT NULL,
    `is_block_start` TINYINT DEFAULT '0',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `subscription_line` FOREIGN KEY(`line_id`) REFERENCES `line`(`id`),
    CONSTRAINT `subscription_subscriber` FOREIGN KEY(`subscriber_id`) REFERENCES `subscriber`(`id`) ON DELETE CASCADE
);