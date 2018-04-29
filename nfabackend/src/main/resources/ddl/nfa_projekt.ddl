CREATE TABLE public.nfaprojekt
(
  id bigint serial PRIMARY KEY,
  nfa_projektnummer character varying(20),
  kundenname character varying(20),
  ansprechpartner_kunde character varying(20),
  ansprechpartner_msg character varying(20),
  branche character varying(20),
  projektart character varying(20),
  entwicklungsprozess character varying(20),
  projektphase character varying(20),
  projektstatus character varying(20)
)
WITH (
  OIDS=FALSE
);
CREATE SEQUENCE public.nfaprojekt_id_seq
  INCREMENT 0
  MINVALUE 0
  MAXVALUE 0
  START 0
  CACHE 0;