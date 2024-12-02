UPDATE `line` SET `display_order` = 19 WHERE `id` = 'dlr';
UPDATE `line` SET `display_order` = 0 WHERE `id` = 'london-overground';

INSERT INTO `line` (`name`, `short_name`, `url_key`, `id`, `display_order`)
VALUES ('Liberty Line', 'Liberty', 'liberty-line', 'liberty', 13),
       ('Lioness Line', 'Lioness', 'lioness-line', 'lioness', 14),
       ('Mildmay Line', 'Mildmay', 'mildmay-line', 'mildmay', 15),
       ('Suffragette Line', 'Suffragette', 'suffragette-line', 'suffragette', 16),
       ('Weaver Line', 'Weaver', 'weaver-line', 'weaver', 17),
       ('Windrush Line', 'Windrush', 'windrush-line', 'windrush', 18),
       ('Tram', 'Tram', 'tram', 'tram', 20);
