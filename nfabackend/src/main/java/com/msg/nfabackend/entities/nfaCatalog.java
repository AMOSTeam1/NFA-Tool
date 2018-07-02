package com.msg.nfabackend.entities;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.persistence.AttributeConverter;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.msg.nfabackend.templates.Template;
import com.msg.nfabackend.templates.Template.Restriction;

@Entity
@Table(name = "nfa")
public class nfaCatalog {

	public static class BlueprintConverter implements AttributeConverter<Map<String, Template>, String> {
		@Override
		public String convertToDatabaseColumn(Map<String, Template> attribute) {

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

		@SuppressWarnings({ "unchecked", "rawtypes" })
		@Override
		public Map<String, Template> convertToEntityAttribute(String dbData) {
			if (dbData == null) {
				return null;
			}
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				Map<String, Object> languages = objectMapper.readValue(dbData, HashMap.class);
				for (Entry<String, ?> entry : languages.entrySet()) {
					String templateString = convertToDatabaseColumn((Map) entry.getValue());
					languages.replace(entry.getKey(), objectMapper.readValue(templateString, Template.class));
				}
				return (Map) languages;
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

	public static void main(String[] args) {
		BlueprintConverter blueprintConverter = new BlueprintConverter();

		Map<String, Template> hashMap = new HashMap<>();

		Template value = new Template();
		value.setName("Property Template");

		Template.Property property = new Template.Property();

		property.setNames(Arrays.asList("name 1"));
		property.setValues(Arrays.asList("value 1"));

		property.setRestrictions(Arrays.asList(Restriction.COMMA, Restriction.POINT));

		value.setProperties(Arrays.asList(property));

		hashMap.put("de", value);
		hashMap.put("en", value);

		String str = blueprintConverter.convertToDatabaseColumn(hashMap);

		Map<String, Template> convertToEntityAttribute = blueprintConverter.convertToEntityAttribute(str);

		convertToEntityAttribute.equals(hashMap);

		blueprintConverter.convertToDatabaseColumn(convertToEntityAttribute);

		convertToEntityAttribute.size();

	}

	public static class NfaCatalogBlueprint {
		private BpPropertyTemplateNoCondition de;
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
			return erklaerung;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nfa_id")
	private Long nfaCatalogId;

	@Column(name = "NFA_NUMBER")
	private Long nfaNumber;

	@Column(name = "nfa_type")
	private String nfaCatalogType;

	@Column(name = "wert")
	@Convert(converter = WertConverter.class)
	private List<String> nfaCatalogWert;

	@Column(name = "rechtliche_verbindlichkeit")
	private String rechtlicheVerbindlichkeit;

	@Column(name = "formulierung")
	private String nfaCatalogFormulierung;

	@Column(name = "blueprint")
	@Convert(converter = BlueprintConverter.class)
	private Map<String, Template> nfaCatalogBlueprint;

	@Column(name = "referenz")
	private String nfaCatalogReferenz;

	@Column(name = "referenzierte_projekte")
	private String nfaCatalogReferenzierteProjekte;

	@Column(name = "kritikalitaet")
	private String nfaCatalogKritikalität;

	@Column(name = "dokument")
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

	public List<String> getNfaCatalogWert() {
		return nfaCatalogWert;
	}

	public void setNfaCatalogWert(List<String> nfaCatalogWert) {
		this.nfaCatalogWert = nfaCatalogWert;
	}

	public Long getNfaNumber() {
		return nfaNumber;
	}

	public void setNfaNumber(Long nfaNumber) {
		this.nfaNumber = nfaNumber;
	}

	public Map<String, Template> getNfaCatalogBlueprint() {
		return nfaCatalogBlueprint;
	}

	public void setNfaCatalogBlueprint(Map<String, Template> nfaCatalogBlueprint) {
		this.nfaCatalogBlueprint = nfaCatalogBlueprint;
	}
}
