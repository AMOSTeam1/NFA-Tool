package com.msg.nfabackend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;

import javax.persistence.Column;

@Entity
@Table(name ="stakeholder")
public class Stakeholder {
	public Stakeholder() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="stakeholder_id")
	private Long stakeholder_id;
	
	@Column (name ="stakeholder_name")
	private String stakeholder_name;
}
	