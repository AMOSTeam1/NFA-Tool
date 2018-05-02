CREATE TABLE NFA_PROJECT
(
  ID bigint PRIMARY KEY,
  NFA_PROJECT_NUMBER character varying(40),
  CUSTOMER_NAME character varying(40),
  CONTACT_PERS_CUSTOMER character varying(40),
  CONTACT_PERS_MSG character varying(40),
  BRANCH character varying(40),
  PROJECT_TYPE character varying(40),
  DEVELOPMENT_PROCESS character varying(40),
  PROJECT_PHASE character varying(40),
  PROJECT_STATUS character varying(40)
)
WITH (
  OIDS=FALSE
);
CREATE SEQUENCE NFA_PROJECT_ID_SEQ
  INCREMENT 1
  MINVALUE 0
  MAXVALUE 1000000000
  START 0
  CACHE 1;