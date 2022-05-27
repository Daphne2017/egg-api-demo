SELECT `game_games`.*,
       `associateTags`.`tag_id`            AS `associateTags.tagId`,
       `associateTags`.`game_id`           AS `associateTags.gameId`,
       `associateTags`.`tag_id`            AS `associateTags.id`,
       `associateTags->tagInfo`.`tag_name` AS `associateTags.tagInfo.tagName`
FROM (SELECT `game_games`.`id`,
             `game_games`.`game_name`   AS `gameName`,
             `game_games`.`simple_desc` AS `simpleDesc`,
             `game_games`.`put_status`  AS `putStatus`,
             `game_games`.`created_at`  AS `createdAt`
      FROM `game_games` AS `game_games`
      WHERE `game_games`.`game_name` LIKE '%%'
      ORDER BY `game_games`.`id` DESC
      LIMIT 0, 20) AS `game_games`
         LEFT OUTER JOIN `game_game_tag` AS `associateTags` ON `game_games`.`id` = `associateTags`.`game_id`
         LEFT OUTER JOIN `game_tags` AS `associateTags->tagInfo`
                         ON `associateTags`.`tag_id` = `associateTags->tagInfo`.`id`
ORDER BY `game_games`.`id` DESC;

select sum(tag_id=1) as tagg,sum(tag_id=2),sum(tag_id=3) from game_game_tag;
select sum(tag_id = 1) as '1',sum(tag_id = 4) as '4',sum(tag_id = 18) as '18' from game_game_tag;
select tag_id,count(*) as total  from game_game_tag group by tag_id order by total desc;

select count(1) 'allCount',
      sum(status = 1) activeNum,
      sum(status = 0) unActiveNum
      from marsgame_dev.hx_admin_users;