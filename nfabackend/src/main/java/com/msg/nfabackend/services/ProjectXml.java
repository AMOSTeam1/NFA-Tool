package com.msg.nfabackend.services;
import java.util.Set;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import com.msg.nfabackend.entities.Metric;
import com.msg.nfabackend.entities.NfaCatalog;
import com.msg.nfabackend.entities.NfaCriteria;
import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.entities.Stakeholder;;
/**
 * 
 * @author Mai
 * This file is xml structure for the project data 
 *
 */
@XmlRootElement(name = "project")
public class ProjectXml {
		 	     
	    private Long projectId;
	    private Set<Stakeholder> stakeholderList;
	    private Set<NfaFactor> factorsList;
	    private NfaCriteria crieria;
	    private Metric metric;
	    private Set<NfaCatalog> nfasList;
	    private Stakeholder stakeholder;
	    private NfaFactor factor;
	    private NfaCatalog  nfa;
	     
	    @XmlAttribute(name = "projectId")
	    public Long getProjectId() {
	        return projectId;
	    }
	    public void setProjectId(Long projectId) {
	        this.projectId = projectId;
	    }	      
	    @XmlElement (name = "stakeholder")
	    public void setStakeholder(Stakeholder stakeholder) {
	    	this.stakeholder = stakeholder;
	    	 
	    }
	    public Stakeholder getStakeholder() {
	    	return this.stakeholder;
	    	
	    }     
	    @XmlElementWrapper  (name = "factors")
	    public void setStakeholderFactors(Set<NfaFactor> factorsList) {
	    	this.factorsList = factorsList;
	    }
	    public Set<NfaFactor>  getStakeholderFactors() {
	    	return this.factorsList;
	    }
	    
	}
