package com.msg.nfabackend.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@Table(name="Types")
public class Type {
	
	public Type() {}
	
	@Id
	@SequenceGenerator(name="type-seq-gen",sequenceName="PROJECT_Type_ID_SEQ" , initialValue = 1, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="type-seq-gen")
	@Column(name="ID")
	private Long id;
	
	@Column(name="EnglishName")
	private String englishName;
	
	@Column(name="GermanName")
	private String  germanName;
	
	
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the EnglishName
	 */
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
	
	/**
	 * relation between projects and project Type
	 */
	
	 @ManyToMany(fetch = FetchType.EAGER,mappedBy = "types",cascade = CascadeType.ALL)
	    private List<Project> projects = new ArrayList<>();


	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((englishName == null) ? 0 : englishName.hashCode());
		result = prime * result + ((germanName == null) ? 0 : germanName.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((projects == null) ? 0 : projects.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Type other = (Type) obj;
		if (englishName == null) {
			if (other.englishName != null)
				return false;
		} else if (!englishName.equals(other.englishName))
			return false;
		if (germanName == null) {
			if (other.germanName != null)
				return false;
		} else if (!germanName.equals(other.germanName))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (projects == null) {
			if (other.projects != null)
				return false;
		} else if (!projects.equals(other.projects))
			return false;
		return true;
	}
	
	
	
	
	 
	 
	
}
