package com.msg.nfabackend.entities;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.persistence.AttributeConverter;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.msg.nfabackend.templates.Template;
import com.msg.nfabackend.templates.Template.Restriction;

@Entity
@Table(name ="nfa")
public class NfaCatalog implements NfaInterface{
	
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
	public static class WertConverter implements AttributeConverter<List<String>, String> {
		@Override
		public String convertToDatabaseColumn(List<String> attribute) {

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

		@SuppressWarnings("unchecked")
		@Override
		public List<String> convertToEntityAttribute(String dbData) {
			try {
				return dbData == null ? null
						: (List<String>) new ObjectMapper().readValue(dbData, ArrayList.class).stream()
								.map(e -> e == null ? null : e.toString()).collect(Collectors.toList());
			} catch (IOException e) {
				throw new IllegalStateException("JSON-to-Obj-Converting failed", e);
			}
		}
	}
	public static class NfaCatalogBlueprint {
		/**
		 *
		 */private BpPropertyTemplateNoCondition de;
		private BpPropertyTemplateNoCondition en;
		
		/**
		 * @return the de
		 */
		public BpPropertyTemplateNoCondition getDe() {
			return de;
		}

		/**
		 * @param de
		 *            the de to set
		 */
		public void setDe(BpPropertyTemplateNoCondition de) {
			this.de = de;
		}

		/**
		 * @return the en
		 */
		public BpPropertyTemplateNoCondition getEn() {
			return en;
		}

		/**
		 * @param en
		 *            the en to set
		 */
		public void setEn(BpPropertyTemplateNoCondition en) {
			this.en = en;
		}

		public void createDescription(List<String> wert) {
			if (de.getErklaerung() == null) {
				de.setErklaerung(String.join(" ", de.getCharacteristic(), de.getProperty(), de.getModalVerb(),
						de.getQualifiedValue(wert), de.getVerb()));
			}
			if (en.getErklaerung() == null) {
				en.setErklaerung(String.join(" ", en.getCharacteristic(), en.getProperty(), en.getModalVerb(),
						en.getVerb(), en.getQualifiedValue(wert)));
			}
		}
	}

	public static class BpPropertyTemplateNoCondition {


		private String bezeichnung;
		private String erklaerung;
		private String characteristic;
		private String property;
		private String modalVerb;
		private List<String> qualifyingEx;
		private String verb;

		/**
		 * @return the bezeichnung
		 */
		public String getBezeichnung() {
			return bezeichnung;
		}

		/**
		 * @param bezeichnung
		 *            the bezeichnung to set
		 */
		public void setBezeichnung(String bezeichnung) {
			this.bezeichnung = bezeichnung;
		}

		/**
		 * @return the erklaerung
		 */
		public String getErklaerung() {
			if (erklaerung == null) {
				updateErklaerung();
			}
			return erklaerung;
		}

		/**
		 * Uses all the Components to generate the Explanation String and updates the Variable Explanation.
		 */
		public void updateErklaerung() {
			erklaerung = String.join(" ",
			getCharacteristic(),
			getProperty(),
			getModalVerb(),
			getVerb(),
			getQualifyingEx(),
			getValueInput());
		}

		/**
		 * @param erklaerung
		 *            the erklaerung to set
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
		 * @param characteristic
		 *            the characteristic to set
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
		 * @param property
		 *            the property to set
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
		 * @param modalVerb
		 *            the modalVerb to set
		 */
		public void setModalVerb(String modalVerb) {
			this.modalVerb = modalVerb;
		}

		/**
		 * @return the qualifyingEx
		 */
		public List<String> getQualifyingEx() {
			return qualifyingEx;
		}

		/**
		 * @param qualifyingEx
		 *            the qualifyingEx to set
		 */
		public void setQualifyingEx(List<String> qualifyingEx) {
			this.qualifyingEx = qualifyingEx;
		}

		/**
		 * @return the verb
		 */
		public String getVerb() {
			return verb;
		}

		/**
		 * @param verb
		 *            the verb to set
		 */
		public void setVerb(String verb) {
			this.verb = verb;
		}

		final String getQualifiedValue(List<String> wert) {
			return IntStream.range(0, wert.size()).mapToObj(i -> qualifyingEx.get(i) + " " + wert.get(i))
					.collect(Collectors.joining(" "));
		}
	}

	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, 
     generator = "nfa-id-generator")
    @SequenceGenerator(
    		name = "nfa-id-generator",
    		sequenceName = "nfa_sequence") //TODO Needs to be some Number, bigger than the initial / manual NFA-Count 
	@Column(name = "nfa_id")
	private Long nfaCatalogId;

	@OneToMany(mappedBy = "originalEntry", cascade = CascadeType.ALL)
	private List<CustomNFA> customNfaList;

	@Column (name = "NFA_NUMBER")
	private Long nfaNumber;

	@Column(name = "nfa_type")
	private String nfaCatalogType;

	@Column(name = "wert")
	@Convert(converter = WertConverter.class)
	private List<String> nfaCatalogWert;

	@Column(name = "rechtliche_verbindlichkeit")
	private String rechtlicheVerbindlichkeit;

	@Column (name ="value")
	private String nfaCatalogWert;

	@Column (name ="formulation")
	private String nfaCatalogFormulierung;

	@Column(name = "blueprint")
	@Convert(converter = BlueprintConverter.class)
	private NfaCatalogBlueprint nfaCatalogBlueprint;

	@Column(name = "reference")
	private String nfaCatalogReferenz;

	@Column(name = "referenced_projects")
	private String nfaCatalogReferenzierteProjekte;

	@Column(name = "criticality")
	private String nfaCatalogKritikalität;

	@Column(name = "document")
	private String nfaCatalogDokument;

	public Long getId() {
		return nfaCatalogId;
	}

	public String getType() {
		return nfaCatalogType;
	}

	public String getRechtlicheVerbindlichkeit() {
		return rechtlicheVerbindlichkeit;
	}

	public String getFormulation() {
		return nfaCatalogFormulierung;
	}

	public String getReference() {
		return nfaCatalogReferenz;
	}

	public String getReferencedProjects() {
		return nfaCatalogReferenzierteProjekte;
	}

	public String getCriticality() {
		return nfaCatalogKritikalität;
	}

	public String getDocument() {
		return nfaCatalogDokument;
	}

	public String getValue() {
		return nfaCatalogWert;
	}

	public Long getNfaNumber() {
		return nfaNumber;
	}

	public void setNfaNumber(long newNumber) {
		nfaNumber = newNumber;
	}

	public NfaCatalogBlueprint getBlueprint() {
		return nfaCatalogBlueprint;
	}

}
