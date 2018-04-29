package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlType;

/**
 * Entity-Mapping for the table 'nfaprojekt'.
 * 
 * @author <a href="mailto:alla.bors@fau.de">Alla Bors</a>
 */
@Entity
@Table(name="nfaprojekt")
public class Project {
	
	public Project() {}
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="ID")
	private Long id;
	
	@Column(name="nfa_projektnummer")
	private String nfaProjektnummer;
	
	@Column(name="kundenname")
	private String kundenname;
	
	@Column(name="ansprechpartner_kunde")
	private String ansprechpartnerKunde;
	
	@Column(name="ansprechpartner_msg")
	private String ansprechpartnerMsg;
	
	@Column(name="branche")
	private String branche;
	
	@Column(name="projektart")
	private String projektart;
	
	@Column(name="entwicklungsprozess")
	private String entwicklungsprozess;
	
	@Column(name="projektphase")
	private String projektphase;
	
	@Column(name="projektstatus")
	private String projektstatus;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNfaProjektnummer() {
		return nfaProjektnummer;
	}

	public void setNfaProjektnummer(String nfaProjektnummer) {
		this.nfaProjektnummer = nfaProjektnummer;
	}

	public String getKundenname() {
		return kundenname;
	}

	public void setKundenname(String kundenname) {
		this.kundenname = kundenname;
	}

	public String getAnsprechpartnerKunde() {
		return ansprechpartnerKunde;
	}

	public void setAnsprechpartnerKunde(String ansprechpartnerKunde) {
		this.ansprechpartnerKunde = ansprechpartnerKunde;
	}

	public String getAnsprechpartnerMsg() {
		return ansprechpartnerMsg;
	}

	public void setAnsprechpartnerMsg(String ansprechpartnerMsg) {
		this.ansprechpartnerMsg = ansprechpartnerMsg;
	}

	public String getBranche() {
		return branche;
	}

	public void setBranche(String branche) {
		this.branche = branche;
	}

	public String getProjektart() {
		return projektart;
	}

	public void setProjektart(String projektart) {
		this.projektart = projektart;
	}

	public String getEntwicklungsprozess() {
		return entwicklungsprozess;
	}

	public void setEntwicklungsprozess(String entwicklungsprozess) {
		this.entwicklungsprozess = entwicklungsprozess;
	}

	public String getProjektphase() {
		return projektphase;
	}

	public void setProjektphase(String projektphase) {
		this.projektphase = projektphase;
	}

	public String getProjektstatus() {
		return projektstatus;
	}

	public void setProjektstatus(String projektstatus) {
		this.projektstatus = projektstatus;
	}
}
