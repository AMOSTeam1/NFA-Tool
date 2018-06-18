package com.msg.nfabackend.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Entity-Mapping for the table 'ProjectTypes'.
 * 
 */

@Entity
@Table(name="Type")
public class Type {
	
	public Type() {}
	
	@Id
	@SequenceGenerator(name="type-seq-gen",sequenceName="TYPE_ID_SEQ" , initialValue = 1, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="type-seq-gen")
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String name;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}




}
