package com.msg.nfabackend.resources;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.entities.Stakeholder;
import com.msg.nfabackend.services.ProjectXml;
import com.msg.nfabackend.services.QueryService;

/**
 * 
 * @author Mai this file includes two services one to export the xml files of
 *         each stakeholder and the second for download the zip file
 *
 */

@Path("projectexport")
public class ProjectXmlResource {

	@Inject
	private QueryService queryService;
	private final String tempFolder = "/home/micha/Documents/Temp/";

	private final String getProjectXmlLocation(int i) {
		return tempFolder + "project" + i + ".xml";
	}

	private final String downloadXmlLocation = tempFolder + "zip-xml.zip";

	@GET
	@Path("/xml/{projectId}")
	@Produces(MediaType.APPLICATION_XML)
	public ProjectXml getProjectNfas(@PathParam("projectId") Long id) throws JAXBException, IOException {

		Set<Stakeholder> stakeholderList;
		List<Long> factors;
		Set<NfaFactor> factorsList;
		Stakeholder stakeholder;
		NfaFactor factor = new NfaFactor();
		ProjectXml projXml = new ProjectXml();
		byte[] buffer = new byte[1024];

		FileOutputStream fos = new FileOutputStream(downloadXmlLocation);

		ZipOutputStream zos = new ZipOutputStream(fos);

		Project project = queryService.getProjectByID(id);
		/**
		 * get the stakeholders of the project
		 */
		stakeholderList = project.getProjectStakeholders();
		Iterator<Stakeholder> stakeholderIter = stakeholderList.iterator();
		projXml.setProjectId(project.getId());

		for (int i = 0; 0 == i || stakeholderIter.hasNext(); i++) {

			factorsList = new HashSet<NfaFactor>();
			stakeholder = stakeholderIter.next();
			projXml.setStakeholder(stakeholder);
			factors = stakeholder.getStakeholderFactors();

			for (int j = 0; j < factors.size(); j++) {
				Long factorId = factors.get(j);
				factor = queryService.getFactorById(factorId);
				factorsList.add(factor);
			}

			projXml.setStakeholderFactors(factorsList);

			/**
			 * generate xml for each stakeholder
			 */
			JAXBContext jaxbContext = JAXBContext.newInstance(ProjectXml.class);
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

			marshaller.marshal(projXml, new File(getProjectXmlLocation(i)));
			marshaller.marshal(projXml, System.out);

			File srcFile = new File(getProjectXmlLocation(i));

			/**
			 * Add files to the zip file
			 */
			FileInputStream fis = new FileInputStream(srcFile); // TODO Stream needs to be closed
			zos.putNextEntry(new ZipEntry(srcFile.getName()));
			int length;

			while ((length = fis.read(buffer)) > 0) {
				zos.write(buffer, 0, length);
				zos.flush();
			}
		}

		zos.close();
		return projXml;
	}

	@GET
	@Path("/download")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response downloadFile() {
		File file = new File(downloadXmlLocation);
		ResponseBuilder rb = Response.ok(file);
		rb.header("Content-Disposition", "attachment; filename=" + file.getName());
		Response response = rb.build();
		return response;
	}

}