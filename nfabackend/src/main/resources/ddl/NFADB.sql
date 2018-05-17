DROP TABLE IF EXISTS project_type;
DROP TABLE IF EXISTS nfa_project;


CREATE TABLE public.nfa_project
(
  ID bigserial PRIMARY KEY,
  NFA_PROJECT_NUMBER character varying(40),
  CUSTOMER_NAME character varying(40),
  CONTACT_PERS_CUSTOMER character varying(40),
  CONTACT_PERS_MSG character varying(40),
  BRANCH character varying(40),
  DEVELOPMENT_PROCESS character varying(40),
  PROJECT_PHASE character varying(40),
  PROJECT_STATUS character varying(40)	
);
INSERT INTO nfa_project VALUES (1,'1234','ArbeitAgentur','Tom','Alex','Public Sector','Agile','Specification Sheet','On Process');
INSERT INTO nfa_project VALUES (2,'1234','XYZ','Bob','Alex','Public Sector','Agile','Specification Sheet','Archived');
INSERT INTO nfa_project VALUES (3,'1234','ABC','John','Alex','Public Sector','Agile','Specification Sheet','On Process');
INSERT INTO nfa_project VALUES (4,'1234','ASDF','Andre','Alex','Public Sector','Agile','Specification Sheet','Archived');
  
DROP TABLE IF EXISTS new_nfa;

CREATE TABLE new_nfa (
  nfa_id serial NOT NULL,
  factor varchar(45) NOT NULL,
  criteria varchar(45) NOT NULL,
  metric varchar(100) DEFAULT NULL,
  nfa_type varchar(100) DEFAULT NULL,
  PRIMARY KEY (nfa_id)
);

INSERT INTO new_nfa VALUES (1,'any factor','any criteria','any metric','any nfatype');

DROP TABLE IF EXISTS public.type;
CREATE TABLE public.type
(
    id bigserial NOT NULL,
    name character varying(100),
    PRIMARY KEY (id)
);

INSERT INTO public.type VALUES (1,'Communication Project');
INSERT INTO public.type VALUES (2,'Data Exchange Project');	

DROP TABLE IF EXISTS project_type;
CREATE TABLE public.project_type
(
    project_id bigint NOT NULL,
    type_id bigint NOT NULL,
    CONSTRAINT project_fk FOREIGN KEY (project_id)
        REFERENCES public.nfa_project (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT type_fk FOREIGN KEY (type_id)
        REFERENCES public.type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO public.project_type VALUES (1,1);
INSERT INTO public.project_type VALUES (1,2);
INSERT INTO public.project_type VALUES (2,2);
INSERT INTO public.project_type VALUES (3,1);
INSERT INTO public.project_type VALUES (4,2);