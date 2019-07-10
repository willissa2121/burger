use PRACTICE_DB;
drop table practice;
CREATE TABLE practice(
  id INTEGER NOT NULL AUTO_INCREMENT,
  burger VARCHAR(50) NOT NULL,
  eaten VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO practice(burger,eaten)VALUES('cheese','no');
INSERT INTO practice(burger,eaten)VALUES('Onion','no');

