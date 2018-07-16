package com.msg.nfabackend.resources;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
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
import com.msg.nfabackend.entities.NfaFactor;
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
	private final String tempFolderWindows = "C:\\Windows\\Temp/";
	private final String tempFolderLinux = "/home/Temp/";
	private final String tempFolder = (System.getProperty("os.name")).equals("Linux") ? tempFolderLinux : tempFolderWindows;

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
		Set<String> linesToRemove =  new HashSet<String>();
		byte[] buffer = new byte[1024];
		ArrayList<ArrayList<String>> textreplacer = new ArrayList<ArrayList<String>>();
		ArrayList <String> replacer;
		replacer = new ArrayList<String>();
		replacer.add("factor>");
		replacer.add("bezeichnung>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("factorNumber>");
		replacer.add("id>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("criteriaNumber>");
		replacer.add("id>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("<criteria>");
		replacer.add("<bezeichnung>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("</criteria>");
		replacer.add("</bezeichnung>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("metricList>");
		replacer.add("metriken>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("criteriaList>");
		replacer.add("kriterien>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("metricNumber>");
		replacer.add("id>");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("nfaList");
		replacer.add("nfa");
		textreplacer.add(replacer);
		replacer = new ArrayList<String>();
		replacer.add("nfaNumber");
		replacer.add("id");
		textreplacer.add(replacer);

		
		
		linesToRemove.add("<id>");
		linesToRemove.add("</id>");
		/*linesToRemove.add("<factorNumber>");
		linesToRemove.add("<criteriaList>");*/

		Iterator<String> linesToRemoveIter;
		

		FileOutputStream fos = new FileOutputStream(downloadXmlLocation);

		ZipOutputStream zos = new ZipOutputStream(fos);

		Project project = queryService.getProjectByID(id);
		/**
		 * 
		 * get the stakeholders of the project
		 */
		stakeholderList = project.getProjectStakeholders();
		Iterator<Stakeholder> stakeholderIter = stakeholderList.iterator();
		projXml.setProjectId(project.getId());
		projXml.setName(project.getCustomerName() + " " + project.getContactPersCustomer());
		
		for (int i = 0; 0 == i || stakeholderIter.hasNext(); i++) {

			factorsList = new HashSet<NfaFactor>();
			stakeholder = stakeholderIter.next();
			projXml.setStakeholderName(stakeholder.getStakeholder_name());
			projXml.setStakeholderId(stakeholder.getStakeholder_id());
			factors = stakeholder.getStakeholderFactors();
			Iterator<Long> factorsIterator = factors.iterator();
			
			for (int x = 0; 0 == x || factorsIterator.hasNext(); x++) {
				int count =0;
				Long factorId = factorsIterator.next();
				factor =  queryService.getFactorById(factorId);	
				Iterator<NfaFactor> factorListIterator = factorsList.iterator();
				//check if the list has the same factor for not adding it again 
				while(factorListIterator.hasNext()) {
				 NfaFactor listFactor = factorListIterator.next();
				if (listFactor.getFactorNumber() == factor.getFactorNumber()) {
					count = count+1;}
				}
				if (count ==0) {
				factorsList.add(factor);
				}
			}
			
			projXml.setFaktor(factorsList);

			/**
			 * generate xml for each stakeholder
			 */
			JAXBContext jaxbContext = JAXBContext.newInstance(ProjectXml.class);
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

			marshaller.marshal(projXml, new File(getProjectXmlLocation(i)));
			marshaller.marshal(projXml, System.out);
			
			/////remove not needed lines 
			
			File tempFile = new File(tempFolder + "myTempFile.txt");
			File inputFile = new File(getProjectXmlLocation(i));
			BufferedReader reader = new BufferedReader(new FileReader(inputFile));
			BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));

			String lineToRemove;
			String currentLine;

			while((currentLine = reader.readLine()) != null) {
			    // trim newline when comparing with lineToRemove
			    String trimmedLine = currentLine.trim();
			     linesToRemoveIter = linesToRemove.iterator();
			     boolean isFound = false;
			    for (int x = 0; 0 == x || linesToRemoveIter.hasNext(); x++) {
			    	lineToRemove= linesToRemoveIter.next();
			    if(trimmedLine.contains(lineToRemove)) {
			    	 isFound = true;
			    }
			    }
			    if(!isFound) writer.write(currentLine + System.getProperty("line.separator"));			   
			}
			
			writer.close(); 
			reader.close(); 
			
			 FileChannel src = new FileInputStream(tempFile).getChannel();
			 FileChannel dest = new FileOutputStream(inputFile).getChannel();
			 dest.transferFrom(src, 0, src.size());

						
			/*
			 * replace the tag names 
			 */
			
			java.nio.file.Path path = Paths.get(getProjectXmlLocation(i));
			Iterator<ArrayList<String>> replacerIterator = textreplacer.iterator();
			while ( replacerIterator.hasNext()) {
			String content = new String(Files.readAllBytes(path));
			ArrayList<String> textToBeReplaced= new ArrayList<String>();
			textToBeReplaced= replacerIterator.next();
			content = content.replaceAll(textToBeReplaced.get(0),textToBeReplaced.get(1));
			Files.write(path, content.getBytes());	
			}

			
			///////////////////// 
			

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