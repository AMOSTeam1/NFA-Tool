package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="nfa")
public class nfaCatalog {
	
	public nfaCatalog() {}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="nfa_id")
	private Long nfaCatalogId;
	
	@Column (name ="NFA_NUMBER")
	private Long nfaNumber;
	
	@Column (name ="nfa_type")
	private String nfaCatalogType;
	
	@Column (name ="bezeichnung")
	private String nfaCatalogBezeichnung;
	
	@Column (name ="wert")
	private Long nfaCatalogWert;

	@Column (name ="rechtliche_verbindlichkeit")
	private String rechlicheVerbindlichkeit;
	
	@Column (name ="formulierung")
	private String nfaCatalogFormulierung;
	
	@Column (name ="blueprint")
	private String nfaCatalogBlueprint;
	
	@Column (name ="referenz")
	private String nfaCatalogReferenz;
	
	@Column (name ="referenzierte_projekte")
	private String nfaCatalogReferenzierteProjekte;
	
	@Column (name ="kritikalitaet")
	private String nfaCatalogKritikalität;
	
	@Column (name ="dokument")
	private String nfaCatalogDokument;

	public Long getNfaCatalogId() {
		return nfaCatalogId;
	}

	public void setNfaCatalogId(Long nfaCatalogId) {
		this.nfaCatalogId = nfaCatalogId;
	}

	public String getNfaCatalogType() {
		return nfaCatalogType;
	}

	public void setNfaCatalogType(String nfaCatalogType) {
		this.nfaCatalogType = nfaCatalogType;
	}

	public String getNfaCatalogBezeichnung() {
		return nfaCatalogBezeichnung;
	}

	public void setNfaCatalogBezeichnung(String nfaCatalogBezeichnung) {
		this.nfaCatalogBezeichnung = nfaCatalogBezeichnung;
	}

	public String getRechlicheVerbindlichkeit() {
		return rechlicheVerbindlichkeit;
	}

	public void setRechlicheVerbindlichkeit(String rechlicheVerbindlichkeit) {
		this.rechlicheVerbindlichkeit = rechlicheVerbindlichkeit;
	}

	public String getNfaCatalogFormulierung() {
		return nfaCatalogFormulierung;
	}

	public void setNfaCatalogFormulierung(String nfaCatalogFormulierung) {
		this.nfaCatalogFormulierung = nfaCatalogFormulierung;
	}


	public String getNfaCatalogReferenz() {
		return nfaCatalogReferenz;
	}

	public void setNfaCatalogReferenz(String nfaCatalogReferenz) {
		this.nfaCatalogReferenz = nfaCatalogReferenz;
	}

	public String getNfaCatalogReferenzierteProjekte() {
		return nfaCatalogReferenzierteProjekte;
	}

	public void setNfaCatalogReferenzierteProjekte(String nfaCatalogReferenzierteProjekte) {
		this.nfaCatalogReferenzierteProjekte = nfaCatalogReferenzierteProjekte;
	}

	public String getNfaCatalogKritikalität() {
		return nfaCatalogKritikalität;
	}

	public void setNfaCatalogKritikalität(String nfaCatalogKritikalität) {
		this.nfaCatalogKritikalität = nfaCatalogKritikalität;
	}

	public String getNfaCatalogDokument() {
		return nfaCatalogDokument;
	}

	public void setNfaCatalogDokument(String nfaCatalogDokument) {
		this.nfaCatalogDokument = nfaCatalogDokument;
	}
	
	public Long getNfaCatalogWert() {
		return nfaCatalogWert;
	}

	public void setNfaCatalogWert(Long nfaCatalogWert) {
		this.nfaCatalogWert = nfaCatalogWert;
	}

	public Long getNfaNumber() {
		return nfaNumber;
	}

	public void setNfaNumber(Long nfaNumber) {
		this.nfaNumber = nfaNumber;
	}

	public String getNfaCatalogBlueprint() {
		return nfaCatalogBlueprint;
	}

	public void setNfaCatalogBlueprint(String nfaCatalogBlueprint) {
		this.nfaCatalogBlueprint = nfaCatalogBlueprint;
	}
	


}
