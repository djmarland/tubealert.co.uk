DROP TABLE IF EXISTS `line`;
CREATE TABLE `line`
(
    `id`             varchar(50) PRIMARY KEY,
    `name`           varchar(50) NOT NULL,
    `short_name`     varchar(50) NOT NULL,
    `url_key`        varchar(50) NOT NULL,
    `display_order`  INTEGER     NOT NULL,
    `is_disrupted`   TINYINT  DEFAULT '0',
    `updated_at`     DATETIME DEFAULT CURRENT_TIMESTAMP,
    `status_summary` text     DEFAULT 'No Information',
    `status_full`    text     DEFAULT 'No Information',
    `details`        json     DEFAULT NULL
);

INSERT INTO `line` (`name`, `short_name`, `url_key`, `id`, `display_order`)
VALUES ('Bakerloo Line', 'Bakerloo', 'bakerloo-line', 'bakerloo', 1),
       ('Central Line', 'Central', 'central-line', 'central', 2),
       ('Circle Line', 'Circle', 'circle-line', 'circle', 3),
       ('District Line', 'District', 'district-line', 'district', 4),
       ('Hammersmith \u0026 City Line', 'Hammersmith \u0026 City', 'hammersmith-city-line', 'hammersmith-city', 5),
       ('Jubilee Line', 'Jubilee', 'jubilee-line', 'jubilee', 6),
       ('Metropolitan Line', 'Metropolitan', 'metropolitan-line', 'metropolitan', 7),
       ('Northern Line', 'Northern', 'northern-line', 'northern', 8),
       ('Piccadilly Line', 'Piccadilly', 'piccadilly-line', 'piccadilly', 9),
       ('Victoria Line', 'Victoria', 'victoria-line', 'victoria', 10),
       ('Waterloo \u0026 City Line', 'Waterloo \u0026 City', 'waterloo-city-line', 'waterloo-city', 11),
       ('Elizabeth Line', 'Elizabeth', 'elizabeth-line', 'elizabeth', 12),
       ('London Overground', 'London Overground', 'london-overground', 'london-overground', 13),
       ('DLR', 'DLR', 'dlr', 'dlr', 14);
