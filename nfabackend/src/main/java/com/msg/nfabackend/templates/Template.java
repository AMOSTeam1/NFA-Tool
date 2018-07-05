package com.msg.nfabackend.templates;

import java.util.Arrays;
import java.util.List;

public final class Template {

	public enum Restriction {
		MANDATORY, SELECTABLE, READONLY, COMMA, POINT
	}

	public static final class Property {

		private List<String> names;
		private List<String> values;
		private List<Restriction> restrictions;

		/**
		 * @return the names
		 */
		public List<String> getNames() {
			return names;
		}

		/**
		 * @param names
		 *            the names to set
		 */
		public void setNames(List<String> names) {
			this.names = names;
		}

		/**
		 * @return the values
		 */
		public List<String> getValues() {
			return values;
		}

		/**
		 * @param values
		 *            the values to set
		 */
		public void setValues(List<String> values) {
			this.values = values;
		}

		/**
		 * @return the restrictions
		 */
		public List<Restriction> getRestrictions() {
			return restrictions;
		}

		/**
		 * @param restrictions
		 *            the restrictions to set
		 */
		public void setRestrictions(List<Restriction> restrictions) {
			this.restrictions = restrictions;
		}

		@Override
		public boolean equals(Object obj) {
			return obj instanceof Property
					&& Arrays.asList(((Property) obj).names, ((Property) obj).values, ((Property) obj).restrictions)
							.equals(Arrays.asList(names, values, restrictions));
		}

	}

	private String name;
	private List<Property> properties;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the properties
	 */
	public List<Property> getProperties() {
		return properties;
	}

	/**
	 * @param properties
	 *            the properties to set
	 */
	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof Template && Arrays.asList(((Template) obj).name, ((Template) obj).properties)
				.equals(Arrays.asList(name, properties));
	}

}
