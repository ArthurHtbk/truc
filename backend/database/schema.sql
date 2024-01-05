create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null
);

create table cake (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null,
  main_ingredient varchar(100),
  price int not null,
  origin varchar(100),
  has_gluten tinyint(1),
  has_dairy tinyint(1),
  has_peanuts tinyint(1),
  description text 
)
