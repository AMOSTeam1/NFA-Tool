package com.msg.nfabackend.services;
import java.util.Set;
import javax.xml.bind.annotation.*;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import com.msg.nfabackend.entities.*;


/**
 * 
 * @author Mai
 * This file is xml structure for the project data 
 *
 */
@XmlRootElement(name = "project")
@XmlType(propOrder = { "name", "faktor" ,"stakeholderId", "stakeholderName"})
public class ProjectXml {
		 	     
	    private Long projectId;
	    private Long stakeholderId; 
	    private Set<Stakeholder> stakeholderList;
	    private Set<NfaFactor> factorsList;
	    private NfaCriteria crieria;
	    private Metric metric;
	    private Set<NfaCatalog> nfasList;
	    private Stakeholder stakeholder;
	    private NfaFactor factor;
	    private NfaCatalog  nfa;
	    private String name;
	    private String stakeholderName;
	    
    @XmlAttribute(name = "projectId")
	    public Long getProjectId() {
	        return projectId;
	    }
	    public void setProjectId(Long projectId) {
	        this.projectId = projectId;
	    }	
	    @XmlElement (name = "name")
	    public String getName() {
	        return name;
	    }
	    public void setName(String name) {
	        this.name = name;
	    }
	    @XmlElement (name = "stakeholdername")

	    public void setStakeholderName(String name) {
	    	this.stakeholderName = name;
	    	 
	    }
	    public String getStakeholderName() {
	    	return this.stakeholderName;
	    	
	    }  
	    @XmlElement (name = "stakeholderid")
	    public void setStakeholderId(Long id) {
	    	this.stakeholderId = id;
	    	 
	    }
	    public Long getStakeholderId() {
	    	return this.stakeholderId;
	    	
	    }  
	    
	    @XmlElementWrapper  (name = "fakoren")
	    public void setFaktor(Set<NfaFactor> factorsList) {
	    	this.factorsList = factorsList;
	    }
	    public Set<NfaFactor>  getFaktor() {
	    	return this.factorsList;
	    }
	    
	}
