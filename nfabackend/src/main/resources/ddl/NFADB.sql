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


--------------------------------------------------------------
/*                 NFA CATALOG STUFF                        */
--------------------------------------------------------------

DROP TABLE IF EXISTS nfa_factor CASCADE;
CREATE TABLE public.nfa_factor
(
	factor_id serial PRIMARY KEY,
	factor varchar(45) NOT NULL
);

DROP TABLE IF EXISTS nfa_criteria CASCADE;
CREATE TABLE public.nfa_criteria
(
	criteria_id serial PRIMARY KEY,
	criteria_num int NOT NULL,
	criteria varchar(80) NOT NULL
);


DROP TABLE IF EXISTS factor_criteria;
CREATE TABLE public.factor_criteria
(
    factor_id bigint NOT NULL,
    criteria_id bigint NOT NULL,
    CONSTRAINT factor_fk FOREIGN KEY (factor_id)
        REFERENCES public.nfa_factor (factor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT criteria_fk FOREIGN KEY (criteria_id)
        REFERENCES public.nfa_criteria (criteria_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	PRIMARY KEY(factor_id, criteria_id)
);

-- 1	Effektivität
INSERT INTO nfa_factor VALUES (1,'Effektivität');

-- 2	Effizienz
INSERT INTO nfa_factor VALUES (2,'Effizienz');

-- 3	Zufriedenheit
INSERT INTO nfa_factor VALUES (3,'Zufriedenheit');

INSERT INTO nfa_criteria VALUES (1,1, 'Zufriedenheit');
INSERT INTO nfa_criteria VALUES (2,2, 'Nützlichkeit');
INSERT INTO nfa_criteria VALUES (3,3, 'Vertrauen');
INSERT INTO nfa_criteria VALUES (4,4, 'Freude im Umgang mit dem Systems');
INSERT INTO nfa_criteria VALUES (5,5, 'Komfort');

INSERT INTO public.factor_criteria VALUES (3,1);
INSERT INTO public.factor_criteria VALUES (3,2);
INSERT INTO public.factor_criteria VALUES (3,3);
INSERT INTO public.factor_criteria VALUES (3,4);
INSERT INTO public.factor_criteria VALUES (3,5);

-- 4	Risikofreiheit
INSERT INTO nfa_factor VALUES (4,'Risikofreiheit');

INSERT INTO nfa_criteria VALUES (6, 1, 'Verringerung der ökonomischen Risiken');
INSERT INTO nfa_criteria VALUES (7, 2, 'Verringerung der Risiken hinsichtlich Gesundheit und Sicherheit');
INSERT INTO nfa_criteria VALUES (8, 3, 'Verringerung der Umweltrisiken');

INSERT INTO public.factor_criteria VALUES (4,6);
INSERT INTO public.factor_criteria VALUES (4,7);
INSERT INTO public.factor_criteria VALUES (4,8);

-- 5	Umgebungsabdeckung
INSERT INTO nfa_factor VALUES (5,'Umgebungsabdeckung');

INSERT INTO nfa_criteria VALUES (9 ,1, 'Komplette Abdeckung aller Umgebungsanforderungen');
INSERT INTO nfa_criteria VALUES (10,2, 'Flexibilität');

INSERT INTO public.factor_criteria VALUES (5, 9);
INSERT INTO public.factor_criteria VALUES (5, 10);
	
-- 6	Funktionale Eignung
INSERT INTO nfa_factor VALUES (6,'Funktionale Eignung');

INSERT INTO nfa_criteria VALUES (11, 1, 'Funktionale Vollständigkeit');
INSERT INTO nfa_criteria VALUES (12, 2, 'Funktionale Korrektheit');
INSERT INTO nfa_criteria VALUES (13, 3, 'Funktionale Angemessenheit');

INSERT INTO public.factor_criteria VALUES (6, 11);
INSERT INTO public.factor_criteria VALUES (6, 12);
INSERT INTO public.factor_criteria VALUES (6, 13);

-- 7	Leistungseffizienz
INSERT INTO nfa_factor VALUES (7,'Leistungseffizienz');

INSERT INTO nfa_criteria VALUES (14 , 1, 'Zeitverhalten');
INSERT INTO nfa_criteria VALUES (15 , 2, 'Ressourcennutzung');
INSERT INTO nfa_criteria VALUES (16 , 3, 'Kapazität');

INSERT INTO public.factor_criteria VALUES (7, 14);
INSERT INTO public.factor_criteria VALUES (7, 15);
INSERT INTO public.factor_criteria VALUES (7, 16);

-- 8	Kompatibilität
INSERT INTO nfa_factor VALUES (8,'Kompatibilität');

INSERT INTO nfa_criteria VALUES (17, 1, 'Koexistenz');
INSERT INTO nfa_criteria VALUES (18, 2, 'Interoperabilität');

INSERT INTO public.factor_criteria VALUES (8, 17);
INSERT INTO public.factor_criteria VALUES (8, 18);

-- 9	Usability
INSERT INTO nfa_factor VALUES (9,'Usability');

INSERT INTO nfa_criteria VALUES (19, 1, 'Erkennbarkeit der Eignung');
INSERT INTO nfa_criteria VALUES (20, 2, 'Lernfähigkeit');
INSERT INTO nfa_criteria VALUES (21, 3, 'Bedienbarkeit');
INSERT INTO nfa_criteria VALUES (22, 4, 'Schutz der Nutzer, Fehler zu begehen');
INSERT INTO nfa_criteria VALUES (23, 5, 'Ästhetik des User-Interfaces');
INSERT INTO nfa_criteria VALUES (24, 6, 'Erreichbarkeit');

INSERT INTO public.factor_criteria VALUES (9, 19);
INSERT INTO public.factor_criteria VALUES (9, 20);
INSERT INTO public.factor_criteria VALUES (9, 21);
INSERT INTO public.factor_criteria VALUES (9, 22);
INSERT INTO public.factor_criteria VALUES (9, 23);
INSERT INTO public.factor_criteria VALUES (9, 24);

-- 10	Zuverlässigkeit
INSERT INTO nfa_factor VALUES (10,'Zuverlässigkeit');

INSERT INTO nfa_criteria VALUES (25, 1, 'Reife');
INSERT INTO nfa_criteria VALUES (26, 2, 'Verfügbarkeit');
INSERT INTO nfa_criteria VALUES (27, 3, 'Fehlertoleranz');
INSERT INTO nfa_criteria VALUES (28, 4, 'Wiederherstellbarkeit');

INSERT INTO public.factor_criteria VALUES (10, 25);
INSERT INTO public.factor_criteria VALUES (10, 26);
INSERT INTO public.factor_criteria VALUES (10, 27);
INSERT INTO public.factor_criteria VALUES (10, 28);

-- 11	Sicherheit
INSERT INTO nfa_factor VALUES (11,'Sicherheit');

INSERT INTO nfa_criteria VALUES (29, 1, 'Vertraulichkeit');
INSERT INTO nfa_criteria VALUES (30, 2, 'Integrität');
INSERT INTO nfa_criteria VALUES (31, 3, 'Nicht-Ablehnung');
INSERT INTO nfa_criteria VALUES (32, 4, 'Rechenschaft');
INSERT INTO nfa_criteria VALUES (33, 5, 'Authentizität');

INSERT INTO public.factor_criteria VALUES (11, 29);
INSERT INTO public.factor_criteria VALUES (11, 30);
INSERT INTO public.factor_criteria VALUES (11, 31);
INSERT INTO public.factor_criteria VALUES (11, 32);
INSERT INTO public.factor_criteria VALUES (11, 33);

-- 12	Wartbarkeit
INSERT INTO nfa_factor VALUES (12,'Wartbarkeit');

INSERT INTO nfa_criteria VALUES (34, 1, 'Modularität');
INSERT INTO nfa_criteria VALUES (35, 2, 'Wiederverwendbarkeit');
INSERT INTO nfa_criteria VALUES (36, 3, 'Analysierbarkeit');
INSERT INTO nfa_criteria VALUES (37, 4, 'Modifizierbarkeit');
INSERT INTO nfa_criteria VALUES (38, 5, 'Stabilität');
INSERT INTO nfa_criteria VALUES (39, 6, 'Testbarkeit');

INSERT INTO public.factor_criteria VALUES (12, 34);
INSERT INTO public.factor_criteria VALUES (12, 35);
INSERT INTO public.factor_criteria VALUES (12, 36);
INSERT INTO public.factor_criteria VALUES (12, 37);
INSERT INTO public.factor_criteria VALUES (12, 38);
INSERT INTO public.factor_criteria VALUES (12, 39);

-- 13	Übertragbarkeit
INSERT INTO nfa_factor VALUES (13,'Übertragbarkeit');

INSERT INTO nfa_criteria VALUES (40, 1, 'Anpassbarkeit');
INSERT INTO nfa_criteria VALUES (41, 2, 'Installierbarkeit');
INSERT INTO nfa_criteria VALUES (42, 3, 'Ersetzbarkeit');

INSERT INTO public.factor_criteria VALUES (13, 40);
INSERT INTO public.factor_criteria VALUES (13, 41);
INSERT INTO public.factor_criteria VALUES (13, 42);



DROP TABLE IF EXISTS nfa_catalog;CREATE TABLE public.nfa_catalog
(
 ID bigserial PRIMARY KEY,
 NFA_TYPE character varying(40),
 BEZEICHNUNG character varying(40),
 RECHTLICHE_VERBINDLICHKEIT character varying(40),
 WERT real,
 FORMULIERUNG character varying(40),
 ERKLAERUNG character varying(40),
 REFERENZ character varying(40),
 REFERENZIERTE_PROJEKTE character varying(40),
 KRITIKALITAET character varying(40),    
DOKUMENT character varying(40));
INSERT INTO nfa_catalog VALUES (1,'Type:1','Bezeichnung:1','Verbindlichkeit:1','12.22','Formulierung:1','erklaerung:1','referenz:1','referenzierte_projekt:1','kritikalitaet', 'document1');

--Matric

DROP TABLE IF EXISTS nfa_matric CASCADE;
CREATE TABLE public.nfa_matric
(
	matric_id serial PRIMARY KEY,
	matric_num int NOT NULL,
	matric varchar(80) NOT NULL
);
DROP TABLE IF EXISTS matric_criteria;
CREATE TABLE public.matric_criteria
(
    
    criteria_id bigint NOT NULL,
	matric_id bigint NOT NULL,
        CONSTRAINT criteria_fk FOREIGN KEY (criteria_id)
        REFERENCES public.nfa_criteria (criteria_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT matric_fk FOREIGN KEY (matric_id)
        REFERENCES public.nfa_matric (matric_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	PRIMARY KEY(criteria_id, matric_id)
);
-- 1	Effektivität
INSERT INTO nfa_matric VALUES (1,1,'Effektivität 1');
INSERT INTO nfa_matric VALUES (2,2,'Effektivität 2');
INSERT INTO nfa_matric VALUES (3,3,'Effektivität 3');
INSERT INTO nfa_matric VALUES (4,4,'Effektivität 4');
INSERT INTO nfa_matric VALUES (5,5,'Effektivität 5');



-- 2	Effizienz
INSERT INTO nfa_matric VALUES (6,1,'Effizienz 1');
INSERT INTO nfa_matric VALUES (7,2,'Effizienz 2');
INSERT INTO nfa_matric VALUES (8,3,'Effizienz 3');
INSERT INTO nfa_matric VALUES (9,4,'Effizienz 4');
INSERT INTO nfa_matric VALUES (10,5,'Effizienz 5');
INSERT INTO nfa_matric VALUES (11,6,'Effizienz 6');
INSERT INTO nfa_matric VALUES (12,7,'Effizienz 7');
INSERT INTO nfa_matric VALUES (13,8,'Effizienz 8');


-- 3	Zufriedenheit
INSERT INTO nfa_matric VALUES (14,1, 'Zufriedenheit 1');

INSERT INTO nfa_matric VALUES (15,2, 'Nützlichkeit 1');
INSERT INTO nfa_matric VALUES (16,3,'Nützlichkeit 2');
INSERT INTO nfa_matric VALUES (17,4,'Nützlichkeit 3');
INSERT INTO nfa_matric VALUES (18,5,'Nützlichkeit 4');
INSERT INTO nfa_matric VALUES (19,6, 'Nützlichkeit 5');

INSERT INTO nfa_matric VALUES (20,7, 'Vertraun 1');

INSERT INTO nfa_matric VALUES (21,8, ' Freude im Umgang mit dem System 1');

INSERT INTO nfa_matric VALUES (22,9, 'Komfort 1');



INSERT INTO public.matric_criteria VALUES (3,14);
INSERT INTO public.matric_criteria VALUES (3,15);
INSERT INTO public.matric_criteria VALUES (3,16);
INSERT INTO public.matric_criteria VALUES (3,17);
INSERT INTO public.matric_criteria VALUES (3,18);
INSERT INTO public.matric_criteria VALUES (3,19);
INSERT INTO public.matric_criteria VALUES (3,20);
INSERT INTO public.matric_criteria VALUES (3,21);
INSERT INTO public.matric_criteria VALUES (3,22);



-- 4	Risikofreiheit
INSERT INTO nfa_matric VALUES (23,1,'Verringerung der ökonomischen Risiken 1');
INSERT INTO nfa_matric VALUES (24,2,'Verringerung der ökonomischen Risiken 2');
INSERT INTO nfa_matric VALUES (25,3,'Verringerung der ökonomischen Risiken 3');
INSERT INTO nfa_matric VALUES (26,4,'Verringerung der ökonomischen Risiken 4');
INSERT INTO nfa_matric VALUES (27,5,'Verringerung der ökonomischen Risiken 5');
INSERT INTO nfa_matric VALUES (28,6,'Verringerung der ökonomischen Risiken 6');
INSERT INTO nfa_matric VALUES (29,7,'Verringerung der ökonomischen Risiken 7');
INSERT INTO nfa_matric VALUES (30,8,'Verringerung der ökonomischen Risiken 8');
INSERT INTO nfa_matric VALUES (31,9,'Verringerung der ökonomischen Risiken 9');
INSERT INTO nfa_matric VALUES (32,10,'Verringerung der ökonomischen Risiken 10');
INSERT INTO nfa_matric VALUES (33,11,'Verringerung der ökonomischen Risiken 11');
INSERT INTO nfa_matric VALUES (34,12,'Verringerung der ökonomischen Risiken 12');
INSERT INTO nfa_matric VALUES (35,13,'Verringerung der ökonomischen Risiken 13');
INSERT INTO nfa_matric VALUES (36,14,'Verringerung der ökonomischen Risiken 14');

INSERT INTO public.matric_criteria VALUES (4,23);
INSERT INTO public.matric_criteria VALUES (4,24);
INSERT INTO public.matric_criteria VALUES (4,25);
INSERT INTO public.matric_criteria VALUES (4,26);
INSERT INTO public.matric_criteria VALUES (4,27);
INSERT INTO public.matric_criteria VALUES (4,28);
INSERT INTO public.matric_criteria VALUES (4,29);
INSERT INTO public.matric_criteria VALUES (4,30);
INSERT INTO public.matric_criteria VALUES (4,31);
INSERT INTO public.matric_criteria VALUES (4,32);
INSERT INTO public.matric_criteria VALUES (4,33);
INSERT INTO public.matric_criteria VALUES (4,34);
INSERT INTO public.matric_criteria VALUES (4,35);
INSERT INTO public.matric_criteria VALUES (4,36);




INSERT INTO nfa_matric VALUES (37,15,' Verringerung der Risiken hinsichtlich Gesundheit und Sicherheit 1');
INSERT INTO nfa_matric VALUES (38,16,' Verringerung der Risiken hinsichtlich Gesundheit und Sicherheit 2');
INSERT INTO nfa_matric VALUES (39,17,' Verringerung der Risiken hinsichtlich Gesundheit und Sicherheit 3');
INSERT INTO nfa_matric VALUES (40,18,' Verringerung der Risiken hinsichtlich Gesundheit und Sicherheit 4');
INSERT INTO nfa_matric VALUES (41,19,' Verringerung der Risiken hinsichtlich Gesundheit und Sicherheit 5');


INSERT INTO public.matric_criteria VALUES (4,37);
INSERT INTO public.matric_criteria VALUES (4,38);
INSERT INTO public.matric_criteria VALUES (4,39);
INSERT INTO public.matric_criteria VALUES (4,40);
INSERT INTO public.matric_criteria VALUES (4,41);


INSERT INTO nfa_matric VALUES (42, 20, 'Verringerung der Umweltrisiken 1');
INSERT INTO nfa_matric VALUES (43, 21, 'Verringerung der Umweltrisiken 2');
INSERT INTO nfa_matric VALUES (44, 22, 'Verringerung der Umweltrisiken 3');

INSERT INTO public.matric_criteria VALUES (4,42);
INSERT INTO public.matric_criteria VALUES (4,43);
INSERT INTO public.matric_criteria VALUES (4,44);


-- 5	Umgebungsabdeckung

INSERT INTO nfa_matric VALUES (45 ,1, 'Komplette Abdeckung aller Umgebungsanforderungen 1');

INSERT INTO public.matric_criteria VALUES (5, 45);


INSERT INTO nfa_matric VALUES (46,2, 'Flexibilität 1');
INSERT INTO nfa_matric VALUES (47,3, 'Flexibilität 2');
INSERT INTO nfa_matric VALUES (48,4, 'Flexibilität 3');
INSERT INTO nfa_matric VALUES (49,5, 'Flexibilität 4');
INSERT INTO nfa_matric VALUES (50,6, 'Flexibilität 5');
INSERT INTO nfa_matric VALUES (51,7, 'Flexibilität 6');
INSERT INTO nfa_matric VALUES (52,8, 'Flexibilität 7');
INSERT INTO nfa_matric VALUES (53,9, 'Flexibilität 8');


INSERT INTO public.matric_criteria VALUES (5, 46);
INSERT INTO public.matric_criteria VALUES (5, 47);
INSERT INTO public.matric_criteria VALUES (5, 48);
INSERT INTO public.matric_criteria VALUES (5, 49);
INSERT INTO public.matric_criteria VALUES (5, 50);
INSERT INTO public.matric_criteria VALUES (5, 51);
INSERT INTO public.matric_criteria VALUES (5, 52);
INSERT INTO public.matric_criteria VALUES (5, 53);

	
-- 6	Funktionale Eignung

INSERT INTO nfa_matric VALUES (54, 1, 'Funktionale Vollständigkeit 1');
INSERT INTO nfa_matric VALUES (55, 2, 'Funktionale Vollständigkeit 2');
INSERT INTO nfa_matric VALUES (56, 3, 'Funktionale Vollständigkeit 3');
INSERT INTO nfa_matric VALUES (57, 4, 'Funktionale Vollständigkeit 4');

INSERT INTO public.matric_criteria VALUES (6, 54);
INSERT INTO public.matric_criteria VALUES (6, 55);
INSERT INTO public.matric_criteria VALUES (6, 56);
INSERT INTO public.matric_criteria VALUES (6, 57);



INSERT INTO nfa_matric VALUES (58, 5, 'Funktionale Korrektheit 1');
INSERT INTO nfa_matric VALUES (59, 6, 'Funktionale Korrektheit 2');
INSERT INTO nfa_matric VALUES (60, 7, 'Funktionale Korrektheit 3');
INSERT INTO nfa_matric VALUES (61, 8, 'Funktionale Korrektheit 4');
INSERT INTO nfa_matric VALUES (62, 9, 'Funktionale Korrektheit 5');
INSERT INTO nfa_matric VALUES (63, 10, 'Funktionale Korrektheit 6');
INSERT INTO nfa_matric VALUES (64, 11, 'Funktionale Korrektheit 7');



INSERT INTO public.matric_criteria VALUES (6, 58);
INSERT INTO public.matric_criteria VALUES (6, 59);
INSERT INTO public.matric_criteria VALUES (6, 60);
INSERT INTO public.matric_criteria VALUES (6, 61);
INSERT INTO public.matric_criteria VALUES (6, 62);
INSERT INTO public.matric_criteria VALUES (6, 63);
INSERT INTO public.matric_criteria VALUES (6, 64);


INSERT INTO nfa_matric VALUES (65, 12, 'Funktionale Angemessenheit 1');
INSERT INTO nfa_matric VALUES (66, 13, 'Funktionale Angemessenheit 2');
INSERT INTO nfa_matric VALUES (67, 14, 'Funktionale Angemessenheit 3');
INSERT INTO nfa_matric VALUES (68, 15, 'Funktionale Angemessenheit 4');
INSERT INTO nfa_matric VALUES (69, 16, 'Funktionale Angemessenheit 5');
INSERT INTO nfa_matric VALUES (70, 17, 'Funktionale Angemessenheit 6');
INSERT INTO nfa_matric VALUES (71, 18, 'Funktionale Angemessenheit 7');
INSERT INTO nfa_matric VALUES (72, 19, 'Funktionale Angemessenheit 8');
INSERT INTO nfa_matric VALUES (73, 20, 'Funktionale Angemessenheit 9');


INSERT INTO public.matric_criteria VALUES (6, 65);
INSERT INTO public.matric_criteria VALUES (6, 66);
INSERT INTO public.matric_criteria VALUES (6, 67);
INSERT INTO public.matric_criteria VALUES (6, 68);
INSERT INTO public.matric_criteria VALUES (6, 69);
INSERT INTO public.matric_criteria VALUES (6, 70);
INSERT INTO public.matric_criteria VALUES (6, 71);
INSERT INTO public.matric_criteria VALUES (6, 72);
INSERT INTO public.matric_criteria VALUES (6, 73);


