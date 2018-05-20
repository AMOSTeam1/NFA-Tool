package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="nfa_catalog")
public class nfaCatalog {
	
	public nfaCatalog() {}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="id")
	private Long nfaCatalogId;
	
	@Column (name ="nfa_type")
	private String nfaCatalogType;
	
	@Column (name ="bezeichnung")
	private String nfaCatalogBezeichnung;
	
	@Column (name ="wert")
	private Long nfaCatalogWert;
	
	public Long getNfaCatalogWert() {
		return nfaCatalogWert;
	}

	public void setNfaCatalogWert(Long nfaCatalogWert) {
		this.nfaCatalogWert = nfaCatalogWert;
	}

	@Column (name ="rechtliche_verbindlichkeit")
	private String rechlicheVerbindlichkeit;
	
	@Column (name ="formulierung")
	private String nfaCatalogFormulierung;
	
	@Column (name ="erklaerung")
	private String nfaCatalogErklaerung;
	
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

	public String getNfaCatalogErklärung() {
		return nfaCatalogErklaerung;
	}

	public void setNfaCatalogErklärung(String nfaCatalogErklärung) {
		this.nfaCatalogErklaerung = nfaCatalogErklärung;
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

	

}
