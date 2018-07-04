package com.msg.nfabackend.resources;



import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import com.msg.nfabackend.entities.Stakeholder;
import com.msg.nfabackend.entities.nfaCatalog;
import com.msg.nfabackend.entities.Metric;
import com.msg.nfabackend.entities.NfaCriteria;
import com.msg.nfabackend.entities.NfaFactor;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.msg.nfabackend.entities.Metric;
import com.msg.nfabackend.entities.NfaCriteria;
import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.entities.Stakeholder;
import com.msg.nfabackend.entities.nfaCatalog;
import com.msg.nfabackend.services.ProjectXml;
import com.msg.nfabackend.services.QueryService;

/**
 * 
 * @author Mai this file includes two services one to export the xml files of each stakeholder and the second for download 
 * the zip file
 *
 */
 
@Path("/projectexport")
public class ProjectXmlResource {
	
	QueryService queryService = new QueryService();
 
    @GET
    @Path("/xml/{projectId}")
    @Produces(MediaType.APPLICATION_XML)
    public ProjectXml getProjectNfas(@PathParam("projectId") Long id) throws JAXBException, IOException{
    	

	     Set<Stakeholder> stakeholderList;
	     List<Long> factors;
	     Set<NfaFactor> factorsList;
	     NfaCriteria crieria;
	     Metric metric;
	     Set<nfaCatalog> nfasList;
	     Stakeholder stakeholder;
	     NfaFactor factor = new NfaFactor();
	     nfaCatalog  nfa;
	     Long nfaId;
	     ProjectXml projXml = new ProjectXml();
	     byte[] buffer = new byte[1024];

	    FileOutputStream fos = new FileOutputStream("C:\\Windows\\Temp/zip-xml.zip");

		ZipOutputStream zos = new ZipOutputStream(fos);	    

        Project project = queryService.getProjectByID(id);
        /**
         * get the stakeholders of the project
         */
        stakeholderList= project.getProjectStakeholders();
        Iterator<Stakeholder> it = stakeholderList.iterator();
        projXml.setProjectId(project.getId());
        int i =0;
    	do{
    		factorsList = new HashSet<NfaFactor>();
    		stakeholder = it.next();
        	projXml.setStakeholder(stakeholder);
        	factors=stakeholder.getStakeholderFactors();  
        	for(int j=0; j<factors.size();j++) {
        		Long factorId = factors.get(j);    
        		factor= queryService.getFactorById(factorId);       		
        		factorsList.add(factor);  
            	
        	}       	
        	projXml.setStakeholderFactors(factorsList);   
            /**
             * generate xml for each stakeholder
             */
            JAXBContext jaxbContext = JAXBContext.newInstance(ProjectXml.class);
            Marshaller marshaller = jaxbContext.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            marshaller.marshal(projXml, new File("C:\\Windows\\Temp/project"+i+".xml"));
            marshaller.marshal(projXml, System.out);   	
            File srcFile = new File("C:\\Windows\\Temp/project"+i+".xml");
            /**
             * Add files to the zip file
             */
			FileInputStream fis = new FileInputStream(srcFile);			
			zos.putNextEntry(new ZipEntry(srcFile.getName()));		
			int length;
			while ((length = fis.read(buffer)) > 0) {
				zos.write(buffer, 0, length);
				zos.flush();
			}
            i++;
            
        }while(it.hasNext()) ;
        zos.close();
        return projXml;     
    }
	@GET
	@Path("/download")
        @Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response  downloadFile(){
		File file = new File("C:\\Windows\\Temp/zip-xml.zip");
		ResponseBuilder rb = Response.ok(file);
		rb.header("Content-Disposition", "attachment; filename=" + file.getName());
		Response response = rb.build();
		return response;
	}
    
    
}