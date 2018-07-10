package com.msg.nfabackend.services;
import java.util.ArrayList;
import java.util.Set;

import javax.xml.bind.annotation.*;

import com.msg.nfabackend.entities.Stakeholder;
import com.msg.nfabackend.entities.nfaCatalog;
import com.msg.nfabackend.entities.Metric;
import com.msg.nfabackend.entities.NfaCriteria;
import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.entities.NfaFactor;;
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
	    private Set<nfaCatalog> nfasList;
	    private Stakeholder stakeholder;
	    private NfaFactor factor;
	    private nfaCatalog  nfa;
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
