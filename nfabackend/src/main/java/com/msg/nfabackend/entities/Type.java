package com.msg.nfabackend.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="type-seq-gen")
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

	public String getEnglishName() {
		return englishName;
	}

	/**
	 * @param GermanName to set
	 */
	
	public void setGermanName(String germanName) {
		this.germanName = germanName;
	}
	
	/**
	 * @return the EnglishName
	 */
	public String getGermanName() {
		return germanName;
	}

	/**
	 * @param   EnglishName to set
	 */
	
	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	
}
