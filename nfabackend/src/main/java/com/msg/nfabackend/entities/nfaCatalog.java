package com.msg.nfabackend.entities;

import java.io.IOException;
import java.io.StringWriter;

import javax.persistence.AttributeConverter;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name ="nfa")
public class nfaCatalog {
	
	public static class BlueprintConverter implements AttributeConverter<NfaCatalogBlueprint, String> {
		@Override
		public String convertToDatabaseColumn(NfaCatalogBlueprint attribute) {
			
			if (attribute == null) {
				return null;
			}
			
			try (StringWriter stringWriter = new StringWriter()) {
				new ObjectMapper().writeValue(stringWriter, attribute);
				return stringWriter.toString();
			} catch (IOException e) {
				throw new IllegalStateException("Obj-to-JSON-Converting failed", e);
			}
			
		}

		@Override
		public NfaCatalogBlueprint convertToEntityAttribute(String dbData) {
			try {
				return dbData == null ? null 
						: new ObjectMapper().readValue(dbData, NfaCatalogBlueprint.class);
			} catch (IOException e) {
				throw new IllegalStateException("JSON-to-Obj-Converting failed", e);
			}
		}
	}
	
	public static class NfaCatalogBlueprint {
		private BpPropertyTemplateNoConditionDe de;
		private BpPropertyTemplateNoConditionEn en;
		/**
		 * @return the de
		 */
		public BpPropertyTemplateNoConditionDe getDe() {
			return de;
		}
		/**
		 * @param de the de to set
		 */
		public void setDe(BpPropertyTemplateNoConditionDe de) {
			this.de = de;
		}
		/**
		 * @return the en
		 */
		public BpPropertyTemplateNoConditionEn getEn() {
			return en;
		}
		/**
		 * @param en the en to set
		 */
		public void setEn(BpPropertyTemplateNoConditionEn en) {
			this.en = en;
		}
	}
	
	public static class BpPropertyTemplateNoConditionDe {

	    private String bezeichnung;
	    private String erklaerung;
	    private String characteristic;
	    private String property;
	    private String modalVerb;
	    private String qualifyingEx;
	    private String valueInput;
	    private String verb;
	    
		/**
		 * @return the bezeichnung
		 */
		public String getBezeichnung() {
			return bezeichnung;
		}
		/**
		 * @param bezeichnung the bezeichnung to set
		 */
		public void setBezeichnung(String bezeichnung) {
			this.bezeichnung = bezeichnung;
		}
		/**
		 * @return the erklaerung
		 */
		public String getErklaerung() {
			return erklaerung;
		}
		/**
		 * @param erklaerung the erklaerung to set
		 */
		public void setErklaerung(String erklaerung) {
			this.erklaerung = erklaerung;
		}
		
		/**
		 * @return the characteristic
		 */
		public String getCharacteristic() {
			return characteristic;
		}
		/**
		 * @param characteristic the characteristic to set
		 */
		public void setCharacteristic(String characteristic) {
			this.characteristic = characteristic;
		}
		/**
		 * @return the property
		 */
		public String getProperty() {
			return property;
		}
		/**
		 * @param property the property to set
		 */
		public void setProperty(String property) {
			this.property = property;
		}
		/**
		 * @return the modalVerb
		 */
		public String getModalVerb() {
			return modalVerb;
		}
		/**
		 * @param modalVerb the modalVerb to set
		 */
		public void setModalVerb(String modalVerb) {
			this.modalVerb = modalVerb;
		}
		/**
		 * @return the qualifyingEx
		 */
		public String getQualifyingEx() {
			return qualifyingEx;
		}
		/**
		 * @param qualifyingEx the qualifyingEx to set
		 */
		public void setQualifyingEx(String qualifyingEx) {
			this.qualifyingEx = qualifyingEx;
		}
		/**
		 * @return the valueInput
		 */
		public String getValueInput() {
			return valueInput;
		}
		/**
		 * @param valueInput the valueInput to set
		 */
		public void setValueInput(String valueInput) {
			this.valueInput = valueInput;
		}
		/**
		 * @return the verb
		 */
		public String getVerb() {
			return verb;
		}
		/**
		 * @param verb the verb to set
		 */
		public void setVerb(String verb) {
			this.verb = verb;
		}
		    
	}
	
	public static class BpPropertyTemplateNoConditionEn {

	    private String bezeichnung;
	    private String erklaerung;
	    private String characteristic;
	    private String property;
	    private String modalVerb;
	    private String qualifyingEx;
	    private String valueInput;
	    private String verb;
	    
		/**
		 * @return the bezeichnung
		 */
		public String getBezeichnung() {
			return bezeichnung;
		}
		/**
		 * @param bezeichnung the bezeichnung to set
		 */
		public void setBezeichnung(String bezeichnung) {
			this.bezeichnung = bezeichnung;
		}
		/**
		 * @return the erklaerung
		 */
		public String getErklaerung() {
			return erklaerung;
		}
		/**
		 * @param erklaerung the erklaerung to set
		 */
		public void setErklaerung(String erklaerung) {
			this.erklaerung = erklaerung;
		}

		/**
		 * @return the characteristic
		 */
		public String getCharacteristic() {
			return characteristic;
		}
		/**
		 * @param characteristic the characteristic to set
		 */
		public void setCharacteristic(String characteristic) {
			this.characteristic = characteristic;
		}
		/**
		 * @return the property
		 */
		public String getProperty() {
			return property;
		}
		/**
		 * @param property the property to set
		 */
		public void setProperty(String property) {
			this.property = property;
		}
		/**
		 * @return the modalVerb
		 */
		public String getModalVerb() {
			return modalVerb;
		}
		/**
		 * @param modalVerb the modalVerb to set
		 */
		public void setModalVerb(String modalVerb) {
			this.modalVerb = modalVerb;
		}
		/**
		 * @return the qualifyingEx
		 */
		public String getQualifyingEx() {
			return qualifyingEx;
		}
		/**
		 * @param qualifyingEx the qualifyingEx to set
		 */
		public void setQualifyingEx(String qualifyingEx) {
			this.qualifyingEx = qualifyingEx;
		}
		/**
		 * @return the valueInput
		 */
		public String getValueInput() {
			return valueInput;
		}
		/**
		 * @param valueInput the valueInput to set
		 */
		public void setValueInput(String valueInput) {
			this.valueInput = valueInput;
		}
		/**
		 * @return the verb
		 */
		public String getVerb() {
			return verb;
		}
		/**
		 * @param verb the verb to set
		 */
		public void setVerb(String verb) {
			this.verb = verb;
		}
	    
}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="nfa_id")
	private Long nfaCatalogId;
	
	@Column (name ="NFA_NUMBER")
	private Long nfaNumber;
	
	@Column (name ="nfa_type")
	private String nfaCatalogType;
	
	@Column (name ="wert")
	private Long nfaCatalogWert;

	@Column (name ="rechtliche_verbindlichkeit")
	private String rechtlicheVerbindlichkeit;
	
	@Column (name ="formulierung")
	private String nfaCatalogFormulierung;
	
	@Column (name ="blueprint")
	@Convert(converter = BlueprintConverter.class)
	private NfaCatalogBlueprint nfaCatalogBlueprint;
	
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

	public String getRechtlicheVerbindlichkeit() {
		return rechtlicheVerbindlichkeit;
	}

	public void setRechtlicheVerbindlichkeit(String rechtlicheVerbindlichkeit) {
		this.rechtlicheVerbindlichkeit = rechtlicheVerbindlichkeit;
	}

	public String getNfaCatalogFormulierung() {
		return nfaCatalogFormulierung;
	}

	public void setNfaCatalogFormulierung(String nfaCatalogFormulierung) {
		this.nfaCatalogFormulierung = nfaCatalogFormulierung;
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
	
	public Long getNfaCatalogWert() {
		return nfaCatalogWert;
	}

	public void setNfaCatalogWert(Long nfaCatalogWert) {
		this.nfaCatalogWert = nfaCatalogWert;
	}

	public Long getNfaNumber() {
		return nfaNumber;
	}

	public void setNfaNumber(Long nfaNumber) {
		this.nfaNumber = nfaNumber;
	}

	public NfaCatalogBlueprint getNfaCatalogBlueprint() {
		return nfaCatalogBlueprint;
	}

	public void setNfaCatalogBlueprint(NfaCatalogBlueprint nfaCatalogBlueprint) {
		this.nfaCatalogBlueprint = nfaCatalogBlueprint;
	}
}
