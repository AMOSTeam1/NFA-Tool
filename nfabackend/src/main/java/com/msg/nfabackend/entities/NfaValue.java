package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="nfa_verbindlichkeit")
public class NfaValue {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private long id;
	
	@Column (name ="nfa_verbindlichkeit_from")
	private String nfaVerbindlichkeitFrom;
	
	@Column (name ="nfa_Verbindlichkeit_till")
	private String nfaVerbindlichkeitTill;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNfaVerbindlichkeitFrom() {
		return nfaVerbindlichkeitFrom;
	}

	public void setNfaVerbindlichkeitFrom(String nfaVerbindlichkeitFrom) {
		this.nfaVerbindlichkeitFrom = nfaVerbindlichkeitFrom;
	}

	public String getNfaVerbindlichkeitTill() {
		return nfaVerbindlichkeitTill;
	}

	public void setNfaVerbindlichkeitTill(String nfaVerbindlichkeitTill) {
		this.nfaVerbindlichkeitTill = nfaVerbindlichkeitTill;
	}
}
